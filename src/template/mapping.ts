import {
  addToTemplate,
  type TemplateBuilder,
  type TemplateComponent,
} from "../builder.js";
import { FindInMap } from "../intrinsics.js";
import type { MappingDefinition } from "../template.js";

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
> implements
    TemplateComponent<MappingInstance<TopLevelKey, SecondLevelKey, Value>>
{
  public readonly name: string;
  public readonly definition: MappingDefinition<
    TopLevelKey,
    SecondLevelKey,
    Value
  >;

  public constructor(
    name: string,
    definition: MappingDefinition<TopLevelKey, SecondLevelKey, Value>,
  ) {
    this.name = name;
    this.definition = definition;
  }

  public onUse(
    builder: TemplateBuilder,
  ): MappingInstance<TopLevelKey, SecondLevelKey, Value> {
    addToTemplate(builder.template, "Mappings", this.name, this.definition);
    return this;
  }

  public findInMap(
    topLevelKey: TopLevelKey,
    secondLevelKey: SecondLevelKey,
  ): any {
    if (
      !(topLevelKey in this.definition) ||
      !(secondLevelKey in this.definition[topLevelKey])
    ) {
      throw new Error(
        `invalid mapping keys "${topLevelKey}", "${secondLevelKey}"`,
      );
    }
    return FindInMap(this.name, topLevelKey, secondLevelKey);
  }
}
