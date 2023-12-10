import {
  AssetEmitter,
  TemplateBuilder,
  TemplateExtension,
  TemplateExtensionWithOutput,
  TemplateSectionBuilder,
} from "../builder.js";
import { Template, TemplateSection } from "../template.js";
import { RawTemplateBuilder } from "./RawTemplateBuilder.js";

/**
 * Extends a {@link TemplateSectionBuilder} with a `use` method which allows the
 * use of {@link TemplateExtension} objects.
 */
export class ExtendedTemplateBuilder implements TemplateBuilder {
  public static forTemplate(template: Template): ExtendedTemplateBuilder {
    return new ExtendedTemplateBuilder(new RawTemplateBuilder(template));
  }

  private readonly extensions: TemplateExtension[] = [];
  private extensionsSettled = Promise.resolve<any>(undefined);

  constructor(public readonly builder: TemplateSectionBuilder) {}

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
    for (
      let extension = this.extensions.shift();
      extension;
      extension = this.extensions.shift()
    ) {
      if (extension.onBuild) {
        await extension.onBuild(this);
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
  public use<Output>(extension: TemplateExtensionWithOutput<Output>): Output;
  public use(extension: TemplateExtension): void;
  public use(extension: TemplateExtensionWithOutput<any>): any {
    let output: any;
    this.extensions.push(extension);

    if (extension.onUse) {
      output = extension.onUse(this);
      this.extensionsSettled = Promise.all([this.extensionsSettled, output]);
    }

    return output;
  }
}
