import assert from "node:assert";
import { describe, it } from "node:test";
import { TemplateBuilder, TemplateExtension } from "../builder.js";
import { SingletonExtension } from "./SingletonExtension.js";

describe("SingletonExtension", () => {
  it("runs once per TemplateBuilder instance", (t) => {
    const extension = new SingletonExtension(() => ({
      onUse: () => ({}),
    }));

    const use = t.mock.fn();
    const builder1 = { use } as unknown as TemplateBuilder;
    const builder2 = { use } as unknown as TemplateBuilder;

    extension.onUse(builder1);
    extension.onUse(builder1);
    extension.onUse(builder2);
    extension.onUse(builder2);

    assert.strictEqual(use.mock.calls.length, 2);
  });

  it("returns undefined for an extension without an output", (t) => {
    const extension = new SingletonExtension(() => ({
      onUse: () => undefined,
    }));

    const use = t.mock.fn();
    const builder = { use } as unknown as TemplateBuilder;

    assert.strictEqual(extension.onUse(builder), undefined);
    assert.strictEqual(extension.onUse(builder), undefined);
  });

  it("returns the output from the extension", (t) => {
    const output = Symbol();

    const extension = new SingletonExtension(() => ({
      onUse: () => output,
    }));

    const builder: TemplateBuilder = {
      add: () => {},
      use: (ext: TemplateExtension) => ext.onUse?.(builder),
    };

    assert.strictEqual(extension.onUse(builder), output);
    assert.strictEqual(extension.onUse(builder), output);
  });

  describe("registry() function", () => {
    it("creates an extension which returns a single instance of itself", (t) => {
      const instance = {};
      const factory = t.mock.fn(() => instance);
      const registry = SingletonExtension.registry(factory);

      const builder: TemplateBuilder = {
        add: () => {},
        use: (ext: TemplateExtension) => ext.onUse?.(builder),
      };

      assert.strictEqual(builder.use(registry), instance);
      assert.strictEqual(builder.use(registry), instance);
      assert.strictEqual(factory.mock.calls.length, 1);
    });
  });
});
