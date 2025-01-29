import { Element } from "../builder.js";
import type { RuleDefinition } from "../template.js";

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
