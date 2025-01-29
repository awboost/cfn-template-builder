import type {
  AssetEmitter,
  TemplateBuilder,
  TemplateComponent,
} from "./builder.js";
import { TemplateSection, type Template } from "./template.js";

export type StackBuildOptions = {
  templateFileName: string;
};

export class Stack implements TemplateBuilder {
  private readonly components: TemplateComponent[] = [];
  private componentsSettled = Promise.resolve<any>(undefined);

  public readonly template: Template;

  public constructor(template?: Template) {
    this.template = template ?? { Resources: {} };
  }

  /**
   * Add a section to the template.
   */
  public add<Section extends TemplateSection>(
    section: Section,
    name: string,
    value: Required<Template>[Section][string],
  ): void {
    if (!(section in this.template)) {
      this.template[section] = {};
    }
    const map = this.template[section] as Required<Template>[Section];
    if (name in map) {
      throw new Error(`duplicate element in "${section}" section: "${name}"`);
    }
    map[name] = value;
  }

  public async build(
    emitter: AssetEmitter,
    opts: StackBuildOptions,
  ): Promise<void> {
    const { templateFileName } = opts;

    await this._waitForUseHooks();
    await this._runBuildHooks();
    await this._runTransformHooks();
    await this._runEmitHooks(emitter);

    emitter.addAsset({
      content: JSON.stringify(this.template, undefined, 2),
      fileName: templateFileName,
    });
  }

  /**
   * Use the given component against the template.
   */
  public use<Output>(component: TemplateComponent<Output>): Output {
    let output!: Output;
    this.components.push(component);

    if (component.onUse) {
      output = component.onUse(this);
      this.componentsSettled = Promise.all([this.componentsSettled, output]);
    }

    return output;
  }

  /**
   * For each component, run the `onBuild` hook if present.
   * @private exposed for ease of testing
   */
  public async _runBuildHooks(): Promise<void> {
    // note that this.components might grow while we're iterating
    for (const component of this.components) {
      await component.onBuild?.(this);
    }
  }

  /**
   * For each component, run the `onTransform` hook if present.
   * @private exposed for ease of testing
   */
  public async _runTransformHooks(): Promise<void> {
    for (const component of this.components) {
      if (component.onTransform) {
        await component.onTransform(this.template);
      }
    }
  }

  /**
   * For each component, run the `onEmit` hook if present.
   * @private exposed for ease of testing
   */
  public async _runEmitHooks(emitter: AssetEmitter): Promise<void> {
    for (const component of this.components) {
      if (component.onEmit) {
        await component.onEmit(emitter);
      }
    }
  }

  /**
   * Make sure async `onUse` hooks are completed.
   * @private exposed for ease of testing
   */
  public async _waitForUseHooks(): Promise<void> {
    await this.componentsSettled;
  }
}
