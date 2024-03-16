import assert from "node:assert";
import type { Stats } from "node:fs";
import { PassThrough, Readable } from "node:stream";
import { text } from "node:stream/consumers";
import { describe, it, mock } from "node:test";
import {
  FileSystemAssetEmitter,
  type AssetEmitterProgress,
} from "./emitter.js";

describe("FileSystemAssetEmitter", () => {
  it("outputs an intermediate file for each asset", async () => {
    const createWriteStream = mock.fn((path: string) => new PassThrough());
    const rename = mock.fn(async (a: string, b: string) => undefined);

    const emitter = new FileSystemAssetEmitter(
      {
        outputDirectory: "/path/to/output",
      },
      {
        createWriteStream,
        rename,
      },
    );

    emitter.addAsset({
      content: "hello world",
      fileName: "hello.txt",
    });

    emitter.addAsset({
      content: "42",
      fileName: "answer.txt",
    });

    await emitter.done();

    assert.strictEqual(createWriteStream.mock.callCount(), 2);

    assert(
      createWriteStream.mock.calls[0]?.arguments[0]?.startsWith(
        "/path/to/output/hello.txt.incomplete_",
      ),
    );
    assert.strictEqual(
      await text(createWriteStream.mock.calls[0]?.result!),
      "hello world",
    );

    assert(
      createWriteStream.mock.calls[1]?.arguments[0]?.startsWith(
        "/path/to/output/answer.txt.incomplete_",
      ),
    );
    assert.strictEqual(
      await text(createWriteStream.mock.calls[1]?.result!),
      "42",
    );
  });

  it("renames each asset to the final name", async () => {
    const createWriteStream = mock.fn((path: string) => new PassThrough());
    const rename = mock.fn(async (a: string, b: string) => undefined);

    const emitter = new FileSystemAssetEmitter(
      {
        outputDirectory: "/path/to/output",
      },
      {
        createWriteStream,
        rename,
      },
    );

    emitter.addAsset({
      content: "hello world",
      fileName: "hello.txt",
    });

    emitter.addAsset({
      content: "42",
      fileName: "answer.txt",
    });

    await emitter.done();

    assert.strictEqual(rename.mock.callCount(), 2);

    assert(
      rename.mock.calls[0]?.arguments[0]?.startsWith(
        "/path/to/output/hello.txt.incomplete_",
      ),
    );
    assert.strictEqual(
      rename.mock.calls[0]?.arguments[1],
      "/path/to/output/hello.txt",
    );

    assert(
      rename.mock.calls[1]?.arguments[0]?.startsWith(
        "/path/to/output/answer.txt.incomplete_",
      ),
    );
    assert.strictEqual(
      rename.mock.calls[1]?.arguments[1],
      "/path/to/output/answer.txt",
    );
  });

  it("emits progress events for each chunk and on completion", async () => {
    const createWriteStream = mock.fn((path: string) => new PassThrough());
    const rename = mock.fn(async (a: string, b: string) => undefined);
    const stat = mock.fn(async (path: string) => ({ size: 10 }) as Stats);
    const listener = mock.fn((e: AssetEmitterProgress) => undefined);

    const emitter = new FileSystemAssetEmitter(
      {
        outputDirectory: "/path/to/output",
      },
      {
        createWriteStream,
        rename,
        stat,
      },
    );

    emitter.on("progress", listener);

    emitter.addAsset({
      // give the stream a path so that it gets stat'd for a length
      content: Object.assign(Readable.from(["hello", "world"]), {
        path: "hello.txt",
      }),
      fileName: "hello.txt",
    });

    await emitter.done();

    assert.strictEqual(listener.mock.callCount(), 3);

    assert.deepStrictEqual(listener.mock.calls[0]?.arguments[0], {
      fileName: "hello.txt",
      totalBytes: 10,
      writtenBytes: 5,
    });

    assert.deepStrictEqual(listener.mock.calls[1]?.arguments[0], {
      fileName: "hello.txt",
      totalBytes: 10,
      writtenBytes: 10,
    });

    assert.deepStrictEqual(listener.mock.calls[2]?.arguments[0], {
      complete: true,
      fileName: "hello.txt",
      totalBytes: 10,
    });
  });

  it("includes final size in last progress event when stream length cannot be determined", async () => {
    const createWriteStream = mock.fn((path: string) => new PassThrough());
    const rename = mock.fn(async (a: string, b: string) => undefined);
    const listener = mock.fn((e: AssetEmitterProgress) => undefined);

    const emitter = new FileSystemAssetEmitter(
      {
        outputDirectory: "/path/to/output",
      },
      {
        createWriteStream,
        rename,
      },
    );

    emitter.on("progress", listener);

    emitter.addAsset({
      content: Readable.from(["hello", "world"]),
      fileName: "hello.txt",
    });

    await emitter.done();

    assert.strictEqual(listener.mock.callCount(), 3);

    assert.deepStrictEqual(listener.mock.calls[0]?.arguments[0], {
      fileName: "hello.txt",
      totalBytes: undefined,
      writtenBytes: 5,
    });

    assert.deepStrictEqual(listener.mock.calls[1]?.arguments[0], {
      fileName: "hello.txt",
      totalBytes: undefined,
      writtenBytes: 10,
    });

    assert.deepStrictEqual(listener.mock.calls[2]?.arguments[0], {
      complete: true,
      fileName: "hello.txt",
      totalBytes: 10,
    });
  });

  it("succeeds if integrity is provided and it is valid", async () => {
    const createWriteStream = mock.fn((path: string) => new PassThrough());
    const rename = mock.fn(async (a: string, b: string) => undefined);

    const emitter = new FileSystemAssetEmitter(
      {
        outputDirectory: "/path/to/output",
      },
      {
        createWriteStream,
        rename,
      },
    );

    emitter.addAsset({
      content: "hello world",
      fileName: "hello.txt",
      integrity: "sha1-Kq5sNclPz7QV2+lfQIuc6R7oRu0=",
    });

    await emitter.done();

    assert.strictEqual(createWriteStream.mock.callCount(), 1);

    assert.strictEqual(
      await text(createWriteStream.mock.calls[0]?.result!),
      "hello world",
    );
  });

  it("fails if integrity is provided and it is invalid", async () => {
    const createWriteStream = mock.fn((path: string) => new PassThrough());
    const rename = mock.fn(async (a: string, b: string) => undefined);

    const emitter = new FileSystemAssetEmitter(
      {
        outputDirectory: "/path/to/output",
      },
      {
        createWriteStream,
        rename,
      },
    );

    emitter.addAsset({
      content: "hello world",
      fileName: "hello.txt",
      integrity: "sha1-Kq5sNcl+lfQIucPz7QV26R7oRu0=",
    });

    await assert.rejects(
      () => emitter.done(),
      (err: any) => {
        assert.strictEqual(err.code, "EINTEGRITY");
        return true;
      },
    );
  });
});
