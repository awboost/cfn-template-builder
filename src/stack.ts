import { createHash, randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import { mkdtemp, rename, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import {
  mergeTemplates,
  type DeploymentAsset,
  type TemplateComponent,
  type TemplateFragment,
} from "./builder.js";
import { maxConcurrencyScheduler, type Scheduler } from "./internal/async.js";
import {
  TypedEventEmitterBase,
  type TypedEventListener,
} from "./internal/events.js";
import { FindInMap, Ref } from "./intrinsics.js";
import type { MappingDefinition, Template } from "./template.js";

/**
 * An object which can write a stack.
 */
export type StackWriter = {
  write: (stack: TemplateFragment) => PromiseLike<void>;
};

/**
 * Options for {@link DefaultStackWriter}.
 */
export type DefaultStackWriterOptions = {
  concurrency?: number | Scheduler;
  hashAlgorithm?: string;
  hashLength?: number;
  outputPath: string;
  templateFileName?: string;
  templateVersion?: string;
};

/**
 * Event fired when there is progress on writing an asset.
 */
export type ProgressEvent = {
  assetName: string;
  done?: boolean;
  fileName: string;
  progress: number;
  total?: number;
};

/**
 * Event map for {@link StackWriter} events.
 */
export type StackWriterEvents = {
  progress: (event: ProgressEvent) => void;
};

type NormalizedStackWriterOptions = {
  concurrency: Scheduler;
  hashAlgorithm: string;
  hashLength: number;
  outputPath: string;
  templateFileName: string;
  templateVersion?: string;
};

/**
 * Writes the assets to disk with a hash included in the name, and stores the
 * asset information in a Mapping element.
 */
export class DefaultStackWriter implements StackWriter {
  public static readonly AssetBucketParameterName = "AssetBucketName";
  public static readonly AssetMappingFileNameKey = "FileName";
  public static readonly AssetMappingName = "AssetManifest";
  public static readonly TemplateVersionMetadataKey = "TemplateVersion";

  readonly #options: NormalizedStackWriterOptions;

  readonly #events = new TypedEventEmitterBase<StackWriterEvents>();

  public get events(): TypedEventListener<StackWriterEvents> {
    return this.#events;
  }

  public constructor(options: DefaultStackWriterOptions) {
    const {
      concurrency = 5,
      outputPath,
      hashAlgorithm = "sha512",
      hashLength = 12,
      templateFileName = "template.json",
      templateVersion,
    } = options;

    this.#options = {
      concurrency:
        typeof concurrency === "number"
          ? maxConcurrencyScheduler(concurrency)
          : concurrency,
      hashAlgorithm,
      hashLength,
      outputPath,
      templateFileName,
      templateVersion,
    };
  }

  public async write(stack: TemplateFragment): Promise<void> {
    let template: Template = { Resources: {}, ...stack.template };

    if (stack.assets?.length) {
      const stagingDirectory = await mkdtemp(join(tmpdir(), "stack-build-"));

      const assets = await Promise.all(
        stack.assets.map(async (asset): Promise<[DeploymentAsset, string]> => {
          const fileName = await this.#writeAsset(stagingDirectory, asset);
          return [asset, fileName];
        }),
      );

      const mapping: MappingDefinition = {};
      for (const [asset, fileName] of assets) {
        mapping[asset.name] = {
          [DefaultStackWriter.AssetMappingFileNameKey]: fileName,
        };

        asset.resolveLocation(
          Ref(DefaultStackWriter.AssetBucketParameterName) as string,
          FindInMap(
            DefaultStackWriter.AssetMappingName,
            asset.name,
            DefaultStackWriter.AssetMappingFileNameKey,
          ) as string,
        );
      }

      // create a Mapping element containing the asset manifest
      template = {
        ...template,
        Mappings: {
          ...template.Mappings,
          [DefaultStackWriter.AssetMappingName]: mapping,
        },
        Parameters: {
          ...template.Parameters,
          [DefaultStackWriter.AssetBucketParameterName]: {
            Type: "String",
          },
        },
      };
    }

    if (this.#options.templateVersion) {
      // save template version as metadata in template
      template = {
        ...template,
        Metadata: {
          ...template.Metadata,
          [DefaultStackWriter.TemplateVersionMetadataKey]:
            this.#options.templateVersion,
        },
      };
    }

    // write template file
    await writeFile(
      join(this.#options.outputPath, this.#options.templateFileName),
      JSON.stringify(template, undefined, 2),
    );
  }

  async #writeAsset(
    stagingDirectory: string,
    asset: DeploymentAsset,
  ): Promise<string> {
    const hash = createHash(this.#options.hashAlgorithm);
    const tempAssetPath = join(stagingDirectory, randomUUID());

    if (Buffer.isBuffer(asset.content)) {
      this.#events.emit("progress", {
        assetName: asset.name,
        fileName: asset.fileName,
        progress: 0,
        total: asset.content.length,
      });

      hash.update(asset.content);
      await writeFile(tempAssetPath, asset.content);

      this.#events.emit("progress", {
        assetName: asset.name,
        done: true,
        fileName: asset.fileName,
        progress: asset.content.length,
        total: asset.content.length,
      });
    } else {
      let progress = 0;

      this.#events.emit("progress", {
        assetName: asset.name,
        fileName: asset.fileName,
        progress,
        total: asset.size,
      });

      // write to temp location to get hash
      await pipeline(
        asset.content,
        hash,
        new Transform({
          transform: (chunk, encoding, callback) => {
            const bufferChunk = Buffer.isBuffer(chunk)
              ? chunk
              : Buffer.from(chunk, encoding);

            progress += bufferChunk.length;

            this.#events.emit("progress", {
              assetName: asset.name,
              fileName: asset.fileName,
              progress,
              total: asset.size,
            });

            callback(undefined, chunk);
          },
        }),
        createWriteStream(tempAssetPath),
      );
      this.#events.emit("progress", {
        assetName: asset.name,
        done: true,
        fileName: asset.fileName,
        progress,
        total: progress,
      });
    }

    // keep this after writing the asset: the fileName might only be set after
    // the asset is written in certain cases (e.g. with CompatibleAsset)
    const ext = getExt(asset.fileName);
    const hashTag = hash.digest("hex").slice(0, this.#options.hashLength);
    const finalFileName = `${asset.name}-${hashTag}${ext}`;
    const finalPath = join(this.#options.outputPath, finalFileName);

    // move the temp file to the output dir with the correct file name
    await rename(tempAssetPath, finalPath);
    return finalPath;
  }
}

/**
 * A whole deployment with template and assets.
 */
export class Stack implements TemplateFragment {
  public readonly assets: DeploymentAsset[];
  public readonly template: Template;

  public constructor(fragment?: TemplateFragment) {
    this.assets = fragment?.assets ?? [];
    this.template = { Resources: {}, ...fragment?.template };
  }

  /**
   * Add the given fragment to this fragment.
   */
  public add<Output>(component: TemplateComponent<Output>): Output;
  public add(fragment: TemplateFragment | TemplateComponent): void;
  public add(element: TemplateFragment | TemplateComponent<unknown>): unknown {
    if ("build" in element) {
      return element.build(this);
    }
    if (element.assets) {
      this.assets.push(...element.assets);
    }
    if (element.template) {
      mergeTemplates(this.template, element.template);
    }
  }

  /**
   * Write the stack to disk using {@link DefaultStackWriter}.
   */
  public async write(options: DefaultStackWriterOptions): Promise<void> {
    const writer = new DefaultStackWriter(options);
    await writer.write(this);
  }
}

/**
 * Get the extension of the file name, if any. Unlike `extname` from Node's "fs"
 * module, this returns the extension from the first period, not the last.
 */
function getExt(fileName: string): string {
  const dotIndex = fileName.indexOf(".");
  return dotIndex < 0 ? "" : fileName.slice(dotIndex);
}
