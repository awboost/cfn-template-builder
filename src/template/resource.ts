import {
  addToTemplate,
  type TemplateComponent,
  type TemplateFragment,
} from "../builder.js";
import { GetAtt, Ref } from "../intrinsics.js";
import type { ResourceDefinition, ResourceOptions } from "../template.js";

export type ResourceInstance<Attribs> = {
  readonly name: string;
  readonly out: Readonly<Attribs>;
  readonly ref: string;
};

/**
 * The required `Resources` section declares the AWS resources that you want
 * to include in the stack, such as an Amazon EC2 instance or an Amazon S3
 * bucket.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html | Resources}
 */
export class Resource<Type extends string, Props, Attribs>
  implements TemplateComponent<ResourceInstance<Attribs>>
{
  public readonly out: Readonly<Attribs>;
  public readonly ref: string;

  public constructor(
    public readonly name: string,
    public readonly type: Type,
    public readonly properties: Props,
    public readonly options: ResourceOptions = {},
  ) {
    this.out = makeAttributeProxy(name);
    this.ref = Ref(name) as any;
  }

  public onUse(fragment: TemplateFragment): ResourceInstance<Attribs> {
    addToTemplate(fragment.template, "Resources", this.name, this.toJSON());
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
          return GetAtt(logicalResourceId, basePath);
        };
      }
      return makeAttributeProxy(
        logicalResourceId,
        basePath ? `${basePath}.${name}` : name,
      );
    },
  });
}
