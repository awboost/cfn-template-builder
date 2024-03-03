import assert from "node:assert";
import { createReadStream } from "node:fs";
import { Readable } from "node:stream";
import { text } from "node:stream/consumers";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { toStream } from "./to-stream.js";

describe("toStream()", () => {
  it("passes through a Readable instance unchanged", async () => {
    const value = Readable.from("hello");

    const stream = toStream(value);
    const contents = await text(stream);

    assert.strictEqual(stream, value);
    assert.strictEqual(contents, "hello");
  });

  it("passes through an fs stream unchanged", () => {
    const value = createReadStream(fileURLToPath(import.meta.url));

    const stream = toStream(value);

    assert.strictEqual(stream, value);
  });

  it("makes a readable from a string", async () => {
    const value = "hello";

    const stream = toStream(value);
    assert.ok(stream instanceof Readable);

    const contents = await text(stream);
    assert.strictEqual(contents, "hello");
  });
});
