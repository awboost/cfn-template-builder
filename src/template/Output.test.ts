import assert from "node:assert";
import { describe, it } from "node:test";
import { OutputDefinition } from "../template.js";
import { Output } from "./Output.js";

describe("Output", () => {
  it("adds an output to the template", (t) => {
    const definition: OutputDefinition = {
      Value: Symbol(),
      Description: "hello world",
      Export: { Name: "Exported" },
    };
    const output = new Output("MyOutput", definition);
    const add = t.mock.fn();

    output.onUse({ add } as any);

    assert.strictEqual(add.mock.calls.length, 1);
    assert.strictEqual(add.mock.calls[0]?.arguments[0], "Outputs");
    assert.strictEqual(add.mock.calls[0]?.arguments[1], "MyOutput");
    assert.deepStrictEqual(add.mock.calls[0]?.arguments[2], definition);
  });

  describe("the returned instance", () => {
    it("has the correct name", (t) => {
      const definition: OutputDefinition = {
        Value: Symbol(),
        Description: "hello world",
        Export: { Name: "Exported" },
      };
      const output = new Output("MyOutput", definition);
      const add = t.mock.fn();

      const instance = output.onUse({ add } as any);

      assert.strictEqual(instance.localName, "MyOutput");
    });

    it("has an importValue function", (t) => {
      const definition: OutputDefinition = {
        Value: Symbol(),
        Description: "hello world",
        Export: { Name: "Exported" },
      };
      const output = new Output("MyOutput", definition);
      const add = t.mock.fn();

      const instance = output.onUse({ add } as any);

      assert.strictEqual(typeof instance.importValue, "function");
    });

    describe("the importValue function", () => {
      it("returns a Fn::ImportValue object", (t) => {
        const definition: OutputDefinition = {
          Value: Symbol(),
          Description: "hello world",
          Export: { Name: "Exported" },
        };
        const output = new Output("MyOutput", definition);
        const add = t.mock.fn();

        const instance = output.onUse({ add } as any);

        assert.deepStrictEqual(instance.importValue(), {
          "Fn::ImportValue": "Exported",
        });
      });

      it("throws an exception if the output is not exported", (t) => {
        const definition: OutputDefinition = {
          Value: Symbol(),
          Description: "hello world",
        };
        const output = new Output("MyOutput", definition);
        const add = t.mock.fn();

        const instance = output.onUse({ add } as any);

        assert.throws(() => instance.importValue());
      });
    });
  });
});
