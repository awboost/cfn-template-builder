import assert from "node:assert";
import { describe, it } from "node:test";
import type { TemplateBuilder, TemplateComponent } from "../builder.js";
import { SingletonComponent } from "./singleton.js";

describe("SingletonComponent", () => {
  it("runs once per TemplateBuilder instance", (t) => {
    const component = new SingletonComponent(() => ({
      onUse: () => ({}),
    }));

    const use = t.mock.fn();
    const builder1 = { use } as unknown as TemplateBuilder;
    const builder2 = { use } as unknown as TemplateBuilder;

    component.onUse(builder1);
    component.onUse(builder1);
    component.onUse(builder2);
    component.onUse(builder2);

    assert.strictEqual(use.mock.calls.length, 2);
  });

  it("returns undefined for an component without an output", (t) => {
    const component = new SingletonComponent(() => ({
      onUse: () => {},
    }));

    const use = t.mock.fn();
    const builder = { use } as unknown as TemplateBuilder;

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    assert.strictEqual(component.onUse(builder), undefined);
  });

  it("returns the output from the component", () => {
    const output = Symbol();

    const component = new SingletonComponent(() => ({
      onUse: () => output,
    }));

    const builder: TemplateBuilder = {
      add: () => {},
      use: (ext: TemplateComponent<any>) => ext.onUse?.(builder),
    };

    assert.strictEqual(component.onUse(builder), output);
  });

  describe("registry() function", () => {
    it("creates an component which returns a single instance of itself", (t) => {
      const instance = {};
      const factory = t.mock.fn(() => instance);
      const registry = SingletonComponent.registry(factory);

      const builder: TemplateBuilder = {
        add: () => {},
        use: (ext: TemplateComponent<any>) => ext.onUse?.(builder),
      };

      assert.strictEqual(builder.use(registry), instance);
      assert.strictEqual(builder.use(registry), instance);
      assert.strictEqual(factory.mock.calls.length, 1);
    });
  });
});
