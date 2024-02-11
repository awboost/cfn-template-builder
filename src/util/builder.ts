import {
  AssetEmitter,
  TemplateBuilder,
  TemplateExtension,
  TemplateSectionBuilder,
} from "../builder.js";
import { Template, TemplateSection } from "../template.js";

export class RawTemplateBuilder implements TemplateSectionBuilder {
  constructor(public template: Template) {}

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
}

/**
 * Extends a {@link TemplateSectionBuilder} with a `use` method which allows the
 * use of {@link TemplateExtension} objects.
 */
export class ExtendedTemplateBuilder implements TemplateBuilder {
  private readonly builder: TemplateSectionBuilder;
  private readonly extensions: TemplateExtension[] = [];
  private extensionsSettled = Promise.resolve<any>(undefined);

  public readonly template: Template;

  constructor(
    template: Template = { Resources: {} },
    builder: TemplateSectionBuilder = new RawTemplateBuilder(template),
  ) {
    this.template = template;
    this.builder = builder;
  }

  /**
   * Add a section to the template.
   */
  public add<Section extends TemplateSection>(
    section: Section,
    name: string,
    value: Required<Template>[Section][string],
  ): void {
    this.builder.add(section, name, value);
  }

  public async runBuildHooks(): Promise<void> {
    // keep running through the loop until callbacks have stopped adding more
    // extensions and we have processed all remaining extensions
    for (let i = 0; i < this.extensions.length; ++i) {
      const extension = this.extensions[i];
      if (extension?.onBuild) {
        await extension.onBuild(this);
      }
    }
  }

  public async runTransformHooks(): Promise<void> {
    for (const extension of this.extensions) {
      if (extension.onTransform) {
        await extension.onTransform(this.template);
      }
    }
  }

  /**
   * For each extension, run the `onEmit` hook if present.
   */
  public async runEmitHooks(emitter: AssetEmitter): Promise<void> {
    for (const extension of this.extensions) {
      if (extension.onEmit) {
        await extension.onEmit(emitter);
      }
    }
  }

  /**
   * Make sure async `onUse` hooks are completed.
   */
  public async waitForUseHooks(): Promise<void> {
    await this.extensionsSettled;
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
}
