import assert from "node:assert";
import type { Readable } from "node:stream";
import { DuplicateElementError, UnresolvedValueError } from "./errors.js";
import { isJsonSerializable } from "./json.js";
import type {
  Template,
  TemplateSection,
  TemplateSectionType,
} from "./template.js";

/**
 * An object which can generate an asset file.
 */
export type AssetData = {
  fileName: string;
  content: Readable;
  integrity?: string;
};

/**
 * An object which can generate an asset file.
 */
export type AssetGenerator = {
  name: string;
  generate: () => PromiseLike<AssetData> | AssetData;
  resolveLocation: (s3Bucket: string, s3Key: string) => void;
};

/**
 * Represents an object which can build a CloudFormation template.
 */
export type TemplateFragment = {
  assets: AssetGenerator[];
  components: TemplateComponent[];
  template: Partial<Template>;

  /**
   * Convenience method which calls add on the component.
   */
  add: <Output>(component: TemplateComponent<Output>) => Output;
};

/**
 * Represents something which can be added to a template.
 */
export type TemplateComponent<Output = void> = {
  build?: (fragment: TemplateFragment) => void;
  addToTemplate: (fragment: TemplateFragment) => Output;
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

  public addToTemplate(fragment: TemplateFragment): void {
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

  public override addToTemplate(fragment: TemplateFragment): Output {
    super.addToTemplate(fragment);
    return this.#output;
  }
}

/**
 * A template element which can be resolved at some later point to its
 * serializable value.
 */
export class ResolvableElement<T> {
  #hasValue = false;
  #value: T | undefined;

  public constructor(
    public readonly name: string,
    defaultValue?: T,
  ) {
    if (defaultValue !== undefined) {
      this.#value = defaultValue;
      this.#hasValue = true;
    }
  }

  /**
   * Convenience method for type safety, just returns the instance with the
   * value type asserted. Obviously the type here is a lie until the element is
   * serialized.
   */
  public dereference(): T {
    return this as unknown as T;
  }

  /**
   * Hijack an existing object so that when it is serialized it will output the
   * resolved value of this instance.
   */
  public hijack(target: unknown, defaultToOriginal = false): void {
    assert(typeof target === "object" && target !== null);

    let originalToJSON: (() => unknown) | undefined;
    if (isJsonSerializable(target)) {
      originalToJSON = target.toJSON as () => unknown;
    }

    Object.defineProperty(target, "toJSON", {
      value: () => {
        if (defaultToOriginal && !this.#hasValue) {
          if (originalToJSON) {
            return originalToJSON.call(target);
          }
          return target;
        }
        return this.toJSON();
      },
    });
  }

  /**
   * Set the value for this instance.
   */
  public resolve(value: T): void {
    this.#value = value;
    this.#hasValue = true;
  }

  /**
   * Get the serializable output. Called automatically by
   * {@link JSON.stringify}. Throws {@link UnresolvedValueError} if no default
   * value was provided in the constructor and the {@link resolve} method has
   * not yet been called.
   */
  public toJSON(): unknown {
    if (!this.#hasValue) {
      throw new UnresolvedValueError(this.name);
    }
    // support chaining references
    let value: any = this.#value;
    while (value instanceof ResolvableElement) {
      value = value.toJSON();
    }
    return value;
  }
}
