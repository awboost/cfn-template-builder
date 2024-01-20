import assert from "node:assert";
import { createReadStream } from "node:fs";
import { describe, it } from "node:test";
import { streamLength } from "./stream-length.js";

describe("streamLength", () => {
  it("determines the correct length of a file stream", async () => {
    const stream = createReadStream("./fixtures/hello.txt");
    const length = await streamLength(stream);
    assert.equal(length, 12);
  });
});
