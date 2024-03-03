import assert from "node:assert";
import { Readable } from "node:stream";
import { text } from "node:stream/consumers";
import { describe, it } from "node:test";
import type { AssetEmitter } from "../builder.js";
import { type Template } from "../template.js";
import { ExtendedTemplateBuilder } from "../util/builder.js";
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
      const addAsset = t.mock.fn<AssetEmitter["addAsset"]>();
      await asset.onEmit({ addAsset });

      assert.strictEqual(addAsset.mock.calls.length, 1);

      assert.strictEqual(
        addAsset.mock.calls[0]!.arguments[0].fileName,
        `MyAsset.${hash}.txt`,
      );
    });

    it("creates an asset with the expected content", async (t) => {
      const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt");
      const addAsset = t.mock.fn<AssetEmitter["addAsset"]>();
      await asset.onEmit({ addAsset });

      assert.strictEqual(addAsset.mock.calls.length, 1);

      const content = addAsset.mock.calls[0]!.arguments[0].content;
      const data = await text(Readable.from(content));

      assert.strictEqual(data, "hello world\n");
    });

    describe("if noHash is true", () => {
      it("creates an asset without adding a hash to the filename", async (t) => {
        const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt", {
          noHash: true,
        });
        const addAsset = t.mock.fn<AssetEmitter["addAsset"]>();
        await asset.onEmit({ addAsset });

        assert.strictEqual(addAsset.mock.calls.length, 1);

        assert.strictEqual(
          addAsset.mock.calls[0]!.arguments[0].fileName,
          "MyAsset.txt",
        );
      });
    });

    describe("if fileExt is set", () => {
      it("creates an asset with the extension provided", async (t) => {
        const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt", {
          fileExt: ".asset.txt",
        });
        const addAsset = t.mock.fn<AssetEmitter["addAsset"]>();
        await asset.onEmit({ addAsset });

        assert.strictEqual(addAsset.mock.calls.length, 1);

        assert.strictEqual(
          addAsset.mock.calls[0]!.arguments[0].fileName,
          `MyAsset.${hash}.asset.txt`,
        );
      });
    });
  });

  it('adds a string parameter "AssetBucketName" for the asset bucket', async (t) => {
    const asset1 = Asset.fromFile("MyAsset1", "./fixtures/hello.txt");
    const asset2 = Asset.fromFile("MyAsset2", "./fixtures/hello.txt");

    const template: Template = { Resources: {} };
    const builder = new ExtendedTemplateBuilder(template);

    asset1.onUse(builder);
    asset2.onUse(builder);

    await builder.runBuildHooks();

    assert.strictEqual(
      template.Parameters?.["AssetBucketName"]?.Type,
      "String",
    );
  });

  it("adds a mapping entry for each asset object", async (t) => {
    const asset1 = Asset.fromFile("MyAsset1", "./fixtures/hello.txt");
    const asset2 = Asset.fromFile("MyAsset2", "./fixtures/hello.txt");

    const template: Template = { Resources: {} };
    const builder = new ExtendedTemplateBuilder(template);

    asset1.onUse(builder);
    asset2.onUse(builder);

    await builder.runBuildHooks();

    assert.deepStrictEqual(template.Mappings?.["AssetManifest"], {
      MyAsset1: {
        FileName: `MyAsset1.${hash}.txt`,
        Integrity: integrity,
      },
      MyAsset2: {
        FileName: `MyAsset2.${hash}.txt`,
        Integrity: integrity,
      },
    });
  });
});
