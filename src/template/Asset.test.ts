import assert from "node:assert";
import { describe, it } from "node:test";
import { Template } from "../template.js";
import { ExtendedTemplateBuilder } from "../util/ExtendedTemplateBuilder.js";
import { Asset } from "./Asset.js";

describe("Asset", () => {
  describe("fromFile", () => {
    it("creates an asset with the provided name", () => {
      const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt");
      assert.strictEqual(asset.name, "MyAsset");
    });

    it("creates an asset with the expected filename", async (t) => {
      const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt");
      const addAsset = t.mock.fn();
      await asset.onEmit({ addAsset });

      assert.strictEqual(addAsset.mock.calls.length, 1);

      assert.strictEqual(
        addAsset.mock.calls[0]?.arguments[0]?.fileName,
        "MyAsset.22596363b3de40b06f981fb85d82312e8c0ed511.txt",
      );
    });

    it("creates an asset with the expected content", async (t) => {
      const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt");
      const addAsset = t.mock.fn();
      await asset.onEmit({ addAsset });

      assert.strictEqual(addAsset.mock.calls.length, 1);

      const getContent = addAsset.mock.calls[0]?.arguments[0]?.createReadStream;
      const content: Buffer[] = [];
      for await (const chunk of getContent()) {
        content.push(chunk);
      }

      assert.strictEqual(Buffer.concat(content).toString(), "hello world\n");
    });

    describe("if noHash is true", () => {
      it("creates an asset without adding a hash to the filename", async (t) => {
        const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt", {
          noHash: true,
        });
        const addAsset = t.mock.fn();
        await asset.onEmit({ addAsset });

        assert.strictEqual(addAsset.mock.calls.length, 1);

        assert.strictEqual(
          addAsset.mock.calls[0]?.arguments[0]?.fileName,
          "MyAsset.txt",
        );
      });
    });

    describe("if fileExt is set", () => {
      it("creates an asset with the extension provided", async (t) => {
        const asset = Asset.fromFile("MyAsset", "./fixtures/hello.txt", {
          fileExt: ".asset.txt",
        });
        const addAsset = t.mock.fn();
        await asset.onEmit({ addAsset });

        assert.strictEqual(addAsset.mock.calls.length, 1);

        assert.strictEqual(
          addAsset.mock.calls[0]?.arguments[0]?.fileName,
          "MyAsset.22596363b3de40b06f981fb85d82312e8c0ed511.asset.txt",
        );
      });
    });
  });

  it('adds a string parameter "AssetBucketName" for the asset bucket', async (t) => {
    const asset1 = Asset.fromFile("MyAsset1", "./fixtures/hello.txt");
    const asset2 = Asset.fromFile("MyAsset2", "./fixtures/hello.txt");

    const template: Template = { Resources: {} };
    const builder = ExtendedTemplateBuilder.forTemplate(template);

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
    const builder = ExtendedTemplateBuilder.forTemplate(template);

    asset1.onUse(builder);
    asset2.onUse(builder);

    await builder.runBuildHooks();

    assert.deepStrictEqual(template.Mappings?.["AssetManifest"], {
      MyAsset1: {
        FileName: "MyAsset1.22596363b3de40b06f981fb85d82312e8c0ed511.txt",
      },
      MyAsset2: {
        FileName: "MyAsset2.22596363b3de40b06f981fb85d82312e8c0ed511.txt",
      },
    });
  });
});
