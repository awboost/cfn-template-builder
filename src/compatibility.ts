import { createHash } from "crypto";
import { basename, extname } from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import type { TemplateBuilder, TemplateExtension } from "./builder.js";
import { lazy } from "./internal/lazy.js";
import { resolveReadable } from "./internal/resolve-stream.js";
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
  get<T>(ctor: ContextConstructor<T>): T;
};

type AssetOutput = {
  content: Readable;
  fileName: string;
};

type AssetDefinition = {
  generate(): PromiseLike<AssetOutput> | AssetOutput;
  name: string;
  parameters: AssetRef;
};

type AssetContext = {
  readonly assets: AssetDefinition[];
};

class AssetContextShim implements AssetContext {
  public static readonly ContextKey = "AssetContext";
  public readonly assets: AssetDefinition[] = [];
}

/**
 * Represents a collection of objects which can provide extra context during a
 * CloudFormation template build. For compatibility with deprecated
 * `@awboost/cfntemplate` module.
 */
class BuilderContextExtension
  implements BuilderContext, TemplateExtension<BuilderContext>
{
  public static readonly singleton = new SingletonExtension(
    () => new BuilderContextExtension(),
  );

  private readonly assetContextShim = new AssetContextShim();
  private assetContext: AssetContext | undefined;

  private constructor() {}

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
    if (!this.assetContext) {
      return;
    }
    for (const asset of this.assetContext.assets) {
      builder.use(new AssetConverter(asset));
    }
  }

  public onUse(): BuilderContextExtension {
    return this;
  }
}

/**
 * An object which can build one or more resources in a template. For
 * compatibility with deprecated `@awboost/cfntemplate` module.
 */
export type LegacyTemplateBuilder = {
  build(template: Template, ctx: BuilderContext): Template;
};

/**
 * A class for converting a {@link LegacyTemplateBuilder} from the deprecated
 * `@awboost/cfntemplate` module.
 */
export class BuilderConverter implements TemplateExtension {
  constructor(private readonly builder: LegacyTemplateBuilder) {}

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
  private readonly generateCached: () => PromiseLike<AssetOutput>;

  constructor(private readonly assetDef: AssetDefinition) {
    this.generateCached = lazy(() => Promise.resolve(assetDef.generate()));
  }

  public onUse(builder: TemplateBuilder): void {
    const getContent = (): Readable =>
      resolveReadable(this.generateCached().then((x) => x.content));

    this.asset = builder.use(
      new Asset(
        this.assetDef.name,
        async (): Promise<string> => {
          const def = await this.generateCached();
          const hash = createHash("sha1");
          await pipeline(getContent(), hash);

          const ext = extname(def.fileName);
          return basename(def.fileName, ext) + `.${hash.digest("hex")}` + ext;
        },
        getContent,
      ),
    );
  }

  public onTransform(template: Template): void {
    this.walk(template);
  }

  private walk(node: any, parentKey?: string, parent?: any): void {
    if (!this.asset) {
      throw new Error(`expected onUse to be called before onTransform`);
    }

    if (typeof node !== "object") {
      return;
    }

    if (parent && parentKey) {
      if (typeof node.toJSON === "function") {
        // intrinsic functions in legacy @awboost/cfntemplate module are class
        // instances with a toJSON method
        const json = node.toJSON();

        if (json["Ref"] === this.assetDef.parameters.S3Bucket) {
          parent[parentKey] = this.asset.ref.S3Bucket;
          return;
        } else if (json["Ref"] === this.assetDef.parameters.S3Key) {
          parent[parentKey] = this.asset.ref.S3Key;
          return;
        }
      }

      if (
        parentKey === this.assetDef.parameters.S3Bucket ||
        parentKey === this.assetDef.parameters.S3Key
      ) {
        // looks like we found the parameter definition, let's delete it
        if (node["Type"] === "String") {
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
