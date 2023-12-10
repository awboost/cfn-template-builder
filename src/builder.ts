import { Readable } from "node:stream";
import { Template, TemplateSection } from "./template.js";

/**
 * Represents an object which can build a CloudFormation template.
 */
export type TemplateBuilder = {
  /**
   * Get the template associated with this builder.
   */
  get template(): Template;

  /**
   * Add the given element to the template. An exception will be thrown if an
   * element with the same name has already been added to the template.
   */
  add<Section extends TemplateSection>(
    section: Section,
    name: string,
    value: Required<Template>[Section][string],
  ): void;

  /**
   * Use the given extension.
   */
  use<Output>(extension: TemplateExtensionWithOutput<Output>): Output;
  use(extension: TemplateExtension): void;

  /**
   * Use the given extension, up to once per template. Subsequent uses will have
   * no effect.
   */
  useOnce<Extension extends TemplateExtension>(
    constructor: TemplateExtensionConstructor<Extension>,
  ): Extension;
};

/**
 * Represents the constructor of a {@link TemplateExtension}.
 */
export type TemplateExtensionConstructor<T extends TemplateExtension> = {
  readonly extensionKey: any;
  new (): T;
};

/**
 * Represents an asset in a deployment.
 */
export type AssetLike = {
  readonly fileName: string;
  createReadStream(): Readable;
};

/**
 * Represents an object which can output assets.
 */
export type AssetEmitter = {
  addAsset(asset: AssetLike): void;
};

/**
 * Represents something which can be added to a template.
 */
export type TemplateExtension = {
  onBuild?(builder: TemplateBuilder): void | PromiseLike<void>;
  onEmit?(emitter: AssetEmitter): void | PromiseLike<void>;
  onUse?(builder: TemplateBuilder): void;
};

/**
 * Represents something which can be added to a template.
 */
export type TemplateExtensionWithOutput<Output> = {
  onBuild?(builder: TemplateBuilder): void | PromiseLike<void>;
  onEmit?(emitter: AssetEmitter): void | PromiseLike<void>;
  onUse(builder: TemplateBuilder): Output;
};
