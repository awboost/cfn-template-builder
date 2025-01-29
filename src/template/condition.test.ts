import assert from "node:assert";
import { describe, it, mock } from "node:test";
import type { TemplateFragment } from "../builder.js";
import { Condition } from "./condition.js";

describe("Condition", () => {
  it("adds a condition to the template", (t) => {
    const definition = Symbol() as any;
    const condition = new Condition("MyCondition", definition);

    const template: TemplateFragment = {
      assets: [],
      template: {},
      use: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    condition.onUse(template);

    assert.deepStrictEqual(template.template, {
      Conditions: {
        MyCondition: definition,
      },
    });
  });

  it("returns an instance with the correct name", (t) => {
    const definition = Symbol() as any;
    const condition = new Condition("MyCondition", definition);

    const template: TemplateFragment = {
      assets: [],
      template: {},
      use: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    const instance = condition.onUse(template);

    assert.strictEqual(instance.name, "MyCondition");
  });
});
