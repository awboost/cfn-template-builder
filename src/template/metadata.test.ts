import assert from "node:assert";
import { describe, it } from "node:test";
import { Fragment } from "../fragment.js";
import { Metadata } from "./metadata.js";

describe("Metadata", () => {
  it("adds metadata to the template", (t) => {
    const fragment = new Fragment();
    const definition = Symbol();

    fragment.add(new Metadata("MyMetadata", definition));

    assert.deepStrictEqual(fragment.template, {
      Resources: {},
      Metadata: {
        MyMetadata: definition,
      },
    });
  });
});
