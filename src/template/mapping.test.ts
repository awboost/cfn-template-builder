import assert from "node:assert";
import { describe, it } from "node:test";
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
    const add = t.mock.fn();

    mapping.onUse({ add } as any);

    assert.strictEqual(add.mock.calls.length, 1);
    assert.strictEqual(add.mock.calls[0]?.arguments[0], "Mappings");
    assert.strictEqual(add.mock.calls[0]?.arguments[1], "MyMapping");
    assert.deepStrictEqual(add.mock.calls[0]?.arguments[2], definition);
  });

  it("returns an instance", (t) => {
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
    const add = t.mock.fn();

    const instance = mapping.onUse({ add } as any);

    assert.ok(instance);
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
      const add = t.mock.fn();

      const instance = mapping.onUse({ add } as any);

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
      const add = t.mock.fn();

      const instance = mapping.onUse({ add } as any);

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
        const add = t.mock.fn();

        const instance = mapping.onUse({ add } as any);

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
        const add = t.mock.fn();

        const instance = mapping.onUse({ add } as any);

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
