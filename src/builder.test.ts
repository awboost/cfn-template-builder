import assert from "node:assert";
import { describe, it } from "node:test";
import {
  addToTemplate,
  Condition,
  Mapping,
  mergeTemplates,
  Metadata,
  Output,
  Parameter,
  ResolvableElement,
  Resource,
  Rule,
  type ResourceInstance,
} from "./builder.js";
import { DuplicateElementError, UnresolvedValueError } from "./errors.js";
import { Stack } from "./stack.js";
import type {
  OutputDefinition,
  ParameterDefinition,
  Template,
} from "./template.js";

describe("module builder", () => {
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

  describe("Condition", () => {
    it("adds a condition to the template", (t) => {
      const definition = Symbol() as any;
      const stack = new Stack();

      stack.add(new Condition("MyCondition", definition));

      assert.deepStrictEqual(stack.template, {
        Resources: {},
        Conditions: {
          MyCondition: definition,
        },
      });
    });

    it("returns an instance with the correct name", (t) => {
      const definition = Symbol() as any;
      const stack = new Stack();

      const instance = stack.add(new Condition("MyCondition", definition));

      assert.strictEqual(instance.name, "MyCondition");
    });
  });

  describe("Mapping", () => {
    it("adds a mapping to the template", (t) => {
      const stack = new Stack();

      const definition = {
        One: {
          A: "1.a",
          B: "1.b",
        },
        Two: {
          A: "2.a",
          B: "2.b",
        },
      };

      stack.add(new Mapping("MyMapping", definition));

      assert.deepStrictEqual(stack.template, {
        Resources: {},
        Mappings: {
          MyMapping: definition,
        },
      });
    });

    describe("the returned instance", () => {
      it("has the correct name", (t) => {
        const stack = new Stack();

        const definition = {
          One: {
            A: "1.a",
            B: "1.b",
          },
          Two: {
            A: "2.a",
            B: "2.b",
          },
        };

        const instance = stack.add(new Mapping("MyMapping", definition));

        assert.strictEqual(instance.name, "MyMapping");
      });

      it("has a findInMap function", (t) => {
        const stack = new Stack();

        const definition = {
          One: {
            A: "1.a",
            B: "1.b",
          },
          Two: {
            A: "2.a",
            B: "2.b",
          },
        };

        const instance = stack.add(new Mapping("MyMapping", definition));

        assert.strictEqual(typeof instance.findInMap, "function");
      });

      describe("the findInMap function", () => {
        it("generates Fn::FindInMap objects", (t) => {
          const stack = new Stack();

          const definition = {
            One: {
              A: "1.a",
              B: "1.b",
            },
            Two: {
              A: "2.a",
              B: "2.b",
            },
          };

          const instance = stack.add(new Mapping("MyMapping", definition));

          assert.deepStrictEqual(instance.findInMap("One", "A"), {
            "Fn::FindInMap": ["MyMapping", "One", "A"],
          });
          assert.deepStrictEqual(instance.findInMap("Two", "B"), {
            "Fn::FindInMap": ["MyMapping", "Two", "B"],
          });
        });
      });
    });
  });

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

  describe("Output", () => {
    it("adds an output to the template", (t) => {
      const stack = new Stack();

      const definition: OutputDefinition = {
        Value: Symbol(),
        Description: "hello world",
        Export: { Name: "Exported" },
      };

      stack.add(new Output("MyOutput", definition));

      assert.deepStrictEqual(stack.template, {
        Resources: {},
        Outputs: {
          MyOutput: definition,
        },
      });
    });

    describe("the returned instance", () => {
      it("has the correct name", (t) => {
        const stack = new Stack();

        const definition: OutputDefinition = {
          Value: Symbol(),
          Description: "hello world",
          Export: { Name: "Exported" },
        };

        const instance = stack.add(new Output("MyOutput", definition));

        assert.strictEqual(instance.name, "MyOutput");
      });

      it("has an importValue function", (t) => {
        const stack = new Stack();

        const definition: OutputDefinition = {
          Value: Symbol(),
          Description: "hello world",
          Export: { Name: "Exported" },
        };

        const instance = stack.add(new Output("MyOutput", definition));

        assert.strictEqual(typeof instance.importValue, "function");
      });

      describe("the importValue function", () => {
        it("returns a Fn::ImportValue object", (t) => {
          const stack = new Stack();

          const definition: OutputDefinition = {
            Value: Symbol(),
            Description: "hello world",
            Export: { Name: "Exported" },
          };

          const instance = stack.add(new Output("MyOutput", definition));

          assert.deepStrictEqual(instance.importValue(), {
            "Fn::ImportValue": "Exported",
          });
        });

        it("throws an exception if the output is not exported", (t) => {
          const stack = new Stack();

          const definition: OutputDefinition = {
            Value: Symbol(),
            Description: "hello world",
          };

          const instance = stack.add(new Output("MyOutput", definition));

          assert.throws(() => instance.importValue());
        });
      });
    });
  });

  describe("Parameter", () => {
    it("adds a parameter to the template", (t) => {
      const stack = new Stack();

      const definition: ParameterDefinition = {
        Type: "String",
        Description: "The Description",
      };

      stack.add(new Parameter("MyParam", definition));

      assert.deepStrictEqual(stack.template, {
        Resources: {},
        Parameters: {
          MyParam: definition,
        },
      });
    });

    it("adds a parameter to the template with the given string type", (t) => {
      const stack = new Stack();

      stack.add(new Parameter("MyParam", "AWS::EC2::Subnet::Id"));

      assert.deepStrictEqual(stack.template, {
        Resources: {},
        Parameters: {
          MyParam: {
            Type: "AWS::EC2::Subnet::Id",
          },
        },
      });
    });

    describe("the returned instance", () => {
      it("has the correct name", (t) => {
        const stack = new Stack();

        const definition: ParameterDefinition = {
          Type: "String",
          Description: "The Description",
        };

        const instance = stack.add(new Parameter("MyParam", definition));

        assert.strictEqual(instance.name, "MyParam");
      });

      it("has a ref property", (t) => {
        const stack = new Stack();

        const definition: ParameterDefinition = {
          Type: "String",
          Description: "The Description",
        };

        const instance = stack.add(new Parameter("MyParam", definition));

        assert.deepStrictEqual(instance.ref, { Ref: "MyParam" });
      });
    });
  });

  describe("Resource", () => {
    it("adds a resource to the template", (t) => {
      const stack = new Stack();

      stack.add(
        new Resource(
          "MyResource",
          "Custom::MyResource",
          {
            One: "1",
            Two: 2,
          },
          {
            Condition: "TheCondition",
            DeletionPolicy: "Delete",
          },
        ),
      );

      assert.deepStrictEqual(stack.template, {
        Resources: {
          MyResource: {
            Type: "Custom::MyResource",
            Properties: {
              One: "1",
              Two: 2,
            },
            Condition: "TheCondition",
            DeletionPolicy: "Delete",
          },
        },
      });
    });

    describe("the returned instance", () => {
      it("has the correct name", (t) => {
        const stack = new Stack();

        const instance = stack.add(
          new Resource("MyResource", "Custom::MyResource", {
            One: "1",
            Two: 2,
          }),
        );

        assert.strictEqual(instance.name, "MyResource");
      });
    });

    it("has a ref property", (t) => {
      const stack = new Stack();

      const instance = stack.add(
        new Resource("MyResource", "Custom::MyResource", {
          One: "1",
          Two: 2,
        }),
      );

      assert.deepStrictEqual(instance.ref, { Ref: "MyResource" });
    });

    it("has an out property", (t) => {
      const stack = new Stack();

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- false positive
      const instance = stack.add(
        new Resource("MyResource", "Custom::MyResource", {
          One: "1",
          Two: 2,
        }),
      ) as ResourceInstance<any>;

      assert.deepStrictEqual(instance.out["foo"].toJSON(), {
        "Fn::GetAtt": ["MyResource", "foo"],
      });
      assert.deepStrictEqual(instance.out["bar"].baz.toJSON(), {
        "Fn::GetAtt": ["MyResource", "bar.baz"],
      });
    });

    it("the out property is not directly serializable", (t) => {
      const stack = new Stack();

      const instance = stack.add(
        new Resource("MyResource", "Custom::MyResource", {
          One: "1",
          Two: 2,
        }),
      );

      assert.throws(
        () => JSON.stringify(instance.out),
        (err: any) => {
          assert.strictEqual(
            err.message,
            "the whole attributes object cannot be serialized directly",
          );
          return true;
        },
      );
    });
  });

  describe("Rule", () => {
    it("adds a rule to the template", (t) => {
      const stack = new Stack();
      const definition = Symbol();

      stack.add(new Rule("MyRule", definition as any));

      assert.deepStrictEqual(stack.template, {
        Resources: {},
        Rules: {
          MyRule: definition as any,
        },
      });
    });
  });
});
