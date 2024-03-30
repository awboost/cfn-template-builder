import assert from "node:assert";
import { Readable } from "node:stream";
import { text } from "node:stream/consumers";
import { describe, it } from "node:test";
import { contentLength, makeContentStream } from "./content.js";

describe("contentLength", () => {
  it("returns the byte length for a string", async () => {
    const value = await contentLength("hello world 🙂");

    assert.strictEqual(value, 16);
  });

  it("returns the correct length for a Buffer", async () => {
    const value = await contentLength(
      Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
    );

    assert.strictEqual(value, 6);
  });
});

describe("makeContentStream", () => {
  describe("when input is a string", () => {
    it("returns a stream with the same content", async () => {
      const stream = makeContentStream({ content: "hello world!" });

      const data = await text(stream);

      assert.strictEqual(data, "hello world!");
    });

    it("succeeds if integrity is valid", async () => {
      const stream = makeContentStream({
        content: "hello world!",
        integrity: "sha1-QwzjTQIHJO11oZbfwq1nx3dy0Wk=",
      });

      const data = await text(stream);

      assert.strictEqual(data, "hello world!");
    });

    it("throws if integrity is invalid", async () => {
      const stream = makeContentStream({
        content: "hello world!",
        integrity: "sha1-QwzjToZbfwq1nx3dQIHJO11y0Wk=",
      });

      await assert.rejects(
        () => text(stream),
        (err: NodeJS.ErrnoException) => {
          assert.strictEqual(err.code, "EINTEGRITY");
          return true;
        },
      );
    });
  });

  describe("when input is a buffer", () => {
    it("returns a stream with the same content", async () => {
      const stream = makeContentStream({
        content: Buffer.from("hello world!"),
      });

      const data = await text(stream);

      assert.strictEqual(data, "hello world!");
    });

    it("succeeds if integrity is valid", async () => {
      const stream = makeContentStream({
        content: Buffer.from("hello world!"),
        integrity: "sha1-QwzjTQIHJO11oZbfwq1nx3dy0Wk=",
      });

      const data = await text(stream);

      assert.strictEqual(data, "hello world!");
    });

    it("throws if integrity is invalid", async () => {
      const stream = makeContentStream({
        content: Buffer.from("hello world!"),
        integrity: "sha1-QwzjToZbfwq1nx3dQIHJO11y0Wk=",
      });

      await assert.rejects(
        () => text(stream),
        (err: NodeJS.ErrnoException) => {
          assert.strictEqual(err.code, "EINTEGRITY");
          return true;
        },
      );
    });
  });

  describe("when input is a stream", () => {
    it("returns a stream with the same content", async () => {
      const stream = makeContentStream({
        content: Readable.from("hello world!"),
      });

      const data = await text(stream);

      assert.strictEqual(data, "hello world!");
    });

    it("returns the same stream when no integrity is given", async () => {
      const content = Readable.from("hello world!");
      const stream = makeContentStream({ content });

      assert.strictEqual(stream, content);
    });

    it("succeeds if integrity is valid", async () => {
      const stream = makeContentStream({
        content: Readable.from("hello world!"),
        integrity: "sha1-QwzjTQIHJO11oZbfwq1nx3dy0Wk=",
      });

      const data = await text(stream);

      assert.strictEqual(data, "hello world!");
    });

    it("throws if integrity is invalid", async () => {
      const stream = makeContentStream({
        content: Readable.from("hello world!"),
        integrity: "sha1-QwzjToZbfwq1nx3dQIHJO11y0Wk=",
      });

      await assert.rejects(
        () => text(stream),
        (err: NodeJS.ErrnoException) => {
          assert.strictEqual(err.code, "EINTEGRITY");
          return true;
        },
      );
    });
  });
});
