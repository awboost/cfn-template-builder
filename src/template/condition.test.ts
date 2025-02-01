import assert from "node:assert";
import { describe, it } from "node:test";
import { Stack } from "../stack.js";
import { Condition } from "./condition.js";

describe("Condition", () => {
  it("adds a condition to the template", (t) => {
    const definition = Symbol() as any;
    const stack = new Stack();

    stack.add(new Condition("MyCondition", definition));

    assert.deepStrictEqual(stack.template, {
      Resources: {},
      Conditions: {
        MyCondition: definition,
      },
    });
  });

  it("returns an instance with the correct name", (t) => {
    const definition = Symbol() as any;
    const stack = new Stack();

    const instance = stack.add(new Condition("MyCondition", definition));

    assert.strictEqual(instance.name, "MyCondition");
  });
});
