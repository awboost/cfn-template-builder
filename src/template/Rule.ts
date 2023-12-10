import { TemplateBuilder, TemplateExtension } from "../builder.js";
import { IntrinsicValue } from "../intrinsics.js";

/**
 * The optional `Rules` section validates a parameter or a combination of
 * parameters passed to a template during a stack creation or stack update. To
 * use template rules, explicitly declare `Rules` in your template followed by
 * an assertion. Use the rules section to validate parameter values before
 * creating or updating resources.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/rules-section-structure.html | Rules}
 */
export class Rule implements TemplateExtension {
  public readonly name: string;
  public readonly definition: IntrinsicValue;

  constructor(name: string, definition: IntrinsicValue) {
    this.definition = definition;
    this.name = name;
  }

  public onUse(builder: TemplateBuilder): void {
    builder.add("Rules", this.name, this.definition);
  }
}
