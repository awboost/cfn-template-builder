import assert from "node:assert";
import { describe, it } from "node:test";
import { setTimeout } from "node:timers/promises";
import type { TemplateBuilder } from "../builder.js";
import type { Template } from "../template.js";
import { ExtendedTemplateBuilder, RawTemplateBuilder } from "./builder.js";

describe("RawTemplateBuilder", () => {
  describe("add()", () => {
    it("creates a new section if it does not exist", () => {
      const template: Template = { Resources: {} };
      const builder = new RawTemplateBuilder(template);
      const def = Symbol();

      builder.add("Metadata", "MyMeta", def);

      assert.deepStrictEqual(template.Metadata, {
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
      const builder = new RawTemplateBuilder(template);

      builder.add("Metadata", "MyMeta2", def2);

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
      const builder = new RawTemplateBuilder(template);

      assert.throws(() => builder.add("Metadata", "MyMeta1", def2));

      assert.deepStrictEqual(template.Metadata, {
        MyMeta1: def1,
      });
    });
  });
});

describe("ExtendedTemplateBuilder", () => {
  describe("add() function", () => {
    it("calls the base builder add() function", (t) => {
      const add = t.mock.fn();
      const builder = new ExtendedTemplateBuilder(undefined, { add });
      const def = Symbol();

      builder.add("Metadata", "Meta1", def);

      assert.strictEqual(add.mock.calls.length, 1);
      assert.strictEqual(add.mock.calls[0]?.arguments[0], "Metadata");
      assert.strictEqual(add.mock.calls[0]?.arguments[1], "Meta1");
      assert.strictEqual(add.mock.calls[0]?.arguments[2], def);
    });
  });

  describe("use() function", () => {
    it("calls onUse on the extension if it exists", (t) => {
      const instance = Symbol();
      const onUse = t.mock.fn((x) => instance);
      const builder = new ExtendedTemplateBuilder();

      const result = builder.use({ onUse });

      assert.strictEqual(result, instance);
      assert.strictEqual(onUse.mock.calls.length, 1);
      assert.strictEqual(onUse.mock.calls[0]?.arguments[0], builder);
    });

    it("returns undefined if the extension has no onUse method", (t) => {
      const builder = new ExtendedTemplateBuilder();

      const result = builder.use({});

      assert.strictEqual(result, undefined);
    });
  });

  describe("waitForUseHooks() function", () => {
    it("waits for all the onUse results to settle", async (t) => {
      const settled1 = t.mock.fn();
      const settled2 = t.mock.fn();

      const ext1 = {
        onUse: () => setTimeout(0).then(settled1),
      };
      const ext2 = {
        onUse: () => setTimeout(0).then(settled2),
      };

      const builder = new ExtendedTemplateBuilder();
      builder.use(ext1);
      builder.use(ext2);

      await builder.waitForUseHooks();
      assert.strictEqual(settled1.mock.calls.length, 1);
      assert.strictEqual(settled2.mock.calls.length, 1);
    });

    it("throws if an onUse throws asynchronously", async (t) => {
      const ext1 = {
        onUse: () => {},
      };
      const ext2 = {
        onUse: () => Promise.reject(new Error("bang!")),
      };

      const builder = new ExtendedTemplateBuilder();
      builder.use(ext1);
      builder.use(ext2);

      await assert.rejects(() => builder.waitForUseHooks());
    });
  });

  describe("runBuildHooks() function", () => {
    it("calls onBuild for each extension if defined", async (t) => {
      const onBuild1 = t.mock.fn();
      const onBuild3 = t.mock.fn();
      const builder = new ExtendedTemplateBuilder();

      builder.use({ onBuild: onBuild1 });
      builder.use({});
      builder.use({ onBuild: onBuild3 });
      builder.use({});

      await builder.runBuildHooks();

      assert.strictEqual(onBuild1.mock.calls.length, 1);
      assert.strictEqual(onBuild1.mock.calls[0]?.arguments[0], builder);

      assert.strictEqual(onBuild3.mock.calls.length, 1);
      assert.strictEqual(onBuild3.mock.calls[0]?.arguments[0], builder);
    });

    it("continue to process extensions added during the build phase", async (t) => {
      const ext1 = { onBuild: t.mock.fn() };
      const ext2 = { onBuild: t.mock.fn((b: TemplateBuilder) => b.use(ext1)) };
      const ext3 = {
        onBuild: t.mock.fn((b: TemplateBuilder) =>
          setTimeout(0).then((): void => b.use(ext2)),
        ),
      };
      const ext4 = { onBuild: t.mock.fn((b: TemplateBuilder) => b.use(ext3)) };

      const builder = new ExtendedTemplateBuilder();
      builder.use(ext4);

      await builder.runBuildHooks();

      assert.strictEqual(ext1.onBuild.mock.calls.length, 1);
      assert.strictEqual(ext1.onBuild.mock.calls[0]?.arguments[0], builder);

      assert.strictEqual(ext2.onBuild.mock.calls.length, 1);
      assert.strictEqual(ext2.onBuild.mock.calls[0]?.arguments[0], builder);

      assert.strictEqual(ext3.onBuild.mock.calls.length, 1);
      assert.strictEqual(ext3.onBuild.mock.calls[0]?.arguments[0], builder);

      assert.strictEqual(ext4.onBuild.mock.calls.length, 1);
      assert.strictEqual(ext4.onBuild.mock.calls[0]?.arguments[0], builder);
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

      const builder = new ExtendedTemplateBuilder();
      builder.use(ext1);
      builder.use(ext2);

      await builder.runBuildHooks();

      assert.strictEqual(settled1.mock.calls.length, 1);
      assert.strictEqual(settled2.mock.calls.length, 1);
    });

    it("throws if onBuild throws synchronously", async (t) => {
      const ext1 = {
        onBuild: () => {
          throw new Error("bang!");
        },
      };
      const ext2 = {
        onBuild: () => {},
      };

      const builder = new ExtendedTemplateBuilder();
      builder.use(ext1);
      builder.use(ext2);

      await assert.rejects(builder.runBuildHooks());
    });

    it("throws if onBuild throws asynchronously", async (t) => {
      const ext1 = {
        onBuild: () => Promise.reject(new Error("bang!")),
      };
      const ext2 = {
        onBuild: () => {},
      };

      const builder = new ExtendedTemplateBuilder();
      builder.use(ext1);
      builder.use(ext2);

      await assert.rejects(builder.runBuildHooks());
    });
  });

  describe("runEmitHooks() function", () => {
    it("calls onEmit for each extension if defined", async (t) => {
      const onEmit1 = t.mock.fn();
      const onEmit3 = t.mock.fn();
      const builder = new ExtendedTemplateBuilder();
      const emitter = { addAsset: () => {} };

      builder.use({ onEmit: onEmit1 });
      builder.use({});
      builder.use({ onEmit: onEmit3 });
      builder.use({});

      await builder.runEmitHooks(emitter);

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

      const builder = new ExtendedTemplateBuilder();
      builder.use(ext1);
      builder.use(ext2);

      await builder.runEmitHooks(emitter);

      assert.strictEqual(settled1.mock.calls.length, 1);
      assert.strictEqual(settled2.mock.calls.length, 1);
    });

    it("throws if onEmit throws synchronously", async (t) => {
      const ext1 = {
        onEmit: () => {
          throw new Error("bang!");
        },
      };
      const ext2 = {
        onEmit: () => {},
      };

      const builder = new ExtendedTemplateBuilder();
      const emitter = { addAsset: () => {} };

      builder.use(ext1);
      builder.use(ext2);

      await assert.rejects(builder.runEmitHooks(emitter));
    });

    it("throws if onEmit throws asynchronously", async (t) => {
      const ext1 = {
        onEmit: () => Promise.reject(new Error("bang!")),
      };
      const ext2 = {
        onEmit: () => {},
      };

      const builder = new ExtendedTemplateBuilder();
      const emitter = { addAsset: () => {} };

      builder.use(ext1);
      builder.use(ext2);

      await assert.rejects(builder.runEmitHooks(emitter));
    });
  });
});
