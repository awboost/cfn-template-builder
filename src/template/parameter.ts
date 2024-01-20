import { TemplateBuilder, TemplateExtension } from "../builder.js";
import { Fn, IntrinsicValue } from "../intrinsics.js";
import { ParameterDefinition } from "../template.js";

export type ParameterInstance = {
  readonly name: string;
  readonly ref: IntrinsicValue;
};

/**
 * Use the optional `Parameters` section to customize your templates.
 * Parameters enable you to input custom values to your template each time you
 * create or update a stack.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html | Parameters}
 */
export class Parameter
  implements TemplateExtension<ParameterInstance>, ParameterInstance
{
  public readonly definition: ParameterDefinition;
  public readonly name: string;
  public readonly ref: IntrinsicValue;

  constructor(name: string, definition: string | ParameterDefinition) {
    this.definition =
      typeof definition === "string" ? { Type: definition } : definition;
    this.name = name;
    this.ref = Fn.ref(this.name);
  }

  public onUse(builder: TemplateBuilder): ParameterInstance {
    builder.add("Parameters", this.name, this.definition);
    return this;
  }
}
