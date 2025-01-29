import assert from "node:assert";
import { describe, it, mock } from "node:test";
import type { TemplateBuilder } from "../builder.js";
import { Rule } from "./rule.js";

describe("Rule", () => {
  it("adds a rule to the template", (t) => {
    const definition = Symbol();
    const rule = new Rule("MyRule", definition as any);

    const template: TemplateBuilder = {
      template: {},
      use: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    rule.onUse(template);

    assert.deepStrictEqual(template.template, {
      Rules: {
        MyRule: definition as any,
      },
    });
  });
});
