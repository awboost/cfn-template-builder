import { TemplateBuilder, TemplateExtension } from "../builder.js";
import { Fn, IntrinsicValue } from "../intrinsics.js";
import { ResourceDefinition, ResourceOptions } from "../template.js";

export type ResourceInstance<Attribs> = {
  readonly name: string;
  readonly out: Readonly<Attribs>;
  readonly ref: IntrinsicValue;
};

/**
 * The required `Resources` section declares the AWS resources that you want
 * to include in the stack, such as an Amazon EC2 instance or an Amazon S3
 * bucket.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html | Resources}
 */
export class Resource<Type extends string, Props, Attribs>
  implements TemplateExtension<ResourceInstance<Attribs>>
{
  public readonly out: Readonly<Attribs>;
  public readonly ref: IntrinsicValue;

  constructor(
    public readonly name: string,
    public readonly type: Type,
    public readonly properties: Props,
    public readonly attributeNames: readonly string[],
    public readonly options: ResourceOptions = {},
  ) {
    this.out = makeNestedResourceAttributes(name, attributeNames);
    this.ref = Fn.ref(name);
  }

  public onUse(builder: TemplateBuilder): ResourceInstance<Attribs> {
    builder.add("Resources", this.name, this.toJSON());
    return this;
  }

  public toJSON(): ResourceDefinition<Props, Type> {
    return {
      Type: this.type,
      Properties: this.properties,
      ...this.options,
    };
  }
}

/**
 * Make an attributes object containing `"Fn::GetAtt"` references for each
 * attribute.
 */
export function makeNestedResourceAttributes<T>(
  logicalResourceId: string,
  names: readonly string[],
): T {
  function toJSON(): void {
    throw new Error(
      `can't convert attributes object to JSON, access child properties instead`,
    );
  }
  const target = { toJSON } as any;

  for (const name of names) {
    const tokens = name.split(".");
    let obj = target;

    for (let i = 0; i < tokens.length - 1; ++i) {
      const tok = tokens[i]!;
      if (!(tok in obj)) {
        obj[tok] = {
          toJSON,
        };
      }
      obj = obj[tok];
    }
    Object.defineProperty(obj, tokens[tokens.length - 1]!, {
      get() {
        return Fn.getAtt(logicalResourceId, name);
      },
    });
  }
  return target;
}
