import assert from "node:assert";
import { describe, it } from "node:test";
import { addToTemplate, mergeTemplates } from "./builder.js";
import { DuplicateElementError } from "./errors.js";
import type { Template } from "./template.js";

describe("builder", () => {
  describe("addToTemplate()", () => {
    it("adds the given element to the template", () => {
      const template: Partial<Template> = {};

      addToTemplate(template, "Metadata", "Answer", 42);

      assert.deepStrictEqual(template, {
        Metadata: {
          Answer: 42,
        },
      });
    });

    it("merges with existing elements", () => {
      const template: Partial<Template> = {
        Parameters: {
          Name: {
            Type: "String",
          },
        },
        Metadata: {
          Greeting: "Hello World",
        },
      };

      addToTemplate(template, "Metadata", "Answer", 42);

      assert.deepStrictEqual(template, {
        Parameters: {
          Name: {
            Type: "String",
          },
        },
        Metadata: {
          Answer: 42,
          Greeting: "Hello World",
        },
      });
    });

    it("throws if an element with the same name already exists", () => {
      const template: Partial<Template> = {
        Metadata: {
          Answer: 34,
        },
      };

      assert.throws(
        () => {
          addToTemplate(template, "Metadata", "Answer", 42);
        },
        (error) =>
          error instanceof DuplicateElementError &&
          error.sectionName === "Metadata" &&
          error.elementName === "Answer",
      );
    });
  });

  describe("mergeTemplates()", () => {
    it("merges subsequent templates into the first one", () => {
      const target: Partial<Template> = {
        Parameters: {
          Blah: {
            Type: "String",
          },
        },
        Resources: {
          One: {
            Type: "AWS::Lambda::Function",
            Properties: {
              Blah: { Ref: "Blah" },
            },
          },
        },
      };

      mergeTemplates(
        target,
        {
          Resources: {
            Two: {
              Type: "AWS::Lambda::Function",
              Properties: {
                Blah: "Blah",
              },
            },
          },
          Metadata: {
            Answer: 42,
          },
        },
        {
          Metadata: {
            Greeting: "Hello World",
          },
        },
      );

      assert.deepStrictEqual(target, {
        Parameters: {
          Blah: {
            Type: "String",
          },
        },
        Resources: {
          One: {
            Type: "AWS::Lambda::Function",
            Properties: {
              Blah: { Ref: "Blah" },
            },
          },
          Two: {
            Type: "AWS::Lambda::Function",
            Properties: {
              Blah: "Blah",
            },
          },
        },
        Metadata: {
          Answer: 42,
          Greeting: "Hello World",
        },
      });
    });

    it("throws if an element with the same name already exists", () => {
      const target: Partial<Template> = {
        Metadata: {
          Answer: 42,
        },
      };

      assert.throws(
        () => {
          mergeTemplates(target, {
            Metadata: {
              Answer: 42,
            },
          });
        },
        (error) =>
          error instanceof DuplicateElementError &&
          error.sectionName === "Metadata" &&
          error.elementName === "Answer",
      );
    });
  });
});
