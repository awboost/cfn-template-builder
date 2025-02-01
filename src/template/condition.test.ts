import assert from "node:assert";
import { describe, it } from "node:test";
import { Fragment } from "../fragment.js";
import { Condition } from "./condition.js";

describe("Condition", () => {
  it("adds a condition to the template", (t) => {
    const definition = Symbol() as any;
    const fragment = new Fragment();

    fragment.add(new Condition("MyCondition", definition));

    assert.deepStrictEqual(fragment.template, {
      Resources: {},
      Conditions: {
        MyCondition: definition,
      },
    });
  });

  it("returns an instance with the correct name", (t) => {
    const definition = Symbol() as any;
    const fragment = new Fragment();

    const instance = fragment.add(new Condition("MyCondition", definition));

    assert.strictEqual(instance.name, "MyCondition");
  });
});
