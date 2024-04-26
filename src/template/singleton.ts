import type { TemplateBuilder, TemplateExtension } from "../builder.js";

const nothing = Symbol();

/**
 * Create an extension which can only be used once per template.
 */
export class SingletonExtension<Output> {
  /**
   * Create an extension whose only purpose is to create and return a
   * {@link TemplateExtension} object.
   */
  public static registry<Extension extends TemplateExtension>(
    factory: () => Extension,
  ): TemplateExtension<Extension> {
    return new SingletonExtension(() => {
      const instance = factory();
      return {
        onUse: (builder) => {
          builder.use(instance);
          return instance;
        },
      };
    });
  }

  private readonly instances = new WeakMap<
    TemplateBuilder,
    Output | typeof nothing
  >();

  public constructor(
    private readonly factory: () => TemplateExtension<Output>,
  ) {}

  public onUse(builder: TemplateBuilder): Output {
    let instance = this.instances.get(builder);
    if (instance) {
      return instance === nothing ? (undefined as Output) : instance;
    }
    instance = builder.use(this.factory());
    this.instances.set(builder, instance ?? nothing);
    return instance;
  }
}
