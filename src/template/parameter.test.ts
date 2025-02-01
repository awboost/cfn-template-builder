import assert from "node:assert";
import { describe, it } from "node:test";
import { Fragment } from "../fragment.js";
import type { ParameterDefinition } from "../template.js";
import { Parameter } from "./parameter.js";

describe("Parameter", () => {
  it("adds a parameter to the template", (t) => {
    const fragment = new Fragment();

    const definition: ParameterDefinition = {
      Type: "String",
      Description: "The Description",
    };

    fragment.add(new Parameter("MyParam", definition));

    assert.deepStrictEqual(fragment.template, {
      Resources: {},
      Parameters: {
        MyParam: definition,
      },
    });
  });

  it("adds a parameter to the template with the given string type", (t) => {
    const fragment = new Fragment();

    fragment.add(new Parameter("MyParam", "AWS::EC2::Subnet::Id"));

    assert.deepStrictEqual(fragment.template, {
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
      const fragment = new Fragment();

      const definition: ParameterDefinition = {
        Type: "String",
        Description: "The Description",
      };

      const instance = fragment.add(new Parameter("MyParam", definition));

      assert.strictEqual(instance.name, "MyParam");
    });

    it("has a ref property", (t) => {
      const fragment = new Fragment();

      const definition: ParameterDefinition = {
        Type: "String",
        Description: "The Description",
      };

      const instance = fragment.add(new Parameter("MyParam", definition));

      assert.deepStrictEqual(instance.ref, { Ref: "MyParam" });
    });
  });
});
