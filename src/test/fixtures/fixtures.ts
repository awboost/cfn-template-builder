import { createHash, type BinaryToTextEncoding } from "node:crypto";
import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import type { Readable } from "node:stream";
import type { Compatibility } from "../../compatibility.js";
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

  public generate(): Compatibility.AssetOutput {
    return {
      content: this.readable(),
      fileName: this.fileName,
    };
  }

  public readable(): Readable {
    return createReadStream(this.path);
  }
}

export const Fixtures = {
  hello: new TestFixture("hello.txt"),
};
