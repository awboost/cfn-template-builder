import { createReadStream } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { parse } from "ssri";
import type {
  AssetEmitter,
  TemplateBuilder,
  TemplateExtension,
} from "../builder.js";
import { lazy } from "../internal/lazy.js";
import type { AsyncProvider } from "../internal/provider.js";
import { FindInMap } from "../intrinsics.js";
import {
  getAssetContent,
  type AssetContent,
  type AssetContentInput,
} from "./asset-content.js";
import { Parameter } from "./parameter.js";
import { SingletonExtension } from "./singleton.js";

export type AssetOptions = {
  fileExt?: string;
  hashLength?: number;
  integrity?: { algorithms?: string[] };
  noHash?: boolean;
};

export type AssetFromFileOptions = AssetOptions & {
  fileName?: string;
};

export type AssetRef = {
  readonly S3Bucket: string;
  readonly S3Key: string;
};

export type AssetInstance = {
  ref: AssetRef;
};

export type AssetMapEntryData = {
  FileName: string;
  Integrity: string;
};

export type AssetMapEntryInstance = {
  out: AssetMapEntryData;
};

export class Asset implements TemplateExtension<AssetInstance> {
  public static fromFile(
    assetName: string,
    path: string,
    opts: AssetFromFileOptions = {},
  ): Asset {
    const {
      fileExt = extname(path),
      fileName = assetName + fileExt,
      ...assetOptions
    } = opts;

    return new this(
      assetName,
      {
        content: () => createReadStream(path),
        fileName,
      },
      { ...assetOptions, fileExt },
    );
  }

  private readonly content: () => PromiseLike<AssetContent>;
  public readonly name: string;

  public constructor(
    name: string,
    content: AsyncProvider<AssetContentInput>,
    options?: AssetOptions,
  ) {
    this.name = name;

    this.content = lazy(async (): Promise<AssetContent> => {
      const result = await getAssetContent(content, {
        integrity: options?.integrity,
      });
      if (options?.noHash) {
        return result;
      }

      let fileName = result.fileName;
      const ext = options?.fileExt ?? extname(fileName);
      const base = join(dirname(fileName), basename(fileName, ext));

      const integrity = parse(result.integrity)
        .hexDigest()
        .slice(0, options?.hashLength ?? 32);

      fileName = `${base}.${integrity}${ext}`;

      return {
        content: result.content,
        fileName,
        integrity: result.integrity,
      };
    });
  }

  public async onEmit(emitter: AssetEmitter): Promise<void> {
    emitter.addAsset(await this.content());
  }

  public onUse(builder: TemplateBuilder): AssetInstance {
    const bucketParam = builder.use(AssetBucketNameParameter.singleton);
    const assetMap = builder.use(AssetMap.singleton);
    const mapping = assetMap.add(this.name, this.content);

    return {
      ref: {
        S3Bucket: bucketParam.ref,
        S3Key: mapping.out.FileName,
      },
    };
  }
}

export class AssetBucketNameParameter extends Parameter<"String"> {
  public static readonly ParameterName = "AssetBucketName";

  public static readonly singleton = new SingletonExtension(
    () => new AssetBucketNameParameter(),
  );

  private constructor() {
    super(AssetBucketNameParameter.ParameterName, "String");
  }
}

export class AssetMap implements TemplateExtension {
  public static readonly MapName = "AssetManifest";

  public static readonly singleton = SingletonExtension.registry(
    () => new AssetMap(),
  );

  private readonly assets = new Map<string, () => PromiseLike<AssetContent>>();

  private constructor() {}

  public add(
    name: string,
    asset: () => PromiseLike<AssetContent>,
  ): AssetMapEntryInstance {
    if (this.assets.has(name)) {
      throw new Error(`duplicate asset named "${name}"`);
    }
    this.assets.set(name, asset);

    return {
      out: {
        FileName: FindInMap(AssetMap.MapName, name, "FileName") as string,
        Integrity: FindInMap(AssetMap.MapName, name, "Integrity") as string,
      },
    };
  }

  public async onBuild(builder: TemplateBuilder): Promise<void> {
    builder.add(
      "Mappings",
      AssetMap.MapName,
      Object.fromEntries(
        await Promise.all(
          [...this.assets.entries()].map(
            async ([name, provider]): Promise<[string, AssetMapEntryData]> => {
              const asset = await provider();
              return [
                name,
                {
                  FileName: asset.fileName,
                  Integrity: asset.integrity,
                },
              ];
            },
          ),
        ),
      ),
    );
  }
}
