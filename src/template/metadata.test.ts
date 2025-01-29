import assert from "node:assert";
import { describe, it, mock } from "node:test";
import type { TemplateBuilder } from "../builder.js";
import { Metadata } from "./metadata.js";

describe("Metadata", () => {
  it("adds metadata to the template", (t) => {
    const definition = Symbol();
    const metadata = new Metadata("MyMetadata", definition);

    const template: TemplateBuilder = {
      template: {},
      use: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    metadata.onUse(template);

    assert.deepStrictEqual(template.template, {
      Metadata: {
        MyMetadata: definition,
      },
    });
  });
});
