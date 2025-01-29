import {
  addToTemplate,
  type TemplateComponent,
  type TemplateFragment,
} from "../builder.js";
import { ImportValue } from "../intrinsics.js";
import type { OutputDefinition } from "../template.js";

export type OutputInstance = {
  readonly localName: string;
  importValue: () => unknown;
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
export class Output implements TemplateComponent<OutputInstance> {
  public readonly definition: OutputDefinition;
  public readonly localName: string;

  public constructor(localName: string, definition: OutputDefinition) {
    this.definition = definition;
    this.localName = localName;
  }

  public onUse(fragment: TemplateFragment): OutputInstance {
    addToTemplate(
      fragment.template,
      "Outputs",
      this.localName,
      this.definition,
    );
    return this;
  }

  public importValue(): unknown {
    if (!this.definition.Export?.Name) {
      throw new Error(
        `the Output "${this.localName}" does not have an export name`,
      );
    }
    return ImportValue(this.definition.Export.Name);
  }
}
