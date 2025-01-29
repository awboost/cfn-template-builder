import {
  addToTemplate,
  type AssetGenerator,
  type TemplateBuilder,
  type TemplateComponent,
} from "./builder.js";
import { BuildAlreadyCalledError, CallBuildFirstError } from "./errors.js";
import {
  TemplateSection,
  type MappingDefinition,
  type Template,
} from "./template.js";
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

export class Stack implements TemplateBuilder {
  private readonly components: TemplateComponent[] = [];
  private componentsSettled = Promise.resolve<any>(undefined);
  private buildCalled = false;

  public readonly assets: AssetGenerator[] = [];
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

  public async build(): Promise<void> {
    if (this.buildCalled) {
      throw new BuildAlreadyCalledError();
    }
    this.buildCalled = true;
    await this._waitForUseHooks();
    await this._runBuildHooks();
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
   * Make sure async `onUse` hooks are completed.
   * @private exposed for ease of testing
   */
  public async _waitForUseHooks(): Promise<void> {
    await this.componentsSettled;
  }
}
