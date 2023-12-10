import assert from "node:assert";
import { describe, it } from "node:test";
import { Template } from "../template.js";
import { RawTemplateBuilder } from "./RawTemplateBuilder.js";

describe("RawTemplateBuilder", () => {
  describe("add()", () => {
    it("creates a new section if it does not exist", () => {
      const template: Template = { Resources: {} };
      const builder = new RawTemplateBuilder(template);
      const def = Symbol();

      builder.add("Metadata", "MyMeta", def);

      assert.deepStrictEqual(template.Metadata, {
        MyMeta: def,
      });
    });

    it("adds to an existing section", () => {
      const def1 = Symbol();
      const def2 = Symbol();

      const template: Template = {
        Resources: {},
        Metadata: {
          MyMeta1: def1,
        },
      };
      const builder = new RawTemplateBuilder(template);

      builder.add("Metadata", "MyMeta2", def2);

      assert.deepStrictEqual(template.Metadata, {
        MyMeta1: def1,
        MyMeta2: def2,
      });
    });

    it("throws an error for a duplicate name", () => {
      const def1 = Symbol();
      const def2 = Symbol();

      const template: Template = {
        Resources: {},
        Metadata: {
          MyMeta1: def1,
        },
      };
      const builder = new RawTemplateBuilder(template);

      assert.throws(() => builder.add("Metadata", "MyMeta1", def2));

      assert.deepStrictEqual(template.Metadata, {
        MyMeta1: def1,
      });
    });
  });
});
