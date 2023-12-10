import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { basename, extname } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import {
  AssetEmitter,
  TemplateBuilder,
  TemplateExtension,
  TemplateExtensionWithOutput,
} from "../builder.js";
import { Fn, IntrinsicValue } from "../intrinsics.js";
import { Template } from "../template.js";
import { Parameter, ParameterInstance } from "./Parameter.js";

export type AssetOptions = {
  fileExt?: string;
  noHash?: boolean;
};

export type AssetRef = {
  readonly S3Bucket: string;
  readonly S3Key: string;
};

export type AssetInstance = {
  ref: AssetRef;
};

async function addHashToFileName(
  fileName: string,
  content: Readable,
  ext = extname(fileName),
): Promise<string> {
  const baseFileName = basename(fileName, ext);
  const hash = createHash("sha1");
  await pipeline(content, hash);
  return `${baseFileName}.${hash.digest("hex")}${ext}`;
}

export class Asset implements TemplateExtensionWithOutput<AssetInstance> {
  public static fromFile(
    assetName: string,
    path: string,
    opts?: AssetOptions,
  ): Asset {
    const fileExt = opts?.fileExt ?? extname(path);
    return new Asset(
      assetName,
      opts?.noHash
        ? assetName + fileExt
        : () => addHashToFileName(assetName, createReadStream(path), fileExt),
      () => createReadStream(path),
    );
  }

  private readonly content: () => Readable;
  private readonly fileName: () => PromiseLike<string>;
  public readonly name: string;

  constructor(
    name: string,
    fileName: string | (() => string | PromiseLike<string>),
    content: () => Readable,
  ) {
    this.name = name;
    this.content = content;

    if (typeof fileName === "string") {
      this.fileName = () => Promise.resolve(fileName);
    } else {
      let cache: Promise<string> | undefined;
      // cache the file name to avoid recomputing
      this.fileName = async () => {
        if (cache) {
          return cache;
        }
        cache = Promise.resolve(fileName());
        return cache;
      };
    }
  }

  public async onEmit(emitter: AssetEmitter): Promise<void> {
    emitter.addAsset({
      createReadStream: this.content,
      fileName: await this.fileName(),
    });
  }

  public onUse(builder: TemplateBuilder): AssetInstance {
    builder.use(
      new AssetMetadata(async () => ({
        Name: this.name,
        FileName: await this.fileName(),
      })),
    );
    const s3Object = builder.use(
      new AssetObjectKeyParameter(this.name, this.fileName()),
    );
    const s3Bucket = builder.useOnce(AssetBucketNameParameter);

    return {
      ref: {
        S3Bucket: s3Bucket.ref,
        S3Key: s3Object.ref,
      },
    };
  }
}

export class AssetObjectKeyParameter
  implements TemplateExtensionWithOutput<ParameterInstance>
{
  public static readonly NamePrefix = "AssetObjectKey";

  public readonly name: string;
  public readonly ref: IntrinsicValue;
  private readonly defaultValue: PromiseLike<string>;

  constructor(assetName: string, defaultValue: string | PromiseLike<string>) {
    if (!/^[A-Za-z0-9]+$/.test(assetName)) {
      throw new Error(`asset names must match /^[A-Za-z0-9]+$/`);
    }
    this.name = AssetObjectKeyParameter.NamePrefix + assetName;
    this.defaultValue = Promise.resolve(defaultValue);
    this.ref = Fn.ref(this.name);
  }

  public async onBuild(builder: TemplateBuilder): Promise<void> {
    builder.add("Parameters", this.name, {
      Type: "String",
      Default: await this.defaultValue,
    });
  }

  public onUse(): ParameterInstance {
    return this;
  }
}

export class AssetBucketNameParameter extends Parameter {
  public static readonly ParameterName = "AssetBucketName";
  public static readonly extensionKey = Symbol.for("AssetBucketNameParameter");

  constructor() {
    super(AssetBucketNameParameter.ParameterName, "String");
  }
}

export type AssetMetadataItem = {
  Name: string;
  FileName: string;
};

export class AssetMetadata implements TemplateExtension {
  public static readonly SectionName = "AssetMetadata";

  public static fromTemplate(template: Template): AssetMetadataItem[] {
    const value = template.Metadata?.[AssetMetadata.SectionName];
    if (!Array.isArray(value)) {
      throw new Error(
        `Metadata ${AssetMetadata.SectionName} exists but is not an array`,
      );
    }
    return value ?? [];
  }

  private readonly value: () => PromiseLike<AssetMetadataItem>;

  constructor(
    value:
      | AssetMetadataItem
      | (() => AssetMetadataItem | PromiseLike<AssetMetadataItem>),
  ) {
    this.value =
      typeof value === "function"
        ? () => Promise.resolve(value())
        : () => Promise.resolve(value);
  }

  public async onBuild(builder: TemplateBuilder): Promise<void> {
    if (!builder.template.Metadata) {
      builder.template.Metadata = {};
    }
    if (!builder.template.Metadata[AssetMetadata.SectionName]) {
      builder.template.Metadata[AssetMetadata.SectionName] = [];
    }
    if (!Array.isArray(builder.template.Metadata[AssetMetadata.SectionName])) {
      throw new Error(
        `Metadata ${AssetMetadata.SectionName} exists but is not an array`,
      );
    }
    builder.template.Metadata[AssetMetadata.SectionName].push(
      await this.value(),
    );
  }
}
