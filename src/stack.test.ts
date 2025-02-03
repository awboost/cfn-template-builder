import assert from "node:assert";
import { describe, it } from "node:test";
import { Asset } from "./asset.js";
import { Stack } from "./stack.js";

describe("module stack", () => {
  describe("Stack", () => {
    describe("#add()", () => {
      it("calls build on a component", (t) => {
        const instance = Symbol();
        const build = t.mock.fn((x: any) => instance);
        const stack = new Stack();

        const result = stack.add({ build });

        assert.strictEqual(result, instance);
        assert.strictEqual(build.mock.calls.length, 1);
        assert.strictEqual(build.mock.calls[0]?.arguments[0], stack);
      });

      it("combines a fragment", (t) => {
        const asset1 = new Asset("asset1.txt", "hello");
        const asset2 = new Asset("asset2.txt", "hello");

        const stack = new Stack({
          assets: [asset1],
          template: {
            Parameters: {
              Blah: {
                Type: "String",
              },
            },
            Resources: {
              One: {
                Type: "AWS::Lambda::Function",
                Properties: {
                  Blah: { Ref: "Blah" },
                },
              },
            },
          },
        });

        stack.add({
          assets: [asset2],
          template: {
            Resources: {
              Two: {
                Type: "AWS::Lambda::Function",
                Properties: {
                  Blah: "Blah",
                },
              },
            },
            Metadata: {
              Answer: 42,
            },
          },
        });

        assert.strictEqual(stack.assets.length, 2);
        assert.strictEqual(stack.assets[0], asset1);
        assert.strictEqual(stack.assets[1], asset2);

        assert.deepStrictEqual(stack.template, {
          Parameters: {
            Blah: {
              Type: "String",
            },
          },
          Resources: {
            One: {
              Type: "AWS::Lambda::Function",
              Properties: {
                Blah: { Ref: "Blah" },
              },
            },
            Two: {
              Type: "AWS::Lambda::Function",
              Properties: {
                Blah: "Blah",
              },
            },
          },
          Metadata: {
            Answer: 42,
          },
        });
      });
    });
  });
});
