import assert from "node:assert";
import { describe, it, mock } from "node:test";
import type { TemplateFragment } from "../builder.js";
import { Metadata } from "./metadata.js";

describe("Metadata", () => {
  it("adds metadata to the template", (t) => {
    const definition = Symbol();
    const metadata = new Metadata("MyMetadata", definition);

    const template: TemplateFragment = {
      assets: [],
      components: [],
      template: {},
      add: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    metadata.addToTemplate(template);

    assert.deepStrictEqual(template.template, {
      Metadata: {
        MyMetadata: definition,
      },
    });
  });
});
