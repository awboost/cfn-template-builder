import assert from "node:assert";
import { Readable } from "node:stream";
import { text } from "node:stream/consumers";
import { describe, it } from "node:test";
import { Stack } from "../stack.js";
import type { Template } from "../template.js";
import { Asset } from "./asset.js";

const hash = "db3974a97f2407b7cae1ae637c003068";
const integrity =
  "sha512-2zl0qX8kB7fK4a5jfAAwaHoRkTJ01XhJJVjjnBbAF96E6s3Ixi/jTuThK0sUKIF/Cbaidgw/imZM6ulNJDSlkw==";

describe("Asset", () => {
  describe("fromFile", () => {
    it("creates an asset with the provided name", () => {
      const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt");
      assert.strictEqual(asset.name, "MyAsset");
    });

    it("creates an asset with the expected filename", async (t) => {
      const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt");
      const output = await asset.generate();

      assert.strictEqual(output.fileName, `MyAsset.txt`);
    });

    it("creates an asset with the expected content", async (t) => {
      const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt");
      const output = await asset.generate();

      const content = output.content;
      const data = await text(Readable.from(content));

      assert.strictEqual(data, "hello world\n");
    });

    describe("if fileExt is set", () => {
      it("creates an asset with the component provided", async (t) => {
        const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt", {
          fileExt: ".asset.txt",
        });

        const output = await asset.generate();

        assert.strictEqual(output.fileName, `MyAsset.asset.txt`);
      });
    });
  });

  it("throws if there are two assets with the same name", async () => {
    const asset1 = Asset.fromFile("MyAsset", "./fixtures/hello.txt");
    const asset2 = Asset.fromFile("MyAsset", "./fixtures/hello.txt");

    const template: Template = { Resources: {} };
    const stack = new Stack(template);

    asset1.onUse(stack);

    assert.throws(
      () => asset2.onUse(stack),
      (err: any) => {
        err.message.startsWith("duplicate asset");
        return true;
      },
    );
  });
});
