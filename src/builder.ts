import { DuplicateElementError } from "./errors.js";
import type {
  Template,
  TemplateSection,
  TemplateSectionType,
} from "./template.js";
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
export type TemplateFragment = {
  assets: AssetGenerator[];
  template: Partial<Template>;
  use: <Output>(component: TemplateComponent<Output>) => Output;
};

/**
 * Represents something which can be added to a template.
 */
export type TemplateComponent<Output = void> = {
  onBuild?: (fragment: TemplateFragment) => void;
  onUse?: (fragment: TemplateFragment) => Output;
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

/**
 * An element which can be added to a template.
 */
export class Element<Section extends TemplateSection>
  implements TemplateComponent
{
  public constructor(
    public readonly section: Section,
    public readonly name: string,
    public readonly definition: TemplateSectionType<Section>,
  ) {}

  public onUse(fragment: TemplateFragment): void {
    addToTemplate(fragment.template, this.section, this.name, this.definition);
  }

  public toJSON(): unknown {
    return this.definition;
  }
}

/**
 * An element which can be added to a template and has an output value.
 */
export class RefElement<
  Section extends TemplateSection,
  Output,
> extends Element<Section> {
  readonly #output: Output;

  public constructor(
    section: Section,
    name: string,
    definition: TemplateSectionType<Section>,
    output: Output,
  ) {
    super(section, name, definition);
    this.#output = output;
  }

  public override onUse(fragment: TemplateFragment): Output {
    super.onUse(fragment);
    return this.#output;
  }
}
