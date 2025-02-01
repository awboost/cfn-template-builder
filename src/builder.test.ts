import assert from "node:assert";
import { describe, it } from "node:test";
import { addToTemplate, mergeTemplates, ResolvableElement } from "./builder.js";
import { DuplicateElementError, UnresolvedValueError } from "./errors.js";
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

  describe("ResolvableElement", () => {
    describe("when serialized via JSON.stringify", () => {
      it("throws UnresolvedValueError if no value has been set", () => {
        const resolvable = new ResolvableElement("MyValue");

        assert.throws(
          () => JSON.stringify(resolvable),
          (error) =>
            error instanceof UnresolvedValueError &&
            error.valueName === "MyValue",
        );
      });

      it("returns a value if it has been set", () => {
        const resolvable = new ResolvableElement("MyValue");
        resolvable.resolve(42);

        const serialized = JSON.stringify(resolvable);

        assert.strictEqual(serialized, "42");
      });

      it("supports chaining references", () => {
        const resolvable1 = new ResolvableElement("1");
        const resolvable2 = new ResolvableElement("2");
        const resolvable3 = new ResolvableElement("3");

        resolvable1.resolve(resolvable2);
        resolvable2.resolve(resolvable3);
        resolvable3.resolve(42);

        const serialized = JSON.stringify(resolvable1);

        assert.strictEqual(serialized, "42");
      });

      it("returns nothing if the value has been set to undefined", () => {
        const resolvable = new ResolvableElement("MyValue");
        resolvable.resolve(undefined);

        // we wrap it an object because JSON.stringify breaks if the root value
        // is undefined
        const serialized = JSON.stringify({ other: 1, resolvable });

        assert.strictEqual(serialized, `{"other":1}`);
      });

      it("returns the default value if no other has been set", () => {
        const resolvable = new ResolvableElement("MyValue", 54);

        const serialized = JSON.stringify(resolvable);

        assert.strictEqual(serialized, "54");
      });

      it("returns the set value even if a default has been set", () => {
        const resolvable = new ResolvableElement("MyValue", 54);
        resolvable.resolve(42);

        const serialized = JSON.stringify(resolvable);

        assert.strictEqual(serialized, "42");
      });

      it("returns the the last value set", () => {
        const resolvable = new ResolvableElement("MyValue", 54);
        resolvable.resolve(42);
        resolvable.resolve(101);

        const serialized = JSON.stringify(resolvable);

        assert.strictEqual(serialized, "101");
      });
    });

    describe("when serializing a hijacked value", () => {
      it("throws UnresolvedValueError if no value has been set", () => {
        const hijacked = { hello: "world" };
        const resolvable = new ResolvableElement("MyValue");
        resolvable.hijack(hijacked);

        assert.throws(
          () => JSON.stringify(hijacked),
          (error) =>
            error instanceof UnresolvedValueError &&
            error.valueName === "MyValue",
        );
      });

      it("returns a value if it has been set", () => {
        const hijacked = { hello: "world" };
        const resolvable = new ResolvableElement("MyValue");
        resolvable.hijack(hijacked);
        resolvable.resolve(42);

        const serialized = JSON.stringify(hijacked);

        assert.strictEqual(serialized, "42");
      });

      it("supports chaining references", () => {
        const hijacked = { hello: "world" };
        const resolvable1 = new ResolvableElement("1");
        resolvable1.hijack(hijacked);
        const resolvable2 = new ResolvableElement("2");
        const resolvable3 = new ResolvableElement("3");

        resolvable1.resolve(resolvable2);
        resolvable2.resolve(resolvable3);
        resolvable3.resolve(42);

        const serialized = JSON.stringify(hijacked);

        assert.strictEqual(serialized, "42");
      });

      it("returns the original value if the defaultToOriginal is set", () => {
        const hijacked = { hello: "world" };
        const resolvable = new ResolvableElement("MyValue");
        resolvable.hijack(hijacked, true);

        const serialized = JSON.stringify(hijacked);

        assert.strictEqual(serialized, `{"hello":"world"}`);
      });

      it("uses the original toJSON implementation if the defaultToOriginal is set", () => {
        const hijacked = {
          hello: "world",
          toJSON: () => ({ something: "else" }),
        };
        const resolvable = new ResolvableElement("MyValue");
        resolvable.hijack(hijacked, true);

        const serialized = JSON.stringify(hijacked);

        assert.strictEqual(serialized, `{"something":"else"}`);
      });

      it("returns the default value if no other has been set", () => {
        const hijacked = { hello: "world" };
        const resolvable = new ResolvableElement("MyValue", 54);
        resolvable.hijack(hijacked);

        const serialized = JSON.stringify(hijacked);

        assert.strictEqual(serialized, "54");
      });

      it("returns the set value even if a default has been set", () => {
        const hijacked = { hello: "world" };
        const resolvable = new ResolvableElement("MyValue", 54);
        resolvable.hijack(hijacked);
        resolvable.resolve(42);

        const serialized = JSON.stringify(hijacked);

        assert.strictEqual(serialized, "42");
      });

      it("returns the the last value set", () => {
        const hijacked = { hello: "world" };
        const resolvable = new ResolvableElement("MyValue", 54);
        resolvable.hijack(hijacked);
        resolvable.resolve(42);
        resolvable.resolve(101);

        const serialized = JSON.stringify(hijacked);

        assert.strictEqual(serialized, "101");
      });
    });
  });
});
