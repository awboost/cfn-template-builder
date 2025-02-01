import assert from "node:assert";
import { describe, it } from "node:test";
import { Stack } from "../stack.js";
import { Metadata } from "./metadata.js";

describe("Metadata", () => {
  it("adds metadata to the template", (t) => {
    const stack = new Stack();
    const definition = Symbol();

    stack.add(new Metadata("MyMetadata", definition));

    assert.deepStrictEqual(stack.template, {
      Resources: {},
      Metadata: {
        MyMetadata: definition,
      },
    });
  });
});
