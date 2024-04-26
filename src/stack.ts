import type {
  AssetEmitter,
  TemplateBuilder,
  TemplateExtension,
} from "./builder.js";
import { TemplateSection, type Template } from "./template.js";

export type StackBuildOptions = {
  templateFileName: string;
};

export class Stack implements TemplateBuilder {
  private readonly extensions: TemplateExtension[] = [];
  private extensionsSettled = Promise.resolve<any>(undefined);

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
   * Use the given extension against the template.
   */
  public use<Output>(extension: TemplateExtension<Output>): Output {
    let output!: Output;
    this.extensions.push(extension);

    if (extension.onUse) {
      output = extension.onUse(this);
      this.extensionsSettled = Promise.all([this.extensionsSettled, output]);
    }

    return output;
  }

  /**
   * For each extension, run the `onBuild` hook if present.
   * @private exposed for ease of testing
   */
  public async _runBuildHooks(): Promise<void> {
    // note that this.extensions might grow while we're iterating
    for (const extension of this.extensions) {
      await extension.onBuild?.(this);
    }
  }

  /**
   * For each extension, run the `onTransform` hook if present.
   * @private exposed for ease of testing
   */
  public async _runTransformHooks(): Promise<void> {
    for (const extension of this.extensions) {
      if (extension.onTransform) {
        await extension.onTransform(this.template);
      }
    }
  }

  /**
   * For each extension, run the `onEmit` hook if present.
   * @private exposed for ease of testing
   */
  public async _runEmitHooks(emitter: AssetEmitter): Promise<void> {
    for (const extension of this.extensions) {
      if (extension.onEmit) {
        await extension.onEmit(emitter);
      }
    }
  }

  /**
   * Make sure async `onUse` hooks are completed.
   * @private exposed for ease of testing
   */
  public async _waitForUseHooks(): Promise<void> {
    await this.extensionsSettled;
  }
}
