import type { TemplateComponent, TemplateFragment } from "../builder.js";

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
    TemplateFragment,
    Output | typeof nothing
  >();

  public constructor(
    private readonly factory: () => TemplateComponent<Output>,
  ) {}

  public onUse(fragment: TemplateFragment): Output {
    let instance = this.instances.get(fragment);
    if (instance) {
      return instance === nothing ? (undefined as Output) : instance;
    }
    instance = fragment.use(this.factory());
    this.instances.set(fragment, instance ?? nothing);
    return instance;
  }
}
