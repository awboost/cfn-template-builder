import assert from "node:assert";
import { Readable } from "node:stream";
import { text } from "node:stream/consumers";
import { describe, it, mock } from "node:test";
import type { AssetLike } from "./builder.js";
import {
  AssetContextShim,
  BuilderContextExtension,
  BuilderConverter,
} from "./compatibility.js";
import { Stack } from "./stack.js";
import type { Template } from "./template.js";

describe("BuilderConverter", () => {
  it("converts asset parameters outputs Mapping entry", async () => {
    const stack = new Stack();

    stack.use(
      new BuilderConverter({
        build(template, ctx): Template {
          const assets = ctx.get(AssetContextShim);

          assets.assets.push({
            name: "MyAsset",
            parameters: {
              S3Bucket: "Bucket",
              S3Key: "Key",
            },

            generate: () => ({
              content: Readable.from("hello world"),
              fileName: "hello.txt",
            }),
          });

          return {
            Resources: {
              Lambda: {
                Type: "AWS::Lambda::Function",
                Properties: {
                  Handler: "index.handler",
                  Code: {
                    S3Bucket: { toJSON: () => ({ Ref: "Bucket" }) },
                    S3Key: { toJSON: () => ({ Ref: "Key" }) },
                  },
                  Runtime: "nodejs20.x",
                  Timeout: 25,
                },
              },
            },
            Parameters: {
              Bucket: {
                Type: "String",
              },
              Key: {
                Type: "String",
              },
            },
          };
        },
      }),
    );

    await stack._runBuildHooks();
    await stack._runTransformHooks();

    assert.deepStrictEqual(stack.template, {
      Mappings: {
        AssetManifest: {
          MyAsset: {
            FileName: "hello.2aae6c35c94fcfb415dbe95f408b9ce91ee846ed.txt",
            Integrity: "sha1-Kq5sNclPz7QV2+lfQIuc6R7oRu0=",
          },
        },
      },
      Parameters: {
        AssetBucketName: {
          Type: "String",
        },
      },
      Resources: {
        Lambda: {
          Type: "AWS::Lambda::Function",
          Properties: {
            Handler: "index.handler",
            Code: {
              S3Bucket: { Ref: "AssetBucketName" },
              S3Key: {
                "Fn::FindInMap": ["AssetManifest", "MyAsset", "FileName"],
              },
            },
            Runtime: "nodejs20.x",
            Timeout: 25,
          },
        },
      },
    });
  });

  it("outputs the asset content", async () => {
    const addAsset = mock.fn((asset: AssetLike) => {});
    const stack = new Stack();

    stack.use(
      new BuilderConverter({
        build(template, ctx): Template {
          const assets = ctx.get(AssetContextShim);

          assets.assets.push({
            name: "MyAsset",
            parameters: {
              S3Bucket: "Bucket",
              S3Key: "Key",
            },

            generate: () => ({
              content: Readable.from("hello world"),
              fileName: "hello.txt",
            }),
          });

          return template;
        },
      }),
    );

    await stack._runBuildHooks();

    await stack._runEmitHooks({ addAsset });

    assert.strictEqual(addAsset.mock.callCount(), 1);

    const call = addAsset.mock.calls[0]!;

    assert.deepStrictEqual(
      call.arguments[0].fileName,
      "hello.2aae6c35c94fcfb415dbe95f408b9ce91ee846ed.txt",
    );
    assert.deepStrictEqual(
      await text(call.arguments[0].content as Readable),
      "hello world",
    );
    assert.deepStrictEqual(
      call.arguments[0].integrity,
      "sha1-Kq5sNclPz7QV2+lfQIuc6R7oRu0=",
    );
  });
});

describe("BuilderContextExtension", () => {
  describe("get", () => {
    it('throws if called with a key other than "AssetContext"', () => {
      const ctx = new BuilderContextExtension();

      assert.throws(
        () =>
          ctx.get(
            // eslint-disable-next-line @typescript-eslint/no-extraneous-class
            class {
              public static readonly ContextKey = "Boom";
            },
          ),
        (err: any) => {
          assert(err.message.endsWith("not supported"));
          return true;
        },
      );
    });

    it("constructs and returns the instance", () => {
      const ctx = new BuilderContextExtension();
      const calls: any[] = [];

      // eslint-disable-next-line @typescript-eslint/no-extraneous-class
      class Ctx {
        public static readonly ContextKey = "AssetContext";

        public constructor() {
          calls.push(this);
        }
      }

      const a = ctx.get(Ctx);
      const b = ctx.get(Ctx);
      const c = ctx.get(Ctx);

      assert.strictEqual(calls.length, 1);
      assert.strictEqual(a, calls[0]);
      assert.strictEqual(b, calls[0]);
      assert.strictEqual(c, calls[0]);
    });
  });
});
