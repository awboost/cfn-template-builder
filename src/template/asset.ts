import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { basename, extname } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import {
  AssetEmitter,
  TemplateBuilder,
  TemplateExtension,
} from "../builder.js";
import { Fn } from "../intrinsics.js";
import { Parameter } from "./parameter.js";
import { SingletonExtension } from "./singleton.js";

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

export type AssetInfo = {
  assetName: string;
  getFileName: () => PromiseLike<string>;
};

export type AssetMapEntryData = {
  FileName: string;
};

export type AssetMapEntryInstance = {
  out: AssetMapEntryData;
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

export class Asset implements TemplateExtension<AssetInstance> {
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
    const bucketParam = builder.use(AssetBucketNameParameter.singleton);
    const assetMap = builder.use(AssetMap.singleton);

    const mapping = assetMap.add({
      assetName: this.name,
      getFileName: this.fileName,
    });

    return {
      ref: {
        S3Bucket: bucketParam.ref,
        S3Key: mapping.out.FileName,
      },
    };
  }
}

export class AssetBucketNameParameter extends Parameter {
  public static readonly ParameterName = "AssetBucketName";

  public static readonly singleton = new SingletonExtension(
    () => new AssetBucketNameParameter(),
  );

  private constructor() {
    super(AssetBucketNameParameter.ParameterName, "String");
  }
}

export class AssetMap implements TemplateExtension {
  public static readonly FirstLevelKey = "AssetManifest";

  public static readonly singleton = SingletonExtension.registry(
    () => new AssetMap(),
  );

  public readonly assets: AssetInfo[] = [];

  private constructor() {}

  public add(asset: AssetInfo): AssetMapEntryInstance {
    this.assets.push(asset);

    return {
      out: {
        FileName: Fn.findInMap(
          AssetMap.FirstLevelKey,
          asset.assetName,
          "FileName" satisfies keyof AssetMapEntryData,
        ),
      },
    };
  }

  public async onBuild(builder: TemplateBuilder): Promise<void> {
    const allAssets = await Promise.all(
      this.assets.map(
        async (assetInfo): Promise<[string, AssetMapEntryData]> => {
          return [
            assetInfo.assetName,
            {
              FileName: await assetInfo.getFileName(),
            },
          ];
        },
      ),
    );

    builder.add(
      "Mappings",
      AssetMap.FirstLevelKey,
      Object.fromEntries(allAssets),
    );
  }
}
