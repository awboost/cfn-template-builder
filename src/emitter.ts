import { createWriteStream } from "node:fs";
import { rename } from "node:fs/promises";
import { resolve } from "node:path";
import { Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { integrityStream } from "ssri";
import type { AssetEmitter, AssetLike } from "./builder.js";
import { TypedEventEmitterBase } from "./internal/events.js";
import {
  streamLength,
  type Fs as StreamLengthServices,
} from "./internal/stream-length.js";
import { toStream } from "./internal/to-stream.js";

export type SchedulerFunction = <T>(fn: () => PromiseLike<T>) => PromiseLike<T>;

export type FileSystemAssetEmitterOptions = {
  outputDirectory: string;
  scheduler?: SchedulerFunction;
};

export type Fs = {
  createWriteStream(path: string, options?: BufferEncoding): Writable;
  rename(oldPath: string, newPath: string): PromiseLike<void>;
} & Partial<StreamLengthServices>;

/**
 * Event which is emitted when progress happens while emitting.
 */
export type AssetEmitterProgress = {
  complete?: boolean;
  fileName: string;
  totalBytes?: number;
  writtenBytes?: number;
};

/**
 * Details of an emitted file.
 */
export type AssetInfo = {
  fileName: string;
  totalBytes: number;
};

type FileSystemAssetEmitterResolvedOptions = {
  outputDirectory: string;
  scheduler: SchedulerFunction;
};

/**
 * Class which can emit assets to the file system.
 */
export class FileSystemAssetEmitter
  extends TypedEventEmitterBase<{
    progress(event: AssetEmitterProgress): void;
  }>
  implements AssetEmitter
{
  private readonly options: FileSystemAssetEmitterResolvedOptions;
  private readonly results: PromiseLike<AssetInfo>[] = [];
  private readonly fs: Fs;

  constructor(options: FileSystemAssetEmitterOptions, fs: Partial<Fs> = {}) {
    super();

    this.fs = {
      createWriteStream,
      rename,
      ...fs,
    };

    this.options = {
      outputDirectory: options.outputDirectory,
      scheduler: options.scheduler ?? ((x) => x()),
    };
  }

  /**
   * Add an asset to the output.
   */
  public addAsset(asset: AssetLike): void {
    this.results.push(this.options.scheduler(() => this.emitAsset(asset)));
  }

  /**
   * Wait for all assets to be emitted.
   * @returns Information about each asset that was emitted.
   */
  public async done(): Promise<AssetInfo[]> {
    return Promise.all(this.results);
  }

  private async emitAsset(asset: AssetLike): Promise<AssetInfo> {
    const { content, fileName, integrity } = asset;
    let contentStream = toStream(content);
    let reportedSize: number | undefined;
    let measuredSize = 0;

    // don't block trying to get the content size
    streamLength(contentStream, this.fs).then(
      (size) => {
        reportedSize = size;
      },
      () => void 0,
    );

    const initialPath = resolve(
      this.options.outputDirectory,
      fileName + ".incomplete_" + Math.random().toString(36).slice(2, 8),
    );

    if (integrity) {
      contentStream = contentStream.pipe(integrityStream({ integrity }));
    }

    await pipeline(
      contentStream,
      new Transform({
        transform: (chunk, encoding, callback) => {
          measuredSize += chunk.length;

          // report progress
          this.emit("progress", {
            fileName,
            totalBytes: reportedSize,
            writtenBytes: measuredSize,
          });

          callback(undefined, chunk);
        },
      }),
      this.fs.createWriteStream(initialPath),
    );

    const info = {
      fileName,
      totalBytes: measuredSize,
    };

    // report completion measured size
    this.emit("progress", { complete: true, ...info });

    const finalPath = resolve(this.options.outputDirectory, fileName);
    await this.fs.rename(initialPath, finalPath);

    return info;
  }
}
