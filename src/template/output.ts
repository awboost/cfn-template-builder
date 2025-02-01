import { ComponentElement } from "../builder.js";
import { ImportValue } from "../intrinsics.js";
import type { OutputDefinition } from "../template.js";

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
