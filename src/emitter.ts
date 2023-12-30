import { createWriteStream } from "node:fs";
import { rename } from "node:fs/promises";
import { resolve } from "node:path";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { AssetEmitter, AssetLike } from "./builder.js";
import { TypedEventEmitterBase } from "./internal/TypedEventEmitter.js";
import { streamLength } from "./internal/streamLength.js";

export type SchedulerFunction = <T>(fn: () => PromiseLike<T>) => PromiseLike<T>;

export type FileSystemAssetEmitterOptions = {
  outputDirectory: string;
  scheduler?: SchedulerFunction;
};

/**
 * Event which is emitted when progress happens while emitting.
 */
export type AssetEmitterProgress = {
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

  constructor(options: FileSystemAssetEmitterOptions) {
    super();

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
    const contentStream = asset.createReadStream();
    let reportedSize: number | undefined;
    let measuredSize = 0;

    // don't block trying to get the content size
    streamLength(contentStream).then(
      (size) => {
        reportedSize = size;
      },
      () => void 0,
    );

    const initialPath = resolve(
      this.options.outputDirectory,
      asset.fileName + ".incomplete_" + Math.random().toString(36).slice(2, 8),
    );

    await pipeline(
      contentStream,
      new Transform({
        transform: (chunk, encoding, callback) => {
          // report progress
          this.emit("progress", {
            fileName: asset.fileName,
            totalBytes: reportedSize,
            writtenBytes: chunk.length,
          });
          measuredSize += chunk.length;
          callback(undefined, chunk);
        },
      }),
      createWriteStream(initialPath),
    );

    const info = {
      fileName: asset.fileName,
      totalBytes: measuredSize,
    };

    // report measured size
    this.emit("progress", info);

    const finalPath = resolve(this.options.outputDirectory, asset.fileName);
    await rename(initialPath, finalPath);

    return info;
  }
}
