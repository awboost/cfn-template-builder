import assert from "node:assert";
import { describe, it } from "node:test";
import { Metadata } from "./metadata.js";

describe("Metadata", () => {
  it("adds metadata to the template", (t) => {
    const definition = Symbol();
    const metadata = new Metadata("MyMetadata", definition);
    const add = t.mock.fn();

    metadata.onUse({ add } as any);

    assert.strictEqual(add.mock.calls.length, 1);
    assert.strictEqual(add.mock.calls[0]?.arguments[0], "Metadata");
    assert.strictEqual(add.mock.calls[0]?.arguments[1], "MyMetadata");
    assert.strictEqual(add.mock.calls[0]?.arguments[2], definition);
  });
});
