import { DuplicateElementError } from "./errors.js";
import type { Template, TemplateSection } from "./template.js";
import type { ContentLike } from "./template/asset-content.js";

/**
 * An object which can generate an asset file.
 */
export type AssetData = {
  fileName: string;
  content: ContentLike;
  integrity?: string;
};

/**
 * An object which can generate an asset file.
 */
export type AssetGenerator = {
  name: string;
  generate: () => PromiseLike<AssetData> | AssetData;
};

/**
 * Represents an object which can build a CloudFormation template.
 */
export type TemplateBuilder = {
  assets: AssetGenerator[];
  template: Partial<Template>;

  /**
   * Use the given component.
   */
  use: <Output>(component: TemplateComponent<Output>) => Output;
};

/**
 * Represents something which can be added to a template.
 */
export type TemplateComponent<Output = void> = {
  onBuild?: (builder: TemplateBuilder) => void;
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
