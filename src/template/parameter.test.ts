import assert from "node:assert";
import { describe, it } from "node:test";
import { Stack } from "../stack.js";
import type { ParameterDefinition } from "../template.js";
import { Parameter } from "./parameter.js";

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
