import assert from "node:assert";
import { describe, it } from "node:test";
import type { TemplateComponent, TemplateFragment } from "../builder.js";
import { SingletonComponent } from "./singleton.js";

describe("SingletonComponent", () => {
  it("runs once per TemplateFragment instance", (t) => {
    const component = new SingletonComponent(() => ({
      onUse: () => ({}),
    }));

    const use = t.mock.fn();
    const fragment1 = { use } as unknown as TemplateFragment;
    const fragment2 = { use } as unknown as TemplateFragment;

    component.onUse(fragment1);
    component.onUse(fragment1);
    component.onUse(fragment2);
    component.onUse(fragment2);

    assert.strictEqual(use.mock.calls.length, 2);
  });

  it("returns undefined for an component without an output", (t) => {
    const component = new SingletonComponent(() => ({
      onUse: () => {},
    }));

    const use = t.mock.fn();
    const builder = { use } as unknown as TemplateFragment;

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    assert.strictEqual(component.onUse(builder), undefined);
  });

  it("returns the output from the component", () => {
    const output = Symbol();

    const component = new SingletonComponent(() => ({
      onUse: () => output,
    }));

    const fragment: TemplateFragment = {
      assets: [],
      template: {},
      use: (ext: TemplateComponent<any>) => ext.onUse?.(fragment),
    };

    assert.strictEqual(component.onUse(fragment), output);
  });

  describe("registry() function", () => {
    it("creates an component which returns a single instance of itself", (t) => {
      const instance = {};
      const factory = t.mock.fn(() => instance);
      const registry = SingletonComponent.registry(factory);

      const fragment: TemplateFragment = {
        assets: [],
        template: {},
        use: (ext: TemplateComponent<any>) => ext.onUse?.(fragment),
      };

      assert.strictEqual(fragment.use(registry), instance);
      assert.strictEqual(fragment.use(registry), instance);
      assert.strictEqual(factory.mock.calls.length, 1);
    });
  });
});
