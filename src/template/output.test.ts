import assert from "node:assert";
import { describe, it } from "node:test";
import { Fragment } from "../fragment.js";
import type { OutputDefinition } from "../template.js";
import { Output } from "./output.js";

describe("Output", () => {
  it("adds an output to the template", (t) => {
    const fragment = new Fragment();

    const definition: OutputDefinition = {
      Value: Symbol(),
      Description: "hello world",
      Export: { Name: "Exported" },
    };

    const instance = fragment.add(new Output("MyOutput", definition));

    assert.deepStrictEqual(fragment.template, {
      Resources: {},
      Outputs: {
        MyOutput: definition,
      },
    });
  });

  describe("the returned instance", () => {
    it("has the correct name", (t) => {
      const fragment = new Fragment();

      const definition: OutputDefinition = {
        Value: Symbol(),
        Description: "hello world",
        Export: { Name: "Exported" },
      };

      const instance = fragment.add(new Output("MyOutput", definition));

      assert.strictEqual(instance.name, "MyOutput");
    });

    it("has an importValue function", (t) => {
      const fragment = new Fragment();

      const definition: OutputDefinition = {
        Value: Symbol(),
        Description: "hello world",
        Export: { Name: "Exported" },
      };

      const instance = fragment.add(new Output("MyOutput", definition));

      assert.strictEqual(typeof instance.importValue, "function");
    });

    describe("the importValue function", () => {
      it("returns a Fn::ImportValue object", (t) => {
        const fragment = new Fragment();

        const definition: OutputDefinition = {
          Value: Symbol(),
          Description: "hello world",
          Export: { Name: "Exported" },
        };

        const instance = fragment.add(new Output("MyOutput", definition));

        assert.deepStrictEqual(instance.importValue(), {
          "Fn::ImportValue": "Exported",
        });
      });

      it("throws an exception if the output is not exported", (t) => {
        const fragment = new Fragment();

        const definition: OutputDefinition = {
          Value: Symbol(),
          Description: "hello world",
        };

        const instance = fragment.add(new Output("MyOutput", definition));

        assert.throws(() => instance.importValue());
      });
    });
  });
});
