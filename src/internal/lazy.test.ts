import assert from "node:assert";
import { describe, it, mock } from "node:test";
import { lazy } from "./lazy.js";

describe("lazy()", () => {
  it("only calls the factory function once", () => {
    const fn = mock.fn();
    const wrapped = lazy(fn);

    wrapped();
    wrapped();
    wrapped();

    assert.strictEqual(fn.mock.callCount(), 1);
  });

  it("returns the same value on each call", () => {
    const value = Symbol();
    const wrapped = lazy(() => value);

    assert.strictEqual(wrapped(), value);
    assert.strictEqual(wrapped(), value);
    assert.strictEqual(wrapped(), value);
  });
});
