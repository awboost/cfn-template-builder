import assert from "node:assert";
import { describe, it } from "node:test";
import { Rule } from "./rule.js";

describe("Rule", () => {
  it("adds a rule to the template", (t) => {
    const definition = Symbol();
    const rule = new Rule("MyRule", definition);
    const add = t.mock.fn();

    rule.onUse({ add } as any);

    assert.strictEqual(add.mock.calls.length, 1);
    assert.strictEqual(add.mock.calls[0]?.arguments[0], "Rules");
    assert.strictEqual(add.mock.calls[0]?.arguments[1], "MyRule");
    assert.strictEqual(add.mock.calls[0]?.arguments[2], definition);
  });
});
