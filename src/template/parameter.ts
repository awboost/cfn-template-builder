import type { TemplateBuilder, TemplateComponent } from "../builder.js";
import { Ref } from "../intrinsics.js";
import type { ParameterType, ParameterTypeMap } from "../parameters.js";
import type { ParameterDefinition } from "../template.js";

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
export class Parameter<T extends ParameterType>
  implements TemplateComponent<ParameterInstance<T>>, ParameterInstance<T>
{
  public readonly definition: ParameterDefinition<T>;
  public readonly name: string;
  public readonly ref: any;

  public constructor(name: string, definition: T | ParameterDefinition<T>) {
    this.definition =
      typeof definition === "string" ? { Type: definition } : definition;
    this.name = name;
    this.ref = Ref(this.name);
  }

  public onUse(builder: TemplateBuilder): ParameterInstance<T> {
    builder.add("Parameters", this.name, this.definition);
    return this;
  }
}
