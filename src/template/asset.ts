import { createReadStream } from "node:fs";
import { extname } from "node:path";
import {
  ResolvableElement,
  type AssetData,
  type AssetGenerator,
  type TemplateComponent,
  type TemplateFragment,
} from "../builder.js";
import { DuplicateAssetError } from "../errors.js";
import { getValueAsync, type AsyncProvider } from "../internal/provider.js";
import { toStream } from "../internal/to-stream.js";
import type { ContentLike } from "./asset-content.js";

export const AssetBucketParameterName = "AssetBucketName";
export const AssetMappingName = "AssetManifest";
export const AssetMappingFileNameKey = "FileName";
export const AssetMappingIntegrityKey = "Integrity";

export type AssetMappingKey =
  | typeof AssetMappingFileNameKey
  | typeof AssetMappingIntegrityKey;

export type AssetFromFileOptions = {
  fileExt?: string;
  fileName?: string;
};

export type AssetRef = {
  readonly S3Bucket: string;
  readonly S3Key: string;
};

export type AssetInstance = {
  name: string;
  ref: AssetRef;
};

export type AssetMapEntryData = {
  FileName: string;
  Integrity: string;
};

export type AssetMapEntryInstance = {
  out: AssetMapEntryData;
};

/**
 * Flexible input for {@link Asset} constructor.
 */
export type AssetInput = {
  fileName: AsyncProvider<string>;
  content: AsyncProvider<ContentLike>;
  integrity?: AsyncProvider<string>;
};

export class Asset implements TemplateComponent<AssetInstance>, AssetGenerator {
  public static fromFile(
    assetName: string,
    path: string,
    opts: AssetFromFileOptions = {},
  ): Asset {
    const { fileExt = extname(path), fileName = assetName + fileExt } = opts;

    return new this(assetName, {
      content: () => createReadStream(path),
      fileName,
    });
  }

  readonly #bucketRef: ResolvableElement<string>;
  readonly #keyRef: ResolvableElement<string>;

  public readonly instance: AssetInstance;
  public readonly generate: () => PromiseLike<AssetData>;
  public readonly name: string;

  public constructor(name: string, content: AsyncProvider<AssetInput>) {
    this.name = name;

    this.generate = async () => {
      const input = await getValueAsync(content);
      return {
        content: toStream(await getValueAsync(input.content)),
        fileName: await getValueAsync(input.fileName),
        integrity: await getValueAsync(input.integrity),
      };
    };

    this.#bucketRef = new ResolvableElement(`Asset/${name}/S3Bucket`);
    this.#keyRef = new ResolvableElement(`Asset/${name}/S3Key`);

    this.instance = {
      name: this.name,
      ref: {
        S3Bucket: this.#bucketRef.dereference(),
        S3Key: this.#keyRef.dereference(),
      },
    };
  }

  /**
   * Add the asset to the template.
   */
  public addToTemplate(fragment: TemplateFragment): AssetInstance {
    if (fragment.assets.some((x) => x.name === this.name)) {
      throw new DuplicateAssetError(this.name);
    }
    fragment.assets.push(this);
    return this.instance;
  }

  /**
   * Set the location of the asset.
   */
  public resolveLocation(s3Bucket: string, s3Key: string): void {
    this.#bucketRef.resolve(s3Bucket);
    this.#keyRef.resolve(s3Key);
  }

  /**
   * Hijack the given ref properties so that hey are updated when
   * {@link resolveLocation} is called.
   */
  protected hijackRef(ref: AssetRef, defaultToOriginal = false): void {
    this.#bucketRef.hijack(ref.S3Bucket, defaultToOriginal);
    this.#keyRef.hijack(ref.S3Key, defaultToOriginal);
  }
}
