import assert from "node:assert";
import { describe, it, mock } from "node:test";
import { setTimeout } from "node:timers/promises";
import type { AssetEmitter, TemplateBuilder } from "./builder.js";
import { Stack } from "./stack.js";
import type { Template } from "./template.js";

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

  describe("use method", () => {
    it("calls onUse on the extension if it exists", (t) => {
      const instance = Symbol();
      const onUse = t.mock.fn((x: any) => instance);
      const stack = new Stack();

      const result = stack.use({ onUse });

      assert.strictEqual(result, instance);
      assert.strictEqual(onUse.mock.calls.length, 1);
      assert.strictEqual(onUse.mock.calls[0]?.arguments[0], stack);
    });

    it("returns undefined if the extension has no onUse method", () => {
      const stack = new Stack();

      const result = stack.use({});

      assert.strictEqual(result, undefined);
    });
  });

  describe("build method", () => {
    it("calls all the hooks in order", async () => {
      const calls: (keyof Stack)[] = [];
      const stack = new Stack();
      const emitter: AssetEmitter = { addAsset: mock.fn() };

      mock.method(stack, "_runBuildHooks", async () => {
        calls.push("_runBuildHooks");
      });
      const emit = mock.method(stack, "_runEmitHooks", async () => {
        calls.push("_runEmitHooks");
      });
      mock.method(stack, "_runTransformHooks", async () => {
        calls.push("_runTransformHooks");
      });
      mock.method(stack, "_waitForUseHooks", async () => {
        calls.push("_waitForUseHooks");
      });

      await stack.build(emitter, { templateFileName: "hello" });

      assert.deepStrictEqual(calls, [
        "_waitForUseHooks",
        "_runBuildHooks",
        "_runTransformHooks",
        "_runEmitHooks",
      ]);

      assert.deepStrictEqual(emit.mock.calls[0]?.arguments[0], emitter);
    });

    it("calls outputs the template with the given file name", async () => {
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
      const addAsset = mock.fn<AssetEmitter["addAsset"]>();
      const emitter: AssetEmitter = { addAsset };

      await stack.build(emitter, { templateFileName: "hello.template.json" });

      assert.strictEqual(addAsset.mock.callCount(), 1);

      const asset = addAsset.mock.calls[0]?.arguments[0];
      assert.ok(asset);

      assert.strictEqual(asset.fileName, "hello.template.json");
      assert.deepStrictEqual(JSON.parse(asset.content as string), template);
    });
  });

  describe("_runBuildHooks method", () => {
    it("calls onBuild for each extension if defined", async (t) => {
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

    it("continue to process extensions added during the build phase", async (t) => {
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

  describe("_runEmitHooks method", () => {
    it("calls onEmit for each extension if defined", async (t) => {
      const onEmit1 = t.mock.fn();
      const onEmit3 = t.mock.fn();
      const stack = new Stack();
      const emitter = { addAsset: () => {} };

      stack.use({ onEmit: onEmit1 });
      stack.use({});
      stack.use({ onEmit: onEmit3 });
      stack.use({});

      await stack._runEmitHooks(emitter);

      assert.strictEqual(onEmit1.mock.calls.length, 1);
      assert.strictEqual(onEmit1.mock.calls[0]?.arguments[0], emitter);

      assert.strictEqual(onEmit3.mock.calls.length, 1);
      assert.strictEqual(onEmit3.mock.calls[0]?.arguments[0], emitter);
    });

    it("waits for all the onEmit results to settle", async (t) => {
      const settled1 = t.mock.fn();
      const settled2 = t.mock.fn();
      const emitter = { addAsset: () => {} };

      const ext1 = {
        onEmit: () => setTimeout(0).then(settled1),
      };
      const ext2 = {
        onEmit: () => setTimeout(0).then(settled2),
      };

      const stack = new Stack();
      stack.use(ext1);
      stack.use(ext2);

      await stack._runEmitHooks(emitter);

      assert.strictEqual(settled1.mock.calls.length, 1);
      assert.strictEqual(settled2.mock.calls.length, 1);
    });

    it("throws if onEmit throws synchronously", async () => {
      const ext1 = {
        onEmit: () => {
          throw new Error("bang!");
        },
      };
      const ext2 = {
        onEmit: () => {},
      };

      const stack = new Stack();
      const emitter = { addAsset: () => {} };

      stack.use(ext1);
      stack.use(ext2);

      await assert.rejects(stack._runEmitHooks(emitter));
    });

    it("throws if onEmit throws asynchronously", async () => {
      const ext1 = {
        onEmit: () => Promise.reject(new Error("bang!")),
      };
      const ext2 = {
        onEmit: () => {},
      };

      const stack = new Stack();
      const emitter = { addAsset: () => {} };

      stack.use(ext1);
      stack.use(ext2);

      await assert.rejects(stack._runEmitHooks(emitter));
    });
  });
});
