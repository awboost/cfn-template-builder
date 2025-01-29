import {
  addToTemplate,
  type AssetGenerator,
  type TemplateComponent,
  type TemplateFragment,
} from "./builder.js";
import { BuildAlreadyCalledError, CallBuildFirstError } from "./errors.js";
import type { MappingDefinition, Template } from "./template.js";
import {
  getAssetContent,
  type AssetContent,
} from "./template/asset-content.js";
import {
  AssetBucketParameterName,
  AssetMappingName,
  type AssetMappingKey,
} from "./template/asset.js";

/**
 * Options for {@link Stack.emit}.
 */
export type StackEmitOptions = {
  addHashToTemplateFileName?: boolean;
  hashAlgorithm?: string;
  hashLength?: number;
  templateFileName?: string;
};

export class Stack implements TemplateFragment {
  private readonly components: TemplateComponent[] = [];
  private buildCalled = false;

  public readonly assets: AssetGenerator[] = [];
  public readonly template: Template;

  public constructor(template?: Template) {
    this.template = template ?? { Resources: {} };
  }

  public build(): void {
    if (this.buildCalled) {
      throw new BuildAlreadyCalledError();
    }
    this.buildCalled = true;

    // note that this.components might grow while we're iterating
    for (const component of this.components) {
      component.onBuild?.(this);
    }
  }

  /**
   * Emit the assets and optionally the template, if a template file name is
   * provided.
   */
  public async *emit(
    options: StackEmitOptions = {},
  ): AsyncGenerator<AssetContent> {
    if (!this.buildCalled) {
      throw new CallBuildFirstError();
    }
    const {
      addHashToTemplateFileName,
      hashAlgorithm,
      hashLength,
      templateFileName,
    } = options;
    const mapping: MappingDefinition<string, AssetMappingKey> = {};

    const integrityOptions = hashAlgorithm
      ? { algorithms: [hashAlgorithm] }
      : undefined;

    if (this.assets.length > 0) {
      for (const assetBuilder of this.assets) {
        const output = await getAssetContent(await assetBuilder.generate(), {
          addHashToFileName: hashLength ?? true,
          integrity: integrityOptions,
        });

        mapping[assetBuilder.name] = {
          FileName: output.fileName,
          Integrity: output.integrity,
        };

        yield output;
      }

      addToTemplate(this.template, "Mappings", AssetMappingName, mapping);

      addToTemplate(this.template, "Parameters", AssetBucketParameterName, {
        Description: "S3 bucket name for the location of the assets",
        Type: "String",
      });
    }

    if (templateFileName) {
      yield await getAssetContent(
        {
          content: JSON.stringify(this.template),
          fileName: templateFileName,
        },
        {
          addHashToFileName: addHashToTemplateFileName
            ? hashLength ?? true
            : false,
          integrity: integrityOptions,
        },
      );
    }
  }

  /**
   * Use the given component against the template.
   */
  public use<Output>(component: TemplateComponent<Output>): Output {
    let output!: Output;
    this.components.push(component);

    if (component.onUse) {
      output = component.onUse(this);
    }

    return output;
  }
}
