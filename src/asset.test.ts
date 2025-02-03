import assert from "node:assert";
import { describe, it } from "node:test";
import { Asset } from "./asset.js";
import { Fixtures } from "./test/fixtures/fixtures.js";

describe("Asset", () => {
  describe("fromFile", () => {
    it("creates an asset with the expected content", async (t) => {
      const asset = Asset.fromFile("MyAsset", Fixtures.hello.path);

      const data = await asset.getData("utf-8");

      assert.strictEqual(asset.name, "MyAsset");
      assert.strictEqual(asset.fileName, Fixtures.hello.fileName);
      assert.strictEqual(data, await Fixtures.hello.text());
    });
  });
});
