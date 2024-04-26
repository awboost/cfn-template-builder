import assert from "node:assert";
import { Readable } from "node:stream";
import type { TemplateBuilder, TemplateExtension } from "./builder.js";
import { TemplateSection, type Template } from "./template.js";
import { Asset, type AssetInstance, type AssetRef } from "./template/asset.js";
import { SingletonExtension } from "./template/singleton.js";

/**
 * Represents a constructor for an object which can provide extra context during
 * a CloudFormation template build. For compatibility with deprecated
 * `@awboost/cfntemplate` module.
 */
type ContextConstructor<T> = {
  ContextKey: string;
  new (): T;
};

/**
 * Represents a collection of objects which can provide extra context during a
 * CloudFormation template build. For compatibility with deprecated
 * `@awboost/cfntemplate` module.
 */
type BuilderContext = {
  get: <T>(ctor: ContextConstructor<T>) => T;
};

type AssetOutput = {
  content: Readable;
  fileName: string;
};

type AssetDefinition = {
  generate: () => PromiseLike<AssetOutput> | AssetOutput;
  name: string;
  parameters: AssetRef;
};

type AssetContext = {
  readonly assets: AssetDefinition[];
};

export class AssetContextShim implements AssetContext {
  public static readonly ContextKey = "AssetContext";
  public readonly assets: AssetDefinition[] = [];
}

/**
 * Represents a collection of objects which can provide extra context during a
 * CloudFormation template build. For compatibility with deprecated
 * `@awboost/cfntemplate` module.
 */
export class BuilderContextExtension
  implements BuilderContext, TemplateExtension<BuilderContext>
{
  public static readonly singleton = new SingletonExtension(
    () => new BuilderContextExtension(),
  );

  private readonly assetContextShim = new AssetContextShim();
  private assetContext: AssetContext | undefined;

  public get(ctor: ContextConstructor<any>): any {
    if (ctor.ContextKey !== AssetContextShim.ContextKey) {
      throw new Error(`context type "${ctor.ContextKey}" not supported`);
    }
    if (this.assetContext) {
      return this.assetContext;
    }
    if (ctor === AssetContextShim) {
      return this.assetContextShim;
    }
    this.assetContext = new ctor() as AssetContext;
    return this.assetContext;
  }

  public onBuild(builder: TemplateBuilder): void {
    const ctx = this.assetContext ?? this.assetContextShim;

    for (const asset of ctx.assets) {
      builder.use(new AssetConverter(asset));
    }
  }

  public onUse(): this {
    return this;
  }
}

/**
 * An object which can build one or more resources in a template. For
 * compatibility with deprecated `@awboost/cfntemplate` module.
 */
export type LegacyTemplateBuilder = {
  build: (template: Template, ctx: BuilderContext) => Template;
};

/**
 * A class for converting a {@link LegacyTemplateBuilder} from the deprecated
 * `@awboost/cfntemplate` module.
 */
export class BuilderConverter implements TemplateExtension {
  public constructor(private readonly builder: LegacyTemplateBuilder) {}

  public onUse(builder: TemplateBuilder): void {
    // can't do this in onTransform because it needs to happen earlier in the pipeline
    const builderContext = builder.use(BuilderContextExtension.singleton);
    const template = this.builder.build({ Resources: {} }, builderContext);

    for (const key of Object.keys(TemplateSection) as TemplateSection[]) {
      const section = template[key];
      if (!section) {
        continue;
      }
      for (const [name, value] of Object.entries(section)) {
        builder.add(key, name, value);
      }
    }
  }
}

class AssetConverter implements TemplateExtension {
  private asset: AssetInstance | undefined;

  public constructor(private readonly assetDef: AssetDefinition) {}

  public onUse(builder: TemplateBuilder): void {
    this.asset = builder.use(
      new Asset(this.assetDef.name, () => this.assetDef.generate(), {
        // make the filenames match the legacy version
        integrity: { algorithms: ["sha1"] },
        hashLength: 40,
      }),
    );
  }

  public onTransform(template: Template): void {
    this.walk(template);
  }

  private walk(node: any, parentKey?: string, parent?: any): void {
    assert(this.asset, `expected onUse to be called before onTransform`);

    if (typeof node !== "object") {
      return;
    }

    if (parent && parentKey) {
      if (typeof node.toJSON === "function") {
        // intrinsic functions in legacy @awboost/cfntemplate module are class
        // instances with a toJSON method
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const json = node.toJSON();

        if (json.Ref === this.assetDef.parameters.S3Bucket) {
          parent[parentKey] = this.asset.ref.S3Bucket;
          return;
        } else if (json.Ref === this.assetDef.parameters.S3Key) {
          parent[parentKey] = this.asset.ref.S3Key;
          return;
        }
      }

      if (
        parentKey === this.assetDef.parameters.S3Bucket ||
        parentKey === this.assetDef.parameters.S3Key
      ) {
        // looks like we found the parameter definition, let's delete it
        if (node.Type === "String") {
          delete parent[parentKey];
          return;
        }
      }
    }

    for (const [key, value] of Object.entries(node)) {
      if (key) {
        this.walk(value, key, node);
      }
    }
  }
}
