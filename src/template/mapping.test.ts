import assert from "node:assert";
import { describe, it, mock } from "node:test";
import type { TemplateBuilder } from "../builder.js";
import { Mapping } from "./mapping.js";

describe("Mapping", () => {
  it("adds a mapping to the template", (t) => {
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
    const mapping = new Mapping("MyMapping", definition);

    const template: TemplateBuilder = {
      assets: [],
      template: {},
      use: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    mapping.onUse(template);

    assert.deepStrictEqual(template.template, {
      Mappings: {
        MyMapping: definition,
      },
    });
  });

  describe("the returned instance", () => {
    it("has the correct name", (t) => {
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
      const mapping = new Mapping("MyMapping", definition);

      const template: TemplateBuilder = {
        assets: [],
        template: {},
        use: mock.fn(() => {
          assert(false, `unexpected call`);
        }),
      };

      const instance = mapping.onUse(template);

      assert.strictEqual(instance.name, "MyMapping");
    });

    it("has a findInMap function", (t) => {
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
      const mapping = new Mapping("MyMapping", definition);

      const template: TemplateBuilder = {
        assets: [],
        template: {},
        use: mock.fn(() => {
          assert(false, `unexpected call`);
        }),
      };

      const instance = mapping.onUse(template);

      assert.strictEqual(typeof instance.findInMap, "function");
    });

    describe("the findInMap function", () => {
      it("generates Fn::FindInMap objects for valid keys", (t) => {
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
        const mapping = new Mapping("MyMapping", definition);

        const template: TemplateBuilder = {
          assets: [],
          template: {},
          use: mock.fn(() => {
            assert(false, `unexpected call`);
          }),
        };

        const instance = mapping.onUse(template);

        assert.deepStrictEqual(instance.findInMap("One", "A"), {
          "Fn::FindInMap": ["MyMapping", "One", "A"],
        });
        assert.deepStrictEqual(instance.findInMap("Two", "B"), {
          "Fn::FindInMap": ["MyMapping", "Two", "B"],
        });
      });

      it("throws an exception for invalid keys", (t) => {
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
        const mapping = new Mapping("MyMapping", definition);

        const template: TemplateBuilder = {
          assets: [],
          template: {},
          use: mock.fn(() => {
            assert(false, `unexpected call`);
          }),
        };

        const instance = mapping.onUse(template);

        assert.throws(() => {
          instance.findInMap("Three" as any, "A");
        });
        assert.throws(() => {
          instance.findInMap("One", "C" as any);
        });
      });
    });
  });
});
