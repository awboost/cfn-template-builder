import type { TemplateBuilder, TemplateExtension } from "../builder.js";
import { Fn, type IntrinsicValue } from "../intrinsics.js";
import type { OutputDefinition } from "../template.js";

export type OutputInstance = {
  readonly localName: string;
  importValue: () => IntrinsicValue;
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
export class Output implements TemplateExtension<OutputInstance> {
  public readonly definition: OutputDefinition;
  public readonly localName: string;

  public constructor(localName: string, definition: OutputDefinition) {
    this.definition = definition;
    this.localName = localName;
  }

  public onUse(builder: TemplateBuilder): OutputInstance {
    builder.add("Outputs", this.localName, this.definition);
    return this;
  }

  public importValue(): IntrinsicValue {
    if (!this.definition.Export?.Name) {
      throw new Error(
        `the Output "${this.localName}" does not have an export name`,
      );
    }
    return Fn.importValue(this.definition.Export.Name);
  }
}
