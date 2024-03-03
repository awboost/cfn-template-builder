import assert from "node:assert";
import { Readable } from "node:stream";
import { text } from "node:stream/consumers";
import { describe, it, mock } from "node:test";
import { getAssetContent, type AssetContentInput } from "./asset-content.js";

describe("getAssetContent()", () => {
  describe("when integrity is not given", () => {
    it("calculates the integrity correctly when content is a string", async () => {
      const input: AssetContentInput = {
        content: "hello world",
        fileName: "file.txt",
      };

      const result = await getAssetContent(input);
      const data = await text(result.content);

      assert.strictEqual(data, "hello world");
      assert.strictEqual(result.fileName, "file.txt");

      assert.strictEqual(
        result.integrity,
        "sha512-MJ7MSJwS1utMxA9QyQLytNDtd+5RGnx6m808qG1M2G+YndNbxf9JlnDaNCVbRbDP2DDoH2Bdz33FVC6TrpzXbw==",
      );
    });

    it("calculates the integrity correctly when content is a stream", async () => {
      const input: AssetContentInput = {
        content: Readable.from("hello world"),
        fileName: "file.txt",
      };

      const result = await getAssetContent(input);
      const data = await text(result.content);

      assert.strictEqual(data, "hello world");
      assert.strictEqual(result.fileName, "file.txt");

      assert.strictEqual(
        result.integrity,
        "sha512-MJ7MSJwS1utMxA9QyQLytNDtd+5RGnx6m808qG1M2G+YndNbxf9JlnDaNCVbRbDP2DDoH2Bdz33FVC6TrpzXbw==",
      );
    });

    it("calculates the integrity correctly when content is a function which returns a stream", async () => {
      const generate = mock.fn(() => Readable.from("hello world"));

      const input: AssetContentInput = {
        content: generate,
        fileName: "file.txt",
      };

      const result = await getAssetContent(input);
      const data = await text(result.content);

      assert.strictEqual(data, "hello world");
      assert.strictEqual(result.fileName, "file.txt");

      assert.strictEqual(
        result.integrity,
        "sha512-MJ7MSJwS1utMxA9QyQLytNDtd+5RGnx6m808qG1M2G+YndNbxf9JlnDaNCVbRbDP2DDoH2Bdz33FVC6TrpzXbw==",
      );

      // the generate function should be called twice to avoid buffering
      assert.strictEqual(generate.mock.callCount(), 2);
    });

    it("calculates the integrity using the requested algorithm", async () => {
      const input: AssetContentInput = {
        content: "hello world",
        fileName: "file.txt",
      };

      const result = await getAssetContent(input, {
        integrity: { algorithms: ["sha256"] },
      });
      const data = await text(result.content);

      assert.strictEqual(data, "hello world");
      assert.strictEqual(result.fileName, "file.txt");

      assert.strictEqual(
        result.integrity,
        "sha256-uU0nuZNNPgilLlLX2n2r+sSE7+N6U4DukIj3rOLvzek=",
      );
    });
  });

  describe("when integrity is given", () => {
    it("uses the given value", async () => {
      const generate = mock.fn(() => Readable.from("hello world"));

      const input: AssetContentInput = {
        content: generate,
        fileName: "file.txt",
        integrity:
          "sha512-MJ7MSJwS1utMxA9QyQLytNDtd+5RGnx6m808qG1M2G+YndNbxf9JlnDaNCVbRbDP2DDoH2Bdz33FVC6TrpzXbw==",
      };

      const result = await getAssetContent(input);
      const data = await text(result.content);

      assert.strictEqual(data, "hello world");
      assert.strictEqual(result.fileName, "file.txt");

      assert.strictEqual(
        result.integrity,
        "sha512-MJ7MSJwS1utMxA9QyQLytNDtd+5RGnx6m808qG1M2G+YndNbxf9JlnDaNCVbRbDP2DDoH2Bdz33FVC6TrpzXbw==",
      );

      // the generate function should only have been called once, because the
      // integrity is supplied
      assert.strictEqual(generate.mock.callCount(), 1);
    });

    it("calls the integrity value if it is a function", async () => {
      const integrity = mock.fn(
        () =>
          "sha512-MJ7MSJwS1utMxA9QyQLytNDtd+5RGnx6m808qG1M2G+YndNbxf9JlnDaNCVbRbDP2DDoH2Bdz33FVC6TrpzXbw==",
      );
      const generate = mock.fn(() => Readable.from("hello world"));

      const input: AssetContentInput = {
        content: generate,
        fileName: "file.txt",
        integrity,
      };

      const result = await getAssetContent(input);
      const data = await text(result.content);

      assert.strictEqual(data, "hello world");
      assert.strictEqual(result.fileName, "file.txt");

      assert.strictEqual(
        result.integrity,
        "sha512-MJ7MSJwS1utMxA9QyQLytNDtd+5RGnx6m808qG1M2G+YndNbxf9JlnDaNCVbRbDP2DDoH2Bdz33FVC6TrpzXbw==",
      );

      // the generate function should only have been called once, because the
      // integrity is supplied
      assert.strictEqual(generate.mock.callCount(), 1);

      assert.strictEqual(integrity.mock.callCount(), 1);
    });

    it("throws an error on stream if the integrity value is invalid and the content is a stream", async () => {
      const input: AssetContentInput = {
        content: Readable.from("hello world"),
        fileName: "file.txt",
        integrity: "sha512-invalid",
      };

      const result = await getAssetContent(input);

      await assert.rejects(
        () => text(result.content),
        (err: any) => {
          assert.strictEqual(err?.code, "EINTEGRITY");
          return true;
        },
      );
    });

    it("throws an error immediately if the integrity value is invalid and the input is a strring", async () => {
      const input: AssetContentInput = {
        content: "hello world",
        fileName: "file.txt",
        integrity: "sha512-invalid",
      };

      await assert.rejects(
        () => getAssetContent(input),
        (err: any) => {
          assert.strictEqual(err?.code, "EINTEGRITY");
          return true;
        },
      );
    });
  });
});
