import assert from "node:assert";
import { createReadStream } from "node:fs";
import { basename } from "node:path";
import { Readable } from "node:stream";
import { buffer } from "node:stream/consumers";
import {
  ResolvableElement,
  type DeploymentAsset,
  type TemplateBuilder,
  type TemplateComponent,
} from "./builder.js";
import { streamLength } from "./internal/stream-length.js";

/**
 * A chunk of stream of data.
 */
export type ContentLike = string | Buffer | Readable;

/**
 * The location of an asset on S3.
 */
export type AssetReference = {
  readonly S3Bucket: string;
  readonly S3Key: string;
};

/**
 * An instance of {@link Asset}.
 */
export type AssetInstance = {
  ref: AssetReference;
};

/**
 * Options for creating an {@link Asset}.
 */
export type AssetOptions = {
  fileName?: string;
  size?: number;
};

/**
 * All fields needed to define an {@link Asset}.
 */
export type AssetDefinition = AssetOptions & {
  content: string | Buffer | Readable;
  name: string;
};

/**
 * A file deployed along with a template which contains code or other resources.
 */
export class Asset
  implements TemplateComponent<AssetInstance>, DeploymentAsset
{
  /**
   * Create an asset from the given file.
   */
  public static fromFile(
    name: string,
    path: string,
    options: AssetOptions = {},
  ): Asset {
    const { fileName = basename(path), ...restOptions } = options;
    return new this(name, createReadStream(path), { fileName, ...restOptions });
  }

  readonly #bucketRef: ResolvableElement<string>;
  readonly #keyRef: ResolvableElement<string>;

  public readonly content: Buffer | Readable;
  public fileName: string;
  public readonly instance: AssetInstance;
  public readonly integrity?: string;
  public readonly name: string;
  public size: number | undefined;

  public constructor(asset: AssetDefinition);
  public constructor(
    name: string,
    content: ContentLike,
    options?: AssetOptions,
  );
  public constructor(
    _defOrName: string | AssetDefinition,
    _content?: ContentLike,
    _options?: AssetOptions,
  ) {
    let def: AssetDefinition;

    if (typeof _defOrName === "string") {
      assert(_content);

      def = {
        name: _defOrName,
        content: _content,
        ..._options,
      };
    } else {
      def = _defOrName;
    }

    const { content, fileName, name, size } = def;

    this.name = name;
    this.fileName = fileName ?? `${name}.zip`;

    if (typeof content === "string") {
      // convert to buffer first so we can get the correct size
      const buffer = Buffer.from(content);
      this.content = buffer;
      this.size = buffer.length;
    } else if (ArrayBuffer.isView(content)) {
      this.size = content.length;
      this.content = content;
    } else {
      this.content = content;

      if (size === undefined) {
        this.size = streamLength(content);
      } else {
        this.size = size;
      }
    }

    if (this.size !== undefined && size !== undefined) {
      assert.strictEqual(this.size, size, `expected provided size to match`);
    }

    this.#bucketRef = new ResolvableElement(`Asset/${name}/S3Bucket`);
    this.#keyRef = new ResolvableElement(`Asset/${name}/S3Key`);

    this.instance = {
      ref: {
        S3Bucket: this.#bucketRef.dereference(),
        S3Key: this.#keyRef.dereference(),
      },
    };
  }

  /**
   * Add the asset to the template.
   */
  public build(builder: TemplateBuilder): AssetInstance {
    builder.assets.push(this);
    return this.instance;
  }

  /**
   * Get the asset content as a buffer or string.
   */
  public async getData(): Promise<Buffer>;
  public async getData(encoding: BufferEncoding): Promise<string>;
  public async getData(encoding?: BufferEncoding): Promise<Buffer | string> {
    if (Buffer.isBuffer(this.content)) {
      return this.content;
    }
    const data = await buffer(this.content);
    return encoding ? data.toString(encoding) : data;
  }

  /**
   * Get the asset content as a readable stream.
   */
  public getReadable(): Readable {
    if (Buffer.isBuffer(this.content)) {
      return Readable.from(this.content);
    }
    return this.content;
  }

  /**
   * Set the location of the asset.
   */
  public resolveLocation(s3Bucket: string, s3Key: string): void {
    this.#bucketRef.resolve(s3Bucket);
    this.#keyRef.resolve(s3Key);
  }

  /**
   * Hijack the given ref properties so that they are updated when
   * {@link resolveLocation} is called.
   */
  protected hijackRef(ref: AssetReference, defaultToOriginal = false): void {
    this.#bucketRef.hijack(ref.S3Bucket, defaultToOriginal);
    this.#keyRef.hijack(ref.S3Key, defaultToOriginal);
  }
}
