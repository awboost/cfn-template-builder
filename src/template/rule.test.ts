import assert from "node:assert";
import { describe, it } from "node:test";
import { Stack } from "../stack.js";
import { Rule } from "./rule.js";

describe("Rule", () => {
  it("adds a rule to the template", (t) => {
    const stack = new Stack();
    const definition = Symbol();

    stack.add(new Rule("MyRule", definition as any));

    assert.deepStrictEqual(stack.template, {
      Resources: {},
      Rules: {
        MyRule: definition as any,
      },
    });
  });
});
