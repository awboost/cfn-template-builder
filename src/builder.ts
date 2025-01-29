import { Readable } from "node:stream";
import type { Template, TemplateSection } from "./template.js";

/**
 * Represents an object which can build a CloudFormation template using the
 * `add` function.
 */
export type TemplateSectionBuilder = {
  /**
   * Add the given element to the template. An exception will be thrown if an
   * element with the same name has already been added to the template.
   */
  add: <Section extends TemplateSection>(
    section: Section,
    name: string,
    value: Required<Template>[Section][string],
  ) => void;
};

/**
 * Represents an object which can build a CloudFormation template.
 */
export type TemplateBuilder = TemplateSectionBuilder & {
  /**
   * Use the given component.
   */
  use: <Output>(component: TemplateComponent<Output>) => Output;
};

/**
 * Represents a chunk of data.
 */
export type ContentLike = Readable | Buffer | string;

/**
 * Represents an asset in a deployment.
 */
export type AssetLike = {
  readonly content: ContentLike;
  readonly fileName: string;
  readonly integrity?: string;
};

/**
 * Represents an object which can output assets.
 */
export type AssetEmitter = {
  addAsset: (asset: AssetLike) => void;
};

/**
 * Represents something which can be added to a template.
 */
export type TemplateComponent<Output = void> = {
  onBuild?: (builder: TemplateBuilder) => void | PromiseLike<void>;
  onEmit?: (emitter: AssetEmitter) => void | PromiseLike<void>;
  onTransform?: (template: Template) => void | PromiseLike<void>;
  onUse?: (builder: TemplateBuilder) => Output;
};
