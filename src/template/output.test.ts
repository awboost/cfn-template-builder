import assert from "node:assert";
import { describe, it, mock } from "node:test";
import type { TemplateFragment } from "../builder.js";
import type { OutputDefinition } from "../template.js";
import { Output } from "./output.js";

describe("Output", () => {
  it("adds an output to the template", (t) => {
    const definition: OutputDefinition = {
      Value: Symbol(),
      Description: "hello world",
      Export: { Name: "Exported" },
    };
    const output = new Output("MyOutput", definition);

    const template: TemplateFragment = {
      assets: [],
      template: {},
      use: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    output.onUse(template);

    assert.deepStrictEqual(template.template, {
      Outputs: {
        MyOutput: definition,
      },
    });
  });

  describe("the returned instance", () => {
    it("has the correct name", (t) => {
      const definition: OutputDefinition = {
        Value: Symbol(),
        Description: "hello world",
        Export: { Name: "Exported" },
      };
      const output = new Output("MyOutput", definition);

      const template: TemplateFragment = {
        assets: [],
        template: {},
        use: mock.fn(() => {
          assert(false, `unexpected call`);
        }),
      };

      const instance = output.onUse(template);

      assert.strictEqual(instance.name, "MyOutput");
    });

    it("has an importValue function", (t) => {
      const definition: OutputDefinition = {
        Value: Symbol(),
        Description: "hello world",
        Export: { Name: "Exported" },
      };
      const output = new Output("MyOutput", definition);

      const template: TemplateFragment = {
        assets: [],
        template: {},
        use: mock.fn(() => {
          assert(false, `unexpected call`);
        }),
      };

      const instance = output.onUse(template);

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

        const template: TemplateFragment = {
          assets: [],
          template: {},
          use: mock.fn(() => {
            assert(false, `unexpected call`);
          }),
        };

        const instance = output.onUse(template);

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

        const template: TemplateFragment = {
          assets: [],
          template: {},
          use: mock.fn(() => {
            assert(false, `unexpected call`);
          }),
        };

        const instance = output.onUse(template);

        assert.throws(() => instance.importValue());
      });
    });
  });
});
