import assert from "node:assert";
import { createHash } from "node:crypto";
import { text } from "node:stream/consumers";
import { describe, it, mock } from "node:test";
import { setTimeout } from "node:timers/promises";
import type { TemplateBuilder } from "./builder.js";
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
  describe("add method", () => {
    it("creates a new section if it does not exist", () => {
      const stack = new Stack();
      const def = Symbol();

      stack.add("Metadata", "MyMeta", def);

      assert.deepStrictEqual(stack.template.Metadata, {
        MyMeta: def,
      });
    });

    it("adds to an existing section", () => {
      const def1 = Symbol();
      const def2 = Symbol();

      const template: Template = {
        Resources: {},
        Metadata: {
          MyMeta1: def1,
        },
      };
      const stack = new Stack(template);

      stack.add("Metadata", "MyMeta2", def2);

      assert.deepStrictEqual(template.Metadata, {
        MyMeta1: def1,
        MyMeta2: def2,
      });
    });

    it("throws an error for a duplicate name", () => {
      const def1 = Symbol();
      const def2 = Symbol();

      const template: Template = {
        Resources: {},
        Metadata: {
          MyMeta1: def1,
        },
      };
      const stack = new Stack(template);

      assert.throws(() => {
        stack.add("Metadata", "MyMeta1", def2);
      });

      assert.deepStrictEqual(template.Metadata, {
        MyMeta1: def1,
      });
    });
  });

  describe("#use()", () => {
    it("calls onUse on the component if it exists", (t) => {
      const instance = Symbol();
      const onUse = t.mock.fn((x: any) => instance);
      const stack = new Stack();

      const result = stack.use({ onUse });

      assert.strictEqual(result, instance);
      assert.strictEqual(onUse.mock.calls.length, 1);
      assert.strictEqual(onUse.mock.calls[0]?.arguments[0], stack);
    });

    it("returns undefined if the component has no onUse method", () => {
      const stack = new Stack();

      const result = stack.use({});

      assert.strictEqual(result, undefined);
    });
  });

  describe("#build()", () => {
    it("calls all the hooks in order", async () => {
      const calls: (keyof Stack)[] = [];
      const stack = new Stack();

      mock.method(stack, "_runBuildHooks", async () => {
        calls.push("_runBuildHooks");
      });
      mock.method(stack, "_waitForUseHooks", async () => {
        calls.push("_waitForUseHooks");
      });

      await stack.build();

      assert.deepStrictEqual(calls, ["_waitForUseHooks", "_runBuildHooks"]);
    });

    it("throws if called multiple times", async () => {
      const calls: (keyof Stack)[] = [];
      const stack = new Stack();

      mock.method(stack, "_runBuildHooks", async () => {
        calls.push("_runBuildHooks");
      });
      mock.method(stack, "_waitForUseHooks", async () => {
        calls.push("_waitForUseHooks");
      });

      await stack.build();

      await assert.rejects(
        () => stack.build(),
        (error) => error instanceof BuildAlreadyCalledError,
      );

      // make sure we only called the hooks once
      assert.deepStrictEqual(calls, ["_waitForUseHooks", "_runBuildHooks"]);
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
      await stack.build();

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
      await stack.build();

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
      stack.use(Asset.fromFile("MyAsset", "./fixtures/hello.txt"));
      await stack.build();

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
      stack.use(Asset.fromFile("MyAsset", "./fixtures/hello.txt"));
      await stack.build();

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

  describe("_runBuildHooks method", () => {
    it("calls onBuild for each component if defined", async (t) => {
      const onBuild1 = t.mock.fn();
      const onBuild3 = t.mock.fn();
      const stack = new Stack();

      stack.use({ onBuild: onBuild1 });
      stack.use({});
      stack.use({ onBuild: onBuild3 });
      stack.use({});

      await stack._runBuildHooks();

      assert.strictEqual(onBuild1.mock.calls.length, 1);
      assert.strictEqual(onBuild1.mock.calls[0]?.arguments[0], stack);

      assert.strictEqual(onBuild3.mock.calls.length, 1);
      assert.strictEqual(onBuild3.mock.calls[0]?.arguments[0], stack);
    });

    it("continue to process components added during the build phase", async (t) => {
      const ext1 = { onBuild: t.mock.fn() };
      const ext2 = {
        onBuild: t.mock.fn((b: TemplateBuilder) => {
          b.use(ext1);
        }),
      };
      const ext3 = {
        onBuild: t.mock.fn((b: TemplateBuilder) =>
          setTimeout(0).then(() => {
            b.use(ext2);
          }),
        ),
      };
      const ext4 = {
        onBuild: t.mock.fn((b: TemplateBuilder) => {
          b.use(ext3);
        }),
      };

      const stack = new Stack();
      stack.use(ext4);

      await stack._runBuildHooks();

      assert.strictEqual(ext1.onBuild.mock.calls.length, 1);
      assert.strictEqual(ext1.onBuild.mock.calls[0]?.arguments[0], stack);

      assert.strictEqual(ext2.onBuild.mock.calls.length, 1);
      assert.strictEqual(ext2.onBuild.mock.calls[0]?.arguments[0], stack);

      assert.strictEqual(ext3.onBuild.mock.calls.length, 1);
      assert.strictEqual(ext3.onBuild.mock.calls[0]?.arguments[0], stack);

      assert.strictEqual(ext4.onBuild.mock.calls.length, 1);
      assert.strictEqual(ext4.onBuild.mock.calls[0]?.arguments[0], stack);
    });

    it("waits for all the onBuild results to settle", async (t) => {
      const settled1 = t.mock.fn();
      const settled2 = t.mock.fn();

      const ext1 = {
        onBuild: () => setTimeout(0).then(settled1),
      };
      const ext2 = {
        onBuild: () => setTimeout(0).then(settled2),
      };

      const stack = new Stack();
      stack.use(ext1);
      stack.use(ext2);

      await stack._runBuildHooks();

      assert.strictEqual(settled1.mock.calls.length, 1);
      assert.strictEqual(settled2.mock.calls.length, 1);
    });

    it("throws if onBuild throws synchronously", async () => {
      const ext1 = {
        onBuild: () => {
          throw new Error("bang!");
        },
      };
      const ext2 = {
        onBuild: () => {},
      };

      const stack = new Stack();
      stack.use(ext1);
      stack.use(ext2);

      await assert.rejects(stack._runBuildHooks());
    });

    it("throws if onBuild throws asynchronously", async () => {
      const ext1 = {
        onBuild: () => Promise.reject(new Error("bang!")),
      };
      const ext2 = {
        onBuild: () => {},
      };

      const stack = new Stack();
      stack.use(ext1);
      stack.use(ext2);

      await assert.rejects(stack._runBuildHooks());
    });
  });
});
