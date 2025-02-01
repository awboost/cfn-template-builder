import assert from "node:assert";
import { text } from "node:stream/consumers";
import { describe, it, mock } from "node:test";
import { addToTemplate, type TemplateComponent } from "./builder.js";
import {
  BuilderAssetContext,
  CompatibleAsset,
  ConvertFromLegacyBuilder,
  ConvertToLegacyBuilder,
  type Compatibility,
} from "./compatibility.js";
import { Fragment } from "./fragment.js";
import type { Template } from "./template.js";
import { Asset } from "./template/asset.js";
import { Fixtures } from "./test/fixtures/fixtures.js";
import { resolveAll } from "./test/util.js";

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

      const fragment = new Fragment(input);
      fragment.add(new ConvertFromLegacyBuilder(builder));
      fragment.build();

      assert.strictEqual(build.mock.callCount(), 1);
      assert.deepStrictEqual(fragment.template, {
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

      const fragment = new Fragment();
      fragment.add(new ConvertFromLegacyBuilder(builder));
      fragment.build();

      const assets = await fragment.emitArray();

      assert.strictEqual(assets.length, 1);

      assert.strictEqual(
        await text(assets[0]!.content),
        await Fixtures.hello.text(),
      );

      assert.strictEqual(
        assets[0]!.fileName,
        await Fixtures.hello.fileNameWithHash(),
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

      const fragment = new Fragment();
      fragment.add(new ConvertFromLegacyBuilder(builder));
      fragment.build();
      // assets only get resolved on emit
      await fragment.emitArray();

      assert.deepStrictEqual(resolveAll(fragment.template), {
        Parameters: {
          AssetBucketName: {
            Description: "S3 bucket name for the location of the assets",
            Type: "String",
          },
          Other: { Type: "String" },
        },
        Mappings: {
          AssetManifest: {
            MyAsset: {
              FileName: await Fixtures.hello.fileNameWithHash(),
              Integrity: await Fixtures.hello.integrity(),
            },
          },
        },
        Resources: {
          MyResource: {
            Type: "Custom::Thing",
            Properties: {
              A: { Ref: "AssetBucketName" },
              B: {
                C: {
                  D: {
                    "Fn::FindInMap": ["AssetManifest", "MyAsset", "FileName"],
                  },
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
        addToTemplate: (fragment) => {
          addToTemplate(fragment.template, "Resources", "Resource2", {
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

    it("adds the assets", async () => {
      const asset = new Asset("MyAsset", () => Fixtures.hello.generate());

      const fragment = new Fragment({
        Resources: {
          MyResource: {
            Type: "Custom::Thing",
            Properties: {
              A: asset.instance.ref.S3Bucket,
              B: { C: { D: asset.instance.ref.S3Key } },
            },
          },
        },
      });
      fragment.assets.push(asset);

      const ctx = new BuilderAssetContext();
      const builder = new ConvertToLegacyBuilder(fragment, BuilderAssetContext);

      builder.build({ Resources: {} }, ctx);

      assert.strictEqual(ctx.assets.length, 1);
      const assetOutput = await ctx.assets[0]!.generate();

      assert.strictEqual(
        await text(assetOutput.content),
        await Fixtures.hello.text(),
      );

      assert.strictEqual(assetOutput.fileName, Fixtures.hello.fileName);
    });

    it("converts the references and adds the asset parameters", async () => {
      const asset = new Asset("MyAsset", () => Fixtures.hello.generate());

      const fragment = new Fragment({
        Resources: {
          MyResource: {
            Type: "Custom::Thing",
            Properties: {
              A: asset.instance.ref.S3Bucket,
              B: { C: { D: asset.instance.ref.S3Key } },
            },
          },
        },
      });
      fragment.assets.push(asset);

      const ctx = new BuilderAssetContext();
      const builder = new ConvertToLegacyBuilder(fragment, BuilderAssetContext);

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
