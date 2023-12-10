import { Readable } from "node:stream";
import {
  AssetEmitter,
  TemplateBuilder,
  TemplateExtension,
  TemplateExtensionConstructor,
  TemplateExtensionWithOutput,
} from "./builder.js";
import { Template, TemplateSection, addToTemplate } from "./template.js";

export type StackBuildOptions = {
  templateFileName: string;
};

export class Stack implements TemplateBuilder {
  private readonly extensions: TemplateExtension[] = [];
  private extensionsSettled = Promise.resolve<any>(undefined);
  private readonly registeredExtensions = new Map<any, TemplateExtension>();

  public readonly template: Template;

  constructor() {
    this.template = { Resources: {} };
  }

  public add<Section extends TemplateSection>(
    section: Section,
    name: string,
    value: Required<Template>[Section][string],
  ): void {
    addToTemplate(this.template, section, name, value);
  }

  public async build(
    emitter: AssetEmitter,
    opts: StackBuildOptions,
  ): Promise<void> {
    const { templateFileName } = opts;
    await this.extensionsSettled;

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
    for (const extension of this.extensions) {
      if (extension.onEmit) {
        await extension.onEmit(emitter);
      }
    }
    emitter.addAsset({
      createReadStream: () =>
        Readable.from([JSON.stringify(this.template, null, 2)]),

      fileName: templateFileName,
    });
  }

  public use<Output>(extension: TemplateExtensionWithOutput<Output>): Output;
  public use(extension: TemplateExtension): void;
  public use(extension: TemplateExtensionWithOutput<any>): any {
    this.extensions.push(extension);

    if (extension.onUse) {
      this.extensionsSettled = Promise.all([
        this.extensionsSettled,
        extension.onUse(this),
      ]);
    }

    return extension;
  }

  public useOnce<Extension extends TemplateExtension>(
    constructor: TemplateExtensionConstructor<Extension>,
  ): Extension;
  public useOnce(constructor: TemplateExtensionConstructor<any>): any {
    const existing = this.registeredExtensions.get(constructor.extensionKey);
    if (existing) {
      return existing;
    }
    const instance = new constructor();
    this.registeredExtensions.set(constructor.extensionKey, instance);
    return this.use(instance);
  }
}
