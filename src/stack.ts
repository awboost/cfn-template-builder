import { Readable } from "node:stream";
import { AssetEmitter, TemplateBuilder, TemplateExtension } from "./builder.js";
import { Template, TemplateSection } from "./template.js";
import { ExtendedTemplateBuilder } from "./util/ExtendedTemplateBuilder.js";

export type StackBuildOptions = {
  templateFileName: string;
};

export class Stack implements TemplateBuilder {
  private readonly template: Template = { Resources: {} };
  private readonly builder = ExtendedTemplateBuilder.forTemplate(this.template);

  public add<Section extends TemplateSection>(
    section: Section,
    name: string,
    value: Required<Template>[Section][string],
  ): void {
    this.builder.add(section, name, value);
  }

  public async build(
    emitter: AssetEmitter,
    opts: StackBuildOptions,
  ): Promise<void> {
    const { templateFileName } = opts;

    await this.builder.waitForUseHooks();
    await this.builder.runBuildHooks();
    await this.builder.runEmitHooks(emitter);

    emitter.addAsset({
      createReadStream: () =>
        Readable.from(JSON.stringify(this.template, null, 2)),

      fileName: templateFileName,
    });
  }

  public use<Output>(extension: TemplateExtension<Output>): Output {
    return this.builder.use(extension);
  }
}
