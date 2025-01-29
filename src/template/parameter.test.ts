import assert from "node:assert";
import { describe, it, mock } from "node:test";
import type { TemplateFragment } from "../builder.js";
import type { ParameterDefinition } from "../template.js";
import { Parameter } from "./parameter.js";

describe("Parameter", () => {
  it("adds a parameter to the template", (t) => {
    const definition: ParameterDefinition = {
      Type: "String",
      Description: "The Description",
    };
    const parameter = new Parameter("MyParam", definition);

    const template: TemplateFragment = {
      assets: [],
      components: [],
      template: {},
      add: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    parameter.addToTemplate(template);

    assert.deepStrictEqual(template.template, {
      Parameters: {
        MyParam: definition,
      },
    });
  });

  it("adds a parameter to the template with the given string type", (t) => {
    const parameter = new Parameter("MyParam", "AWS::EC2::Subnet::Id");

    const template: TemplateFragment = {
      assets: [],
      components: [],
      template: {},
      add: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    parameter.addToTemplate(template);

    assert.deepStrictEqual(template.template, {
      Parameters: {
        MyParam: {
          Type: "AWS::EC2::Subnet::Id",
        },
      },
    });
  });

  describe("the returned instance", () => {
    it("has the correct name", (t) => {
      const definition: ParameterDefinition = {
        Type: "String",
        Description: "The Description",
      };
      const parameter = new Parameter("MyParam", definition);

      const template: TemplateFragment = {
        assets: [],
        components: [],
        template: {},
        add: mock.fn(() => {
          assert(false, `unexpected call`);
        }),
      };

      const instance = parameter.addToTemplate(template);

      assert.strictEqual(instance.name, "MyParam");
    });

    it("has a ref property", (t) => {
      const definition: ParameterDefinition = {
        Type: "String",
        Description: "The Description",
      };
      const parameter = new Parameter("MyParam", definition);

      const template: TemplateFragment = {
        assets: [],
        components: [],
        template: {},
        add: mock.fn(() => {
          assert(false, `unexpected call`);
        }),
      };

      const instance = parameter.addToTemplate(template);

      assert.deepStrictEqual(instance.ref, { Ref: "MyParam" });
    });
  });
});
