import assert from "node:assert";
import { text } from "node:stream/consumers";
import { describe, it, mock } from "node:test";
import { Asset } from "./asset.js";
import {
  addToTemplate,
  type TemplateComponent,
  type TemplateFragment,
} from "./builder.js";
import {
  BuilderAssetContext,
  CompatibleAsset,
  ConvertFromLegacyBuilder,
  ConvertToLegacyBuilder,
  type Compatibility,
} from "./compatibility.js";
import { Stack } from "./stack.js";
import type { Template } from "./template.js";
import { Fixtures } from "./test/fixtures/fixtures.js";
import { resolveAll, TestStackWriter } from "./test/util.js";

class LegacyIntrinsicLike {
  public constructor(
    public fn: string,
    public args: any,
  ) {}

  public toJSON(): any {
    return { [this.fn]: this.args };
  }
}

class TestAssetContext implements Compatibility.AssetContext {
  public static readonly ContextKey = "AssetContext";
  public readonly assets: Compatibility.AssetDefinition[] = [];

  public addAsset(
    name: string,
    definition: Compatibility.AssetDefinition,
  ): boolean {
    throw new Error(`not implemented`);
  }
}

describe("compatibility", () => {
  describe("class ConvertFromLegacyBuilder", () => {
    it("creates a fragment which calls the build method", () => {
      const input: Template = {
        Resources: {
          MyResource: {
            Type: "Custom::Something",
            Properties: {
              Foo: "Bar",
            },
          },
        },
      };

      const template: Template = {
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
          Greeting: "Hello World",
        },
      };

      const build = mock.fn((input: Template) => template);
      const builder: Compatibility.TemplateBuilder = { build };

      const stack = new Stack({ template: input });
      stack.add(new ConvertFromLegacyBuilder(builder));

      assert.strictEqual(build.mock.callCount(), 1);
      assert.deepStrictEqual(stack.template, {
        Parameters: {
          Blah: {
            Type: "String",
          },
        },
        Resources: {
          MyResource: {
            Type: "Custom::Something",
            Properties: {
              Foo: "Bar",
            },
          },
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
          Greeting: "Hello World",
        },
      });
    });

    it("creates a fragment with the correct assets", async () => {
      const asset: Compatibility.AssetBase = {
        name: "MyAsset",
        generate: () => Fixtures.hello.generate(),
        parameters: {
          S3Bucket: "Fred",
          S3Key: "George",
        },
        ref: {
          S3Bucket: new LegacyIntrinsicLike("Ref", "Fred") as any,
          S3Key: new LegacyIntrinsicLike("Ref", "George") as any,
        },
      };

      const builder: Compatibility.TemplateBuilder = {
        build: (template, ctx) => {
          const assets = ctx.get(TestAssetContext);
          assets.addAsset("MyAsset", asset);
          return template;
        },
      };

      const stack = new Stack();
      stack.add(new ConvertFromLegacyBuilder(builder));

      const { assets } = await TestStackWriter.write(stack);

      assert.strictEqual(assets.size, 1);

      assert.strictEqual(
        assets.get("MyAsset")!.content.toString(),
        await Fixtures.hello.text(),
      );
    });

    it("converts the references and removes the asset parameters", async () => {
      const asset: Compatibility.AssetBase = {
        name: "MyAsset",
        generate: () => Fixtures.hello.generate(),
        parameters: {
          S3Bucket: "Fred",
          S3Key: "George",
        },
        ref: {
          S3Bucket: new LegacyIntrinsicLike("Ref", "Fred") as any,
          S3Key: new LegacyIntrinsicLike("Ref", "George") as any,
        },
      };

      const builder: Compatibility.TemplateBuilder = {
        build: (template, ctx) => {
          const assets = ctx.get(TestAssetContext);
          assets.addAsset("MyAsset", asset);

          return {
            Parameters: {
              Other: { Type: "String" },
              [asset.parameters.S3Bucket]: { Type: "String" },
              [asset.parameters.S3Key]: { Type: "String" },
            },
            Resources: {
              MyResource: {
                Type: "Custom::Thing",
                Properties: {
                  A: asset.ref.S3Bucket,
                  B: {
                    C: {
                      D: asset.ref.S3Key,
                    },
                  },
                },
              },
            },
          };
        },
      };

      const stack = new Stack();
      stack.add(new ConvertFromLegacyBuilder(builder));

      // assets only get resolved on emit
      const { assets, template } = await TestStackWriter.write(stack);

      assert.strictEqual(assets.size, 1);
      const outputAsset = assets.get("MyAsset")!;

      assert.deepStrictEqual(template, {
        Parameters: {
          Other: { Type: "String" },
        },
        Resources: {
          MyResource: {
            Type: "Custom::Thing",
            Properties: {
              A: outputAsset.bucket,
              B: {
                C: {
                  D: outputAsset.key,
                },
              },
            },
          },
        },
      });
    });
  });

  describe("class ConvertToLegacyBuilder", () => {
    it("creates a builder which adds the component", () => {
      const input: Template = {
        Resources: {
          MyResource: {
            Type: "Custom::Something",
            Properties: {
              Foo: "Bar",
            },
          },
        },
      };

      const component: TemplateComponent = {
        build: (builder) => {
          addToTemplate(builder.template, "Resources", "Resource2", {
            Type: "Custom::Other",
            Properties: {
              Hello: "World",
            },
          });
        },
      };

      const ctx = new BuilderAssetContext();
      const builder = new ConvertToLegacyBuilder(
        component,
        BuilderAssetContext,
      );
      const template = builder.build(input, ctx);

      assert.deepStrictEqual(template, {
        Resources: {
          MyResource: {
            Type: "Custom::Something",
            Properties: {
              Foo: "Bar",
            },
          },
          Resource2: {
            Type: "Custom::Other",
            Properties: {
              Hello: "World",
            },
          },
        },
      });
    });

    it("creates a builder which adds the fragment", () => {
      const input: Template = {
        Resources: {
          MyResource: {
            Type: "Custom::Something",
            Properties: {
              Foo: "Bar",
            },
          },
        },
      };

      const component: TemplateFragment = {
        template: {
          Resources: {
            Resource2: {
              Type: "Custom::Other",
              Properties: {
                Hello: "World",
              },
            },
          },
        },
      };

      const ctx = new BuilderAssetContext();
      const builder = new ConvertToLegacyBuilder(
        component,
        BuilderAssetContext,
      );
      const template = builder.build(input, ctx);

      assert.deepStrictEqual(template, {
        Resources: {
          MyResource: {
            Type: "Custom::Something",
            Properties: {
              Foo: "Bar",
            },
          },
          Resource2: {
            Type: "Custom::Other",
            Properties: {
              Hello: "World",
            },
          },
        },
      });
    });

    it("adds the assets", async () => {
      const asset = Asset.fromFile("MyAsset", Fixtures.hello.path);

      const stack = new Stack({
        template: {
          Resources: {
            MyResource: {
              Type: "Custom::Thing",
              Properties: {
                A: asset.instance.ref.S3Bucket,
                B: { C: { D: asset.instance.ref.S3Key } },
              },
            },
          },
        },
      });

      stack.assets.push(asset);

      const ctx = new BuilderAssetContext();
      const builder = new ConvertToLegacyBuilder(stack, BuilderAssetContext);

      builder.build({ Resources: {} }, ctx);

      assert.strictEqual(ctx.assets.length, 1);
      const assetOutput = await ctx.assets[0]!.generate();

      assert.strictEqual(
        await text(assetOutput.content),
        await Fixtures.hello.text(),
      );

      assert.strictEqual(assetOutput.fileName, asset.fileName);
    });

    it("converts the references and adds the asset parameters", async () => {
      const asset = new Asset("MyAsset", Fixtures.hello.readable());

      const stack = new Stack({
        template: {
          Resources: {
            MyResource: {
              Type: "Custom::Thing",
              Properties: {
                A: asset.instance.ref.S3Bucket,
                B: { C: { D: asset.instance.ref.S3Key } },
              },
            },
          },
        },
      });
      stack.assets.push(asset);

      const ctx = new BuilderAssetContext();
      const builder = new ConvertToLegacyBuilder(stack, BuilderAssetContext);

      const template = builder.build({ Resources: {} }, ctx);

      assert.strictEqual(ctx.assets.length, 1);
      assert(ctx.assets[0] instanceof CompatibleAsset);

      const resolved = resolveAll(template);

      assert.deepStrictEqual(resolved, {
        Parameters: {
          MyAssetBucketName: { Type: "String" },
          MyAssetObjectKey: { Type: "String" },
        },
        Resources: {
          MyResource: {
            Type: "Custom::Thing",
            Properties: {
              A: { Ref: "MyAssetBucketName" },
              B: {
                C: {
                  D: { Ref: "MyAssetObjectKey" },
                },
              },
            },
          },
        },
      });
    });
  });
});
