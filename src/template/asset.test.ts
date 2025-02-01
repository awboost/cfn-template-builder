import assert from "node:assert";
import { Readable } from "node:stream";
import { text } from "node:stream/consumers";
import { describe, it } from "node:test";
import { Fragment } from "../fragment.js";
import type { Template } from "../template.js";
import { Fixtures } from "../test/fixtures/fixtures.js";
import { Asset } from "./asset.js";

describe("Asset", () => {
  describe("fromFile", () => {
    it("creates an asset with the provided name", () => {
      const asset = Asset.fromFile("MyAsset", Fixtures.hello.path);
      assert.strictEqual(asset.name, "MyAsset");
    });

    it("creates an asset with the expected filename", async (t) => {
      const asset = Asset.fromFile("MyAsset", Fixtures.hello.path);
      const output = await asset.generate();

      assert.strictEqual(output.fileName, `MyAsset${Fixtures.hello.ext}`);
    });

    it("creates an asset with the expected content", async (t) => {
      const asset = Asset.fromFile("MyAsset", Fixtures.hello.path);
      const output = await asset.generate();

      const content = output.content;
      const data = await text(Readable.from(content));

      assert.strictEqual(data, await Fixtures.hello.text());
    });

    describe("if fileExt is set", () => {
      it("creates an asset with the component provided", async (t) => {
        const asset = Asset.fromFile("MyAsset", Fixtures.hello.path, {
          fileExt: ".asset.txt",
        });

        const output = await asset.generate();

        assert.strictEqual(output.fileName, `MyAsset.asset.txt`);
      });
    });
  });

  it("throws if there are two assets with the same name", async () => {
    const asset1 = Asset.fromFile("MyAsset", Fixtures.hello.path);
    const asset2 = Asset.fromFile("MyAsset", Fixtures.hello.path);

    const template: Template = { Resources: {} };
    const fragment = new Fragment(template);

    asset1.addToTemplate(fragment);

    assert.throws(
      () => asset2.addToTemplate(fragment),
      (err: any) => {
        err.message.startsWith("duplicate asset");
        return true;
      },
    );
  });
});
