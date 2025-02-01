import assert from "node:assert";
import { describe, it } from "node:test";
import { Fragment } from "../fragment.js";
import { Rule } from "./rule.js";

describe("Rule", () => {
  it("adds a rule to the template", (t) => {
    const fragment = new Fragment();
    const definition = Symbol();

    fragment.add(new Rule("MyRule", definition as any));

    assert.deepStrictEqual(fragment.template, {
      Resources: {},
      Rules: {
        MyRule: definition as any,
      },
    });
  });
});
