import assert from "node:assert";
import { Stats, createReadStream } from "node:fs";
import { IncomingMessage, Server, get } from "node:http";
import { Readable } from "node:stream";
import { describe, it, mock } from "node:test";
import { streamLength } from "./stream-length.js";

describe("streamLength", () => {
  it("calls stat when the stream has a path property", async () => {
    const stat = mock.fn(async (path: string) => ({ size: 100 }) as Stats);
    const stream = { path: "hello.txt" } as any;

    const length = await streamLength(stream, { stat });

    assert.strictEqual(stat.mock.callCount(), 1);
    assert.strictEqual(stat.mock.calls[0]?.arguments[0], "hello.txt");
    assert.strictEqual(length, 100);
  });

  it("determines the correct length of a real file stream", async () => {
    const stream = createReadStream("./fixtures/hello.txt");

    const length = await streamLength(stream);

    assert.strictEqual(length, 12);
  });

  it("does not throw if stat fails", async () => {
    const stream = Object.assign(Readable.from("hello"), { path: "hello.txt" });

    const stat = mock.fn(async (path: string) => {
      throw new Error("bang");
    });

    const length = await streamLength(stream, { stat });

    assert.strictEqual(stat.mock.callCount(), 1);
    assert.strictEqual(stat.mock.calls[0]?.arguments[0], "hello.txt");
    assert.strictEqual(length, undefined);
  });

  it("determines the correct length of an http stream", async () => {
    const server = new Server((_, res) => {
      res.end("hello world");
    });

    // self request and return the response stream
    const response = await new Promise<IncomingMessage>((resolve, reject) => {
      server
        .once("listening", () => get("http://localhost:11000/", resolve))
        .once("error", reject)
        .listen(11000);
    });

    // get the length of the response stream
    const length = await streamLength(response);

    // close and wait for close
    await new Promise<void>((resolve, reject) => {
      server
        .once("error", reject)
        .once("close", () => {
          resolve();
        })
        .close();
    });

    assert.strictEqual(length, 11);
  });
});
