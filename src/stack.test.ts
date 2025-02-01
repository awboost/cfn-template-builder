import assert from "node:assert";
import { createHash } from "node:crypto";
import { Readable } from "node:stream";
import { text } from "node:stream/consumers";
import { describe, it, mock } from "node:test";
import { Asset } from "./asset.js";
import { Stack } from "./stack.js";
import type { Template } from "./template.js";
import { Fixtures } from "./test/fixtures/fixtures.js";
import { hash, resolveAll } from "./test/util.js";

describe("module stack", () => {
  describe("Stack", () => {
    describe("#add()", () => {
      it("calls build on a component", (t) => {
        const instance = Symbol();
        const build = t.mock.fn((x: any) => instance);
        const stack = new Stack();

        const result = stack.add({ build });

        assert.strictEqual(result, instance);
        assert.strictEqual(build.mock.calls.length, 1);
        assert.strictEqual(build.mock.calls[0]?.arguments[0], stack);
      });

      it("combines a fragment", (t) => {
        const asset1 = new Asset("asset1", {
          content: "hello",
          fileName: "one.txt",
        });
        const asset2 = new Asset("asset2", {
          content: "hello",
          fileName: "two.txt",
        });

        const stack = new Stack({
          assets: [asset1],
          template: {
            Parameters: {
              Blah: {
                Type: "String",
              },
            },
            Resources: {
              One: {
                Type: "AWS::Lambda::Function",
                Properties: {
                  Blah: { Ref: "Blah" },
                },
              },
            },
          },
        });

        stack.add({
          assets: [asset2],
          template: {
            Resources: {
              Two: {
                Type: "AWS::Lambda::Function",
                Properties: {
                  Blah: "Blah",
                },
              },
            },
            Metadata: {
              Answer: 42,
            },
          },
        });

        assert.strictEqual(stack.assets.length, 2);
        assert.strictEqual(stack.assets[0], asset1);
        assert.strictEqual(stack.assets[1], asset2);

        assert.deepStrictEqual(stack.template, {
          Parameters: {
            Blah: {
              Type: "String",
            },
          },
          Resources: {
            One: {
              Type: "AWS::Lambda::Function",
              Properties: {
                Blah: { Ref: "Blah" },
              },
            },
            Two: {
              Type: "AWS::Lambda::Function",
              Properties: {
                Blah: "Blah",
              },
            },
          },
          Metadata: {
            Answer: 42,
          },
        });
      });
    });

    describe("#emit()", () => {
      it("outputs the template with the given file name", async () => {
        const template: Template = {
          Resources: {
            MyResource: {
              Type: "Custom::Something",
              Properties: {
                Foo: "Bar",
              },
            },
          },
        };

        const stack = new Stack({ template });

        const assets = await stack.emitArray({
          templateFileName: "hello.template.json",
        });

        assert.strictEqual(assets.length, 1);
        assert.strictEqual(assets[0]!.fileName, "hello.template.json");

        assert.deepStrictEqual(
          JSON.parse(await text(assets[0]!.content)),
          template,
        );
      });

      it("includes a hash in template file name if requested", async () => {
        const template: Template = {
          Resources: {
            MyResource: {
              Type: "Custom::Something",
              Properties: {
                Foo: "Bar",
              },
            },
          },
        };

        const stack = new Stack({ template });

        const assets = await stack.emitArray({
          addHashToTemplateFileName: true,
          templateFileName: "hello.template.json",
        });

        assert.strictEqual(assets.length, 1);

        const templateContent = await text(assets[0]!.content);
        const hash = createHash("sha512").update(templateContent).digest("hex");

        assert.strictEqual(
          assets[0]!.fileName,
          `hello.template.${hash.slice(0, 32)}.json`,
        );

        assert.deepStrictEqual(JSON.parse(templateContent), template);
      });

      it("outputs the expected assets", async () => {
        const stack = new Stack();

        const generate1 = mock.fn(() => ({
          content: Readable.from("content1"),
          fileName: "one.txt",
        }));
        const generate2 = mock.fn(() => ({
          content: Readable.from("content2"),
          fileName: "two.txt",
        }));

        stack.assets.push({
          name: "Asset1",
          resolveLocation: mock.fn(() => {}),
          generate: generate1,
        });

        stack.assets.push({
          name: "Asset2",
          resolveLocation: mock.fn(() => {}),
          generate: generate2,
        });

        const assets = await stack.emitArray();

        assert.strictEqual(assets.length, 2);

        const asset1 = assets[0]!;
        const asset1content = await text(asset1.content);
        const hash1 = hash("content1", "sha512", "hex", 32);
        const integrity1 = hash("content1", "sha512", "base64");

        assert.strictEqual(generate1.mock.callCount(), 1);
        assert.strictEqual(asset1content, "content1");
        assert.strictEqual(asset1.fileName, `one.${hash1}.txt`);
        assert.strictEqual(asset1.integrity, `sha512-${integrity1}`);

        const asset2 = assets[1]!;
        const asset2content = await text(asset2.content);
        const hash2 = hash("content2", "sha512", "hex", 32);
        const integrity2 = hash("content2", "sha512", "base64");

        assert.strictEqual(generate2.mock.callCount(), 1);
        assert.strictEqual(asset2content, "content2");
        assert.strictEqual(asset2.fileName, `two.${hash2}.txt`);
        assert.strictEqual(asset2.integrity, `sha512-${integrity2}`);
      });

      it("outputs the mapping and bucket parameter", async () => {
        const stack = new Stack();
        const resolveLocation1 = mock.fn((bucket: string, key: string) => {});
        const resolveLocation2 = mock.fn((bucket: string, key: string) => {});

        const hash1 = hash("content1", "sha512", "hex", 32);
        const integrity1 = hash("content1", "sha512", "base64");
        const hash2 = hash("content2", "sha512", "hex", 32);
        const integrity2 = hash("content2", "sha512", "base64");

        stack.assets.push({
          name: "Asset1",
          resolveLocation: resolveLocation1,
          generate: mock.fn(() => ({
            content: Readable.from("content1"),
            fileName: "one.txt",
          })),
        });

        stack.assets.push({
          name: "Asset2",
          resolveLocation: resolveLocation2,
          generate: mock.fn(() => ({
            content: Readable.from("content2"),
            fileName: "two.txt",
          })),
        });

        const assets = await stack.emitArray();

        assert.strictEqual(assets.length, 2);
        assert.strictEqual(resolveLocation1.mock.callCount(), 1);

        assert.deepStrictEqual(
          resolveAll(resolveLocation1.mock.calls[0]!.arguments),
          [
            { Ref: "AssetBucketName" },
            { "Fn::FindInMap": ["AssetManifest", "Asset1", "FileName"] },
          ],
        );

        assert.strictEqual(resolveLocation2.mock.callCount(), 1);

        assert.deepStrictEqual(resolveLocation2.mock.calls[0]!.arguments, [
          { Ref: "AssetBucketName" },
          { "Fn::FindInMap": ["AssetManifest", "Asset2", "FileName"] },
        ]);

        assert.deepStrictEqual(stack.template, {
          Resources: {},
          Parameters: {
            AssetBucketName: {
              Description: "S3 bucket name for the location of the assets",
              Type: "String",
            },
          },
          Mappings: {
            AssetManifest: {
              Asset1: {
                FileName: `one.${hash1}.txt`,
                Integrity: `sha512-${integrity1}`,
              },
              Asset2: {
                FileName: `two.${hash2}.txt`,
                Integrity: `sha512-${integrity2}`,
              },
            },
          },
        });
      });

      it("outputs the assets with the provided hash algorithm", async () => {
        const template: Template = {
          Resources: {},
        };

        const stack = new Stack({ template });
        stack.add(Asset.fromFile("MyAsset", Fixtures.hello.path));

        const assets = await stack.emitArray({
          hashAlgorithm: "sha1",
          hashLength: 10,
        });

        assert.strictEqual(assets.length, 1);
        const hash = await Fixtures.hello.hash("sha1", "hex", 10);

        assert.strictEqual(assets[0]!.fileName, `MyAsset.${hash}.txt`);
        assert.strictEqual(
          assets[0]!.integrity,
          await Fixtures.hello.integrity("sha1"),
        );

        assert.deepStrictEqual(
          await text(assets[0]!.content),
          await Fixtures.hello.text(),
        );
      });
    });
  });
});
