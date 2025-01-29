import assert from "node:assert";
import { createHash } from "node:crypto";
import { text } from "node:stream/consumers";
import { describe, it, mock } from "node:test";
import type { TemplateComponent, TemplateFragment } from "./builder.js";
import { BuildAlreadyCalledError, CallBuildFirstError } from "./errors.js";
import { Stack } from "./stack.js";
import type { Template } from "./template.js";
import type { AssetContent } from "./template/asset-content.js";
import { Asset } from "./template/asset.js";

const sha512Hash = "db3974a97f2407b7cae1ae637c003068";
const sha1Hash = "22596363b3de40b06f981fb85d82312e";

const sha512Integrity =
  "sha512-2zl0qX8kB7fK4a5jfAAwaHoRkTJ01XhJJVjjnBbAF96E6s3Ixi/jTuThK0sUKIF/Cbaidgw/imZM6ulNJDSlkw==";

const sha1Integrity = "sha1-IlljY7PeQLBvmB+4XYIxLowO1RE=";

describe("Stack", () => {
  describe("#add()", () => {
    it("calls addToTemplate on the component", (t) => {
      const instance = Symbol();
      const addToTemplate = t.mock.fn((x: any) => instance);
      const stack = new Stack();

      const result = stack.add({ addToTemplate });

      assert.strictEqual(result, instance);
      assert.strictEqual(addToTemplate.mock.calls.length, 1);
      assert.strictEqual(addToTemplate.mock.calls[0]?.arguments[0], stack);
    });
  });

  describe("#build()", () => {
    it("throws if called multiple times", async () => {
      const stack = new Stack();

      stack.build();

      assert.throws(
        () => {
          stack.build();
        },
        (error) => error instanceof BuildAlreadyCalledError,
      );
    });

    it("calls build for each component if defined", async (t) => {
      const onBuild1 = t.mock.fn();
      const onBuild3 = t.mock.fn();
      const addToTemplate = mock.fn();
      const stack = new Stack();

      stack.components.push({ addToTemplate, build: onBuild1 });
      stack.components.push({ addToTemplate });
      stack.components.push({ addToTemplate, build: onBuild3 });
      stack.components.push({ addToTemplate });

      stack.build();

      assert.strictEqual(onBuild1.mock.calls.length, 1);
      assert.strictEqual(onBuild1.mock.calls[0]?.arguments[0], stack);

      assert.strictEqual(onBuild3.mock.calls.length, 1);
      assert.strictEqual(onBuild3.mock.calls[0]?.arguments[0], stack);
    });

    it("continue to process components added during the build phase", (t) => {
      const addToTemplate = mock.fn(function (
        this: TemplateComponent,
        fragment: TemplateFragment,
      ) {
        fragment.components.push(this);
      });

      const ext1 = { addToTemplate, build: t.mock.fn() };
      const ext2 = {
        addToTemplate,
        build: t.mock.fn((b: TemplateFragment) => {
          b.add(ext1);
        }),
      };
      const ext3 = {
        addToTemplate,
        build: t.mock.fn((b: TemplateFragment) => {
          b.add(ext2);
        }),
      };
      const ext4 = {
        addToTemplate,
        build: t.mock.fn((b: TemplateFragment) => {
          b.add(ext3);
        }),
      };

      const stack = new Stack();
      stack.add(ext4);

      stack.build();

      assert.strictEqual(ext1.build.mock.calls.length, 1);
      assert.strictEqual(ext1.build.mock.calls[0]?.arguments[0], stack);

      assert.strictEqual(ext2.build.mock.calls.length, 1);
      assert.strictEqual(ext2.build.mock.calls[0]?.arguments[0], stack);

      assert.strictEqual(ext3.build.mock.calls.length, 1);
      assert.strictEqual(ext3.build.mock.calls[0]?.arguments[0], stack);

      assert.strictEqual(ext4.build.mock.calls.length, 1);
      assert.strictEqual(ext4.build.mock.calls[0]?.arguments[0], stack);
    });

    it("throws if build throws", () => {
      const addToTemplate = mock.fn(function (
        this: TemplateComponent,
        fragment: TemplateFragment,
      ) {
        fragment.components.push(this);
      });

      const ext1 = {
        addToTemplate,
        build: () => {
          throw new Error("bang!");
        },
      };
      const ext2 = {
        addToTemplate,
        build: () => {},
      };

      const stack = new Stack();
      stack.add(ext1);
      stack.add(ext2);

      assert.throws(() => {
        stack.build();
      });
    });
  });

  describe("#emit()", () => {
    it("throws if build not called first", async () => {
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

      const stack = new Stack(template);

      await assert.rejects(
        async () => await stack.emit().next(),
        (error) => error instanceof CallBuildFirstError,
      );
    });

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

      const stack = new Stack(template);
      stack.build();

      const emit = stack.emit({
        templateFileName: "hello.template.json",
      });

      const assets: AssetContent[] = [];
      for await (const asset of emit) {
        assets.push(asset);
      }

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

      const stack = new Stack(template);
      stack.build();

      const emit = stack.emit({
        addHashToTemplateFileName: true,
        templateFileName: "hello.template.json",
      });

      const assets: AssetContent[] = [];
      for await (const asset of emit) {
        assets.push(asset);
      }

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
      const template: Template = {
        Resources: {},
      };

      const stack = new Stack(template);
      stack.add(Asset.fromFile("MyAsset", "./fixtures/hello.txt"));
      stack.build();

      const emit = stack.emit();

      const assets: AssetContent[] = [];
      for await (const asset of emit) {
        assets.push(asset);
      }

      assert.strictEqual(assets.length, 1);
      assert.strictEqual(assets[0]!.fileName, `MyAsset.${sha512Hash}.txt`);
      assert.strictEqual(assets[0]!.integrity, sha512Integrity);

      assert.deepStrictEqual(await text(assets[0]!.content), "hello world\n");
    });

    it("outputs the assets with the provided hash algorithm", async () => {
      const template: Template = {
        Resources: {},
      };

      const stack = new Stack(template);
      stack.add(Asset.fromFile("MyAsset", "./fixtures/hello.txt"));
      stack.build();

      const emit = stack.emit({ hashAlgorithm: "sha1" });

      const assets: AssetContent[] = [];
      for await (const asset of emit) {
        assets.push(asset);
      }

      assert.strictEqual(assets.length, 1);
      assert.strictEqual(assets[0]!.fileName, `MyAsset.${sha1Hash}.txt`);
      assert.strictEqual(assets[0]!.integrity, sha1Integrity);

      assert.deepStrictEqual(await text(assets[0]!.content), "hello world\n");
    });
  });
});
