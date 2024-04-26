import { createWriteStream } from "node:fs";
import { rename } from "node:fs/promises";
import { resolve } from "node:path";
import { Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";
import type { AssetEmitter, AssetLike } from "./builder.js";
import { TypedEventEmitterBase } from "./internal/events.js";
import type { Fs as StreamLengthServices } from "./internal/stream-length.js";
import { contentLength, makeContentStream } from "./util/content.js";

export type SchedulerFunction = <T>(fn: () => PromiseLike<T>) => PromiseLike<T>;

export type FileSystemAssetEmitterOptions = {
  outputDirectory: string;
  scheduler?: SchedulerFunction;
};

export type Fs = {
  createWriteStream: (path: string, options?: BufferEncoding) => Writable;
  rename: (oldPath: string, newPath: string) => PromiseLike<void>;
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

type FileSystemAssetEmitterResolvedOptions = {
  outputDirectory: string;
  scheduler: SchedulerFunction;
};

/**
 * Class which can emit assets to the file system.
 */
export class FileSystemAssetEmitter
  extends TypedEventEmitterBase<{
    progress: (event: AssetEmitterProgress) => void;
  }>
  implements AssetEmitter
{
  private readonly options: FileSystemAssetEmitterResolvedOptions;
  private readonly results: PromiseLike<void>[] = [];
  private readonly fs: Fs;

  public constructor(
    options: FileSystemAssetEmitterOptions,
    fs: Partial<Fs> = {},
  ) {
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
  public async done(): Promise<void> {
    await Promise.all(this.results);
  }

  private async emitAsset(asset: AssetLike): Promise<void> {
    const fileName = asset.fileName;

    const initialPath = resolve(
      this.options.outputDirectory,
      fileName + ".incomplete_" + Math.random().toString(36).slice(2, 8),
    );

    const totalBytes = await contentLength(asset.content, this.fs);
    let writtenBytes = 0;

    await pipeline(
      makeContentStream(asset),

      new Transform({
        transform: (chunk, encoding, callback) => {
          writtenBytes += chunk.length as number;

          this.emit("progress", {
            fileName,
            totalBytes,
            writtenBytes,
          });

          callback(undefined, chunk);
        },
      }),
      this.fs.createWriteStream(initialPath),
    );

    const finalPath = resolve(this.options.outputDirectory, asset.fileName);
    await this.fs.rename(initialPath, finalPath);

    this.emit("progress", {
      complete: true,
      fileName,
      totalBytes: writtenBytes,
    });
  }
}
