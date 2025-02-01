import assert from "node:assert";
import { describe, it } from "node:test";
import { Stack } from "../stack.js";
import { Mapping } from "./mapping.js";

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
