import assert from "node:assert";
import type { Readable } from "node:stream";
import { DuplicateElementError, UnresolvedValueError } from "./errors.js";
import type { IntrinsicCondition } from "./intrinsics-base.js";
import {
  Condition as ConditionRef,
  FindInMap,
  GetAtt,
  ImportValue,
  Ref,
} from "./intrinsics.js";
import { isJsonSerializable } from "./json.js";
import type {
  MappingDefinition,
  OutputDefinition,
  ParameterDefinition,
  ParameterType,
  ParameterTypeMap,
  ResourceOptions,
  RuleDefinition,
  Template,
  TemplateSection,
  TemplateSectionType,
} from "./template.js";

/**
 * An asset which can be added to a template.
 */
export type DeploymentAsset = {
  content: string | Buffer | Readable;
  fileName: string;
  name: string;
  size?: number;
  resolveLocation: (s3Bucket: string, s3Key: string) => void;
};

/**
 * A piece of a deployment template.
 */
export type TemplateFragment = {
  assets?: DeploymentAsset[];
  template?: Partial<Template>;
};

/**
 * A component which can be added to a template.
 */
export type TemplateComponent<Output = void> = {
  build: (builder: TemplateBuilder) => Output;
};

/**
 * A helper object for building a template.
 */
export type TemplateBuilder = {
  assets: DeploymentAsset[];
  template: Template;
  add: (<Output>(component: TemplateComponent<Output>) => Output) &
    ((fragment: TemplateFragment) => void);
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
  implements TemplateFragment
{
  public readonly template: Partial<Template>;

  public constructor(
    section: Section,
    name: string,
    definition: TemplateSectionType<Section>,
  ) {
    this.template = {
      [section]: {
        [name]: definition,
      },
    };
  }
}

/**
 * An element which can be added to a template and has an output value.
 */
export class ComponentElement<Section extends TemplateSection, Output>
  implements TemplateComponent<Output>
{
  readonly #fragment: TemplateFragment;
  readonly #output: Output;

  public constructor(
    section: Section,
    name: string,
    definition: TemplateSectionType<Section>,
    output: Output,
  ) {
    this.#fragment = new Element(section, name, definition);
    this.#output = output;
  }

  public build(builder: TemplateBuilder): Output {
    builder.add(this.#fragment);
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

/**
 * An instance of a {@link Condition} component.
 */
export type ConditionInstance = {
  readonly name: string;
  readonly ref: IntrinsicCondition;
};

/**
 * The optional Conditions section contains statements that define the
 * circumstances under which entities are created or configured. For example,
 * you can create a condition and then associate it with a resource or output
 * so that AWS CloudFormation only creates the resource or output if the
 * condition is true. Similarly, you can associate the condition with a
 * property so that AWS CloudFormation only sets the property to a specific
 * value if the condition is true. If the condition is false, AWS
 * CloudFormation sets the property to a different value that you specify.
 *
 * You might use conditions when you want to reuse a template that can create
 * resources in different contexts, such as a test environment versus a
 * production environment. In your template, you can add an EnvironmentType
 * input parameter, which accepts either prod or test as inputs. For the
 * production environment, you might include Amazon EC2 instances with certain
 * capabilities; however, for the test environment, you want to use reduced
 * capabilities to save money. With conditions, you can define which resources
 * are created and how they're configured for each environment type.
 *
 * Conditions are evaluated based on predefined pseudo parameters or input
 * parameter values that you specify when you create or update a stack. Within
 * each condition, you can reference another condition, a parameter value, or
 * a mapping. After you define all your conditions, you can associate them
 * with resources and resource properties in the Resources and Outputs
 * sections of a template.
 *
 * At stack creation or stack update, AWS CloudFormation evaluates all the
 * conditions in your template before creating any resources. Resources that
 * are associated with a true condition are created. Resources that are
 * associated with a false condition are ignored. AWS CloudFormation also
 * re-evaluates these conditions at each stack update before updating any
 * resources. Resources that are still associated with a true condition are
 * updated. Resources that are now associated with a false condition are
 * deleted.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/conditions-section-structure.html | Conditions}
 */
export class Condition extends ComponentElement<
  "Conditions",
  ConditionInstance
> {
  public constructor(name: string, definition: IntrinsicCondition) {
    super("Conditions", name, definition, {
      name,
      ref: ConditionRef(name),
    });
  }
}

/**
 * An instance of a {@link Mapping} component.
 */
export type MappingInstance<
  TopLevelKey extends string,
  SecondLevelKey extends string,
  Value,
> = {
  readonly name: string;
  /**
   * The intrinsic function Fn::FindInMap returns the value corresponding to
   * keys in a two-level map that's declared in the Mappings section.
   * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-findinmap.html}
   */
  findInMap: (
    topLevelKey: TopLevelKey,
    secondLevelKey: SecondLevelKey,
  ) => Value;
};

/**
 * The optional `Mappings` section matches a key to a corresponding set of
 * named values. For example, if you want to set values based on a region, you
 * can create a mapping that uses the region name as a key and contains the
 * values you want to specify for each specific region. You use the
 * `Fn::FindInMap` intrinsic function to retrieve values in a map.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/mappings-section-structure.html | Mappings}
 */
export class Mapping<
  TopLevelKey extends string,
  SecondLevelKey extends string,
  Value,
> extends ComponentElement<
  "Mappings",
  MappingInstance<TopLevelKey, SecondLevelKey, Value>
> {
  public constructor(
    name: string,
    definition: MappingDefinition<TopLevelKey, SecondLevelKey, Value>,
  ) {
    super("Mappings", name, definition, {
      findInMap: (topLevelKey, secondLevelKey) =>
        FindInMap(name, topLevelKey, secondLevelKey) as Value,
      name,
    });
  }
}

/**
 * You can use the optional `Metadata` section to include arbitrary JSON or
 * YAML objects that provide details about the template.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html | Metadata}
 */
export class Metadata extends Element<"Metadata"> {
  public constructor(name: string, definition: unknown) {
    super("Metadata", name, definition);
  }
}

/**
 * An instance of the {@link Output} component.
 */
export type OutputInstance<Value = unknown> = {
  readonly name: string;
  importValue: () => Value;
};

/**
 * The optional `Outputs` section declares output values that you can import
 * into other stacks (to create cross-stack references), return in response
 * (to describe stack calls), or view on the AWS CloudFormation console. For
 * example, you can output the S3 bucket name for a stack to make the bucket
 * easier to find.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html | Outputs}
 */
export class Output<Value = unknown> extends ComponentElement<
  "Outputs",
  OutputInstance<Value>
> {
  public constructor(name: string, definition: OutputDefinition) {
    super("Outputs", name, definition, {
      name,

      importValue: () => {
        if (!definition.Export?.Name) {
          throw new Error(`the Output "${name}" does not have an export name`);
        }
        return ImportValue(definition.Export.Name) as Value;
      },
    });
  }
}

/**
 * An instance of the {@link Parameter} component.
 */
export type ParameterInstance<T extends ParameterType> = {
  readonly name: string;
  readonly ref: ParameterTypeMap[T];
};

/**
 * Use the optional `Parameters` section to customize your templates.
 * Parameters enable you to input custom values to your template each time you
 * create or update a stack.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html | Parameters}
 */
export class Parameter<T extends ParameterType> extends ComponentElement<
  "Parameters",
  ParameterInstance<T>
> {
  public constructor(name: string, definition: T | ParameterDefinition<T>) {
    super(
      "Parameters",
      name,
      typeof definition === "string" ? { Type: definition } : definition,
      {
        name,
        ref: Ref(name) as ParameterTypeMap[T],
      },
    );
  }
}

/**
 * An instance for the {@link Resource} component.
 */
export type ResourceInstance<Attribs> = {
  readonly name: string;
  readonly out: Readonly<Attribs>;
  readonly ref: string;
};

/**
 * The required `Resources` section declares the AWS resources that you want
 * to include in the stack, such as an Amazon EC2 instance or an Amazon S3
 * bucket.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html | Resources}
 */
export class Resource<
  Type extends string,
  Props,
  Attribs,
> extends ComponentElement<"Resources", ResourceInstance<Attribs>> {
  public constructor(
    name: string,
    type: Type,
    properties: Props,
    options: ResourceOptions = {},
  ) {
    super(
      "Resources",
      name,
      {
        Type: type,
        Properties: properties,
        ...options,
      },
      {
        name,
        ref: Ref(name) as string,
        out: makeAttributeProxy(name),
      },
    );
  }
}

/**
 * The optional `Rules` section validates a parameter or a combination of
 * parameters passed to a template during a stack creation or stack update. To
 * use template rules, explicitly declare `Rules` in your template followed by
 * an assertion. Use the rules section to validate parameter values before
 * creating or updating resources.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/rules-section-structure.html | Rules}
 */
export class Rule extends Element<"Rules"> {
  public constructor(name: string, definition: RuleDefinition) {
    super("Rules", name, definition);
  }
}

export function makeAttributeProxy(
  logicalResourceId: string,
  basePath?: string,
): any {
  return new Proxy(Object.create(null), {
    get: (target, name) => {
      // symbol properties might be used internally and shouldn't be intercepted
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols
      /* c8 ignore start */
      if (typeof name === "symbol") {
        return target[name];
      }
      /* c8 ignore stop */

      if (name === "toJSON") {
        if (!basePath) {
          throw new Error(
            `the whole attributes object cannot be serialized directly`,
          );
        }
        return function () {
          return GetAtt(logicalResourceId, basePath);
        };
      }
      return makeAttributeProxy(
        logicalResourceId,
        basePath ? `${basePath}.${name}` : name,
      );
    },
  });
}
