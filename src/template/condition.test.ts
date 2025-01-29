import assert from "node:assert";
import { describe, it } from "node:test";
import { Condition } from "./condition.js";

describe("Condition", () => {
  it("adds a condition to the template", (t) => {
    const definition = Symbol() as any;
    const condition = new Condition("MyCondition", definition);
    const add = t.mock.fn();

    condition.onUse({ add } as any);

    assert.strictEqual(add.mock.calls.length, 1);
    assert.strictEqual(add.mock.calls[0]?.arguments[0], "Conditions");
    assert.strictEqual(add.mock.calls[0]?.arguments[1], "MyCondition");
    assert.strictEqual(add.mock.calls[0]?.arguments[2], definition);
  });

  it("returns an instance with the correct name", (t) => {
    const definition = Symbol() as any;
    const condition = new Condition("MyCondition", definition);
    const add = t.mock.fn();

    const instance = condition.onUse({ add } as any);

    assert.strictEqual(instance.name, "MyCondition");
  });
});
