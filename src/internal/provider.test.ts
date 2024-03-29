import assert from "node:assert";
import { describe, it, mock } from "node:test";
import { getValueAsync } from "./provider.js";

describe("getValueAsync()", () => {
  it("calls the provider if it is a function", async () => {
    const value = Symbol();
    const fn = mock.fn(() => value);

    const result = await getValueAsync(fn);

    assert.strictEqual(fn.mock.callCount(), 1);
    assert.strictEqual(result, value);
  });

  it("returns the provider if it is not a function", async () => {
    const value = Symbol();

    const result = await getValueAsync(value);

    assert.strictEqual(result, value);
  });
});
