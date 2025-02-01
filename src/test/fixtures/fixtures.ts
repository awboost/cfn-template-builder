import { createHash, type BinaryToTextEncoding } from "node:crypto";
import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, extname, resolve } from "node:path";
import type { Readable } from "node:stream";
import type { AssetData } from "../../builder.js";
import {
  DefaultFileNameHashLength,
  DefaultIntegrityAlgorithm,
} from "../../internal/defaults.js";
import { lazy } from "../../internal/lazy.js";

export class TestFixture {
  public readonly ext: string;
  public readonly path: string;
  public readonly buffer = lazy(async () => await readFile(this.path));

  public readonly text = lazy(async () => {
    const buffer = await this.buffer();
    return buffer.toString();
  });

  public constructor(public readonly fileName: string) {
    this.path = resolve(import.meta.dirname, fileName);
    this.ext = extname(fileName);
  }

  public async fileNameWithHash(
    algorithm = DefaultIntegrityAlgorithm,
    length = DefaultFileNameHashLength,
  ): Promise<string> {
    const hash = await this.hash(algorithm, "hex", length);
    return basename(this.fileName, this.ext) + "." + hash + this.ext;
  }

  public async hash(
    algorithm: string,
    encoding: BinaryToTextEncoding,
    length?: number,
  ): Promise<string> {
    const hash = createHash(algorithm)
      .update(await this.buffer())
      .digest(encoding);

    if (length) {
      return hash.slice(0, length);
    }
    return hash;
  }

  public async generate(
    integrityAlgorithm = DefaultIntegrityAlgorithm,
  ): Promise<AssetData> {
    return {
      content: this.readable(),
      fileName: this.fileName,
      integrity: await this.integrity(integrityAlgorithm),
    };
  }

  public async integrity(
    algorithm = DefaultIntegrityAlgorithm,
  ): Promise<string> {
    const hash = await this.hash(algorithm, "base64");
    return `${algorithm}-${hash}`;
  }

  public readable(): Readable {
    return createReadStream(this.path);
  }
}

export const Fixtures = {
  hello: new TestFixture("hello.txt"),
};
