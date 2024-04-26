import type { TemplateBuilder, TemplateExtension } from "../builder.js";
import { Fn, type IntrinsicValue } from "../intrinsics.js";
import type { ResourceDefinition, ResourceOptions } from "../template.js";

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

  public constructor(
    public readonly name: string,
    public readonly type: Type,
    public readonly properties: Props,
    public readonly options: ResourceOptions = {},
  ) {
    this.out = makeAttributeProxy(name);
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
          return Fn.getAtt(logicalResourceId, basePath);
        };
      }
      return makeAttributeProxy(
        logicalResourceId,
        basePath ? `${basePath}.${name}` : name,
      );
    },
  });
}
