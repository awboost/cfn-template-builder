import { Readable } from "node:stream";
import { DuplicateElementError } from "./errors.js";
import type { Template, TemplateSection } from "./template.js";

/**
 * Represents an object which can build a CloudFormation template.
 */
export type TemplateBuilder = {
  template: Partial<Template>;

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

/**
 * Add the given element to the template. An exception will be thrown if an
 * element with the same name has already been added to the template.
 */
export function addToTemplate<Section extends TemplateSection>(
  template: Partial<Template>,
  section: Section,
  name: string,
  value: Required<Template>[Section][string],
): void {
  if (!(section in template)) {
    template[section] = {};
  }
  const map = template[section] as Required<Template>[Section];
  if (name in map) {
    throw new DuplicateElementError(section, name);
  }
  map[name] = value;
}

/**
 * Merges the given template fragments into the first template. An exception
 * will be thrown if an elements with the same names have already been added to
 * the template.
 */
export function mergeTemplates(
  target: Partial<Template>,
  ...fragments: Partial<Template>[]
): void {
  for (const fragment of fragments) {
    for (const [sectionName, section] of Object.entries(fragment)) {
      for (const [name, value] of Object.entries(section)) {
        addToTemplate(target, sectionName as TemplateSection, name, value);
      }
    }
  }
}
