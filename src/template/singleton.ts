import type { TemplateBuilder, TemplateComponent } from "../builder.js";

const nothing = Symbol();

/**
 * Create an component which can only be used once per template.
 */
export class SingletonComponent<Output> {
  /**
   * Create an component whose only purpose is to create and return a
   * {@link TemplateComponent} object.
   */
  public static registry<Component extends TemplateComponent>(
    factory: () => Component,
  ): TemplateComponent<Component> {
    return new SingletonComponent(() => {
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
    private readonly factory: () => TemplateComponent<Output>,
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
