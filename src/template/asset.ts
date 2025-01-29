import { createReadStream } from "node:fs";
import { extname } from "node:path";
import type {
  AssetData,
  AssetGenerator,
  TemplateComponent,
  TemplateFragment,
} from "../builder.js";
import { DuplicateAssetError } from "../errors.js";
import { getValueAsync, type AsyncProvider } from "../internal/provider.js";
import { FindInMap, Ref } from "../intrinsics.js";
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

  public readonly generate: () => PromiseLike<AssetData>;
  public readonly name: string;

  public constructor(name: string, content: AsyncProvider<AssetInput>) {
    this.name = name;

    this.generate = async () => {
      const input = await getValueAsync(content);
      return {
        content: await getValueAsync(input.content),
        fileName: await getValueAsync(input.fileName),
        integrity: await getValueAsync(input.integrity),
      };
    };
  }

  public addToTemplate(fragment: TemplateFragment): AssetInstance {
    if (fragment.assets.some((x) => x.name === this.name)) {
      throw new DuplicateAssetError(this.name);
    }
    fragment.assets.push(this);

    return {
      name: this.name,
      ref: {
        S3Bucket: Ref(AssetBucketParameterName) as string,
        S3Key: FindInMap(
          AssetMappingName,
          this.name,
          AssetMappingFileNameKey,
        ) as string,
      },
    };
  }
}
