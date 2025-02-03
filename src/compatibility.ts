import assert from "node:assert";
import { Readable } from "node:stream";
import { Asset, type AssetReference } from "./asset.js";
import {
  mergeTemplates,
  Parameter,
  type DeploymentAsset,
  type TemplateBuilder,
  type TemplateComponent,
  type TemplateFragment,
} from "./builder.js";
import { streamLength } from "./internal/stream-length.js";
import { Ref } from "./intrinsics.js";
import { Stack } from "./stack.js";
import type { Template } from "./template.js";

/**
 * Contains types for compatibility with deprecated `@awboost/cfntemplate`
 * and `@awboost/cfnassets` modules.
 */
// Use a namespace to keep the compatibility types contained and make their use
// clear without having to add something into every type name.
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Compatibility {
  /**
   * Represents the AssetBase class in the old library.
   */
  export type AssetBase = AssetDefinition & {
    ref: AssetReference;
  };

  /**
   * A context for use with {@link BuilderContext} for associating assets with a
   * template.
   */
  export type AssetContext = {
    readonly assets: AssetDefinition[];
    addAsset: (name: string, definition: AssetDefinition) => boolean;
  };

  /**
   * A constructor for an instance of {@link AssetContent}.
   */
  export type AssetContextConstructor = ContextConstructor<AssetContext>;

  /**
   * An object which can generate an asset file for a deployment.
   */
  export type AssetDefinition = {
    generate: () => PromiseLike<AssetOutput> | AssetOutput;
    name: string;
    parameters: AssetReference;
  };

  /**
   * The output of {@link AssetDefinition.generate}.
   */
  export type AssetOutput = {
    content: Readable;
    fileName: string;
  };

  /**
   * A collection of objects which can provide extra context during a
   * CloudFormation template build.
   */
  export type BuilderContext = {
    get: <T>(ctor: ContextConstructor<T>) => T;
  };

  /**
   * A constructor for a {@link BuilderContext} item.
   */
  export type ContextConstructor<T> = {
    ContextKey: string;
    new (): T;
  };

  /**
   * An object which can build a {@link Template}.
   */
  export type TemplateBuilder = {
    build: (template: Template, ctx: BuilderContext) => Template;
  };
}

type AssetSource =
  | { type: "legacy"; definition: Compatibility.AssetDefinition }
  | { type: "modern"; definition: DeploymentAsset };

/**
 * An asset which is implements both {@link DeploymentAsset} and
 * {@link Compatibility.AssetDefinition}.
 */
export class CompatibleAsset
  extends Asset
  implements Compatibility.AssetDefinition
{
  /**
   * Wrap the asset definition with {@link CompatibleAsset}, if the definition
   * is not already an instance, otherwise returns the current instance.
   */
  public static fromLegacy(
    definition: Compatibility.AssetDefinition,
  ): CompatibleAsset {
    if (definition instanceof CompatibleAsset) {
      return definition;
    }
    return new CompatibleAsset({ type: "legacy", definition });
  }

  /**
   * Wrap the asset definition with {@link CompatibleAsset}, if the definition
   * is not already an instance, otherwise returns the current instance.
   */
  public static toLegacy(definition: DeploymentAsset): CompatibleAsset {
    if (definition instanceof CompatibleAsset) {
      return definition;
    }
    return new CompatibleAsset({ type: "modern", definition });
  }

  /**
   * The names of template parameters that describe where the asset is located
   * for a legacy deployment.
   */
  public readonly parameters: AssetReference;

  /**
   * Use {@link fromLegacy} and {@link toLegacy} instead of constructing
   * directly.
   */
  private constructor(source: AssetSource) {
    if (source.type === "legacy") {
      const definition = source.definition;

      // we need this as a separate closure from the generator function so we
      // can access `this`
      const getOutput = async () => {
        const output = await definition.generate();
        this.fileName = output.fileName;
        this.size = streamLength(output.content);
        return output.content;
      };

      super(
        definition.name,
        Readable.from(
          (async function* () {
            yield* await getOutput();
          })(),
        ),
      );

      this.parameters = definition.parameters;

      if (hasRefProperty(definition)) {
        // hijack the existing ref, but keep the the current value as the default
        this.hijackRef(definition.ref, true);
      }
    } else {
      const definition = source.definition;

      super(definition);

      this.parameters = {
        S3Bucket: `${definition.name}BucketName`,
        S3Key: `${definition.name}ObjectKey`,
      };

      // chain the resolution to this wrapper instance
      definition.resolveLocation(
        this.instance.ref.S3Bucket,
        this.instance.ref.S3Key,
      );
    }

    if (!hasRefProperty(source.definition)) {
      // set the default location to the legacy values, because the new build
      // process calls resolveLocation later with the correct values
      this.resolveLocation(
        Ref(this.parameters.S3Bucket) as string,
        Ref(this.parameters.S3Key) as string,
      );
    }
  }

  /**
   * Generate legacy asset output.
   */
  public generate(): Compatibility.AssetOutput {
    return {
      content: this.getReadable(),
      fileName: this.fileName,
    };
  }
}

/**
 * Used to build a {@link Compatibility.TemplateBuilder}.
 */
export class BuilderAssetContext
  implements Compatibility.BuilderContext, Compatibility.AssetContext
{
  public static readonly ContextKey = "AssetContext";

  public readonly assets: Compatibility.AssetDefinition[] = [];

  /**
   * Add an asset to the deployment.
   */
  public addAsset(
    name: string,
    definition: Compatibility.AssetDefinition,
  ): boolean {
    if (this.assets.some((x) => x.name === name)) {
      return false;
    }
    this.assets.push(definition);
    return true;
  }

  /**
   * Get the instance for the given context type.
   */
  public get(ctor: Compatibility.ContextConstructor<unknown>): any {
    // there was never any other value for this
    assert.strictEqual(ctor.ContextKey, "AssetContext");
    return this;
  }
}

/**
 * Converts a {@link Compatibility.TemplateBuilder} to a
 * {@link TemplateComponent}.
 */
export class ConvertFromLegacyBuilder implements TemplateComponent {
  readonly #builder: Compatibility.TemplateBuilder;

  public constructor(builder: Compatibility.TemplateBuilder) {
    this.#builder = builder;
  }

  public build(builder: TemplateBuilder): void {
    const ctx = new BuilderAssetContext();
    const template = this.#builder.build({ Resources: {} }, ctx);

    for (const definition of ctx.assets) {
      const asset = CompatibleAsset.fromLegacy(definition);
      builder.assets.push(asset);

      // delete the bucket parameters if they exist
      if (template.Parameters) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete template.Parameters[definition.parameters.S3Bucket];
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete template.Parameters[definition.parameters.S3Key];
      }
    }

    mergeTemplates(builder.template, template);
  }
}

/**
 * Converts a {@link TemplateComponent} to a
 * {@link Compatibility.TemplateBuilder}.
 */
export class ConvertToLegacyBuilder implements Compatibility.TemplateBuilder {
  readonly #assetContext: Compatibility.AssetContextConstructor;
  readonly #component: TemplateComponent | TemplateFragment;

  public constructor(
    component: TemplateComponent | TemplateFragment,
    assetContext: Compatibility.AssetContextConstructor,
  ) {
    this.#assetContext = assetContext;
    this.#component = component;
  }

  public build(
    template: Template,
    ctx: Compatibility.BuilderContext,
  ): Template {
    const stack = new Stack();
    mergeTemplates(stack.template, template);
    stack.add(this.#component);

    const assetContext = ctx.get(this.#assetContext);

    for (const asset of stack.assets) {
      const wrapped = CompatibleAsset.toLegacy(asset);
      assetContext.addAsset(asset.name, wrapped);

      stack.add(new Parameter(wrapped.parameters.S3Bucket, "String"));
      stack.add(new Parameter(wrapped.parameters.S3Key, "String"));
    }

    return stack.template;
  }
}

function hasRefProperty(value: object): value is { ref: AssetReference } {
  return (
    "ref" in value &&
    typeof value.ref === "object" &&
    value.ref !== null &&
    "S3Bucket" in value.ref &&
    "S3Key" in value.ref
  );
}
