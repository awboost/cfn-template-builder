import assert from "node:assert";
import { describe, it } from "node:test";
import type { ParameterDefinition } from "../template.js";
import { Parameter } from "./parameter.js";

describe("Parameter", () => {
  it("adds a parameter to the template", (t) => {
    const definition: ParameterDefinition = {
      Type: "String",
      Description: "The Description",
    };
    const parameter = new Parameter("MyParam", definition);
    const add = t.mock.fn();

    parameter.onUse({ add } as any);

    assert.strictEqual(add.mock.calls.length, 1);
    assert.strictEqual(add.mock.calls[0]?.arguments[0], "Parameters");
    assert.strictEqual(add.mock.calls[0]?.arguments[1], "MyParam");
    assert.deepStrictEqual(add.mock.calls[0]?.arguments[2], definition);
  });

  it("adds a parameter to the template with the given string type", (t) => {
    const parameter = new Parameter("MyParam", "AWS::EC2::Subnet::Id");
    const add = t.mock.fn();

    parameter.onUse({ add } as any);

    assert.strictEqual(add.mock.calls.length, 1);
    assert.strictEqual(add.mock.calls[0]?.arguments[0], "Parameters");
    assert.strictEqual(add.mock.calls[0]?.arguments[1], "MyParam");
    assert.deepStrictEqual(add.mock.calls[0]?.arguments[2], {
      Type: "AWS::EC2::Subnet::Id",
    });
  });

  describe("the returned instance", () => {
    it("has the correct name", (t) => {
      const definition: ParameterDefinition = {
        Type: "String",
        Description: "The Description",
      };
      const parameter = new Parameter("MyParam", definition);
      const add = t.mock.fn();

      const instance = parameter.onUse({ add } as any);

      assert.strictEqual(instance.name, "MyParam");
    });

    it("has a ref property", (t) => {
      const definition: ParameterDefinition = {
        Type: "String",
        Description: "The Description",
      };
      const parameter = new Parameter("MyParam", definition);
      const add = t.mock.fn();

      const instance = parameter.onUse({ add } as any);

      assert.deepStrictEqual(instance.ref, { Ref: "MyParam" });
    });
  });
});
