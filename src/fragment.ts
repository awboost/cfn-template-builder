import {
  addToTemplate,
  mergeTemplates,
  type AssetGenerator,
  type TemplateComponent,
  type TemplateFragment,
} from "./builder.js";
import { BuildAlreadyCalledError, CallBuildFirstError } from "./errors.js";
import { FindInMap, Ref } from "./intrinsics.js";
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
 * Options for {@link Fragment.emit}.
 */
export type FragmentEmitOptions = {
  addHashToTemplateFileName?: boolean;
  hashAlgorithm?: string;
  hashLength?: number;
  templateFileName?: string;
};

export class Fragment implements TemplateFragment, TemplateComponent {
  #buildCalled = false;

  public readonly assets: AssetGenerator[] = [];
  public readonly components: TemplateComponent[] = [];
  public readonly template: Template;

  public constructor(template?: Template) {
    this.template = template ?? { Resources: {} };
  }

  /**
   * Use the given component against the template.
   */
  public add<Output>(component: TemplateComponent<Output>): Output {
    return component.addToTemplate(this);
  }

  /**
   * Add this fragment to another fragment.
   */
  public addToTemplate(fragment: TemplateFragment): void {
    if (this.#buildCalled) {
      throw new BuildAlreadyCalledError();
    }
    fragment.assets.push(...this.assets);
    fragment.components.push(...this.components);
    mergeTemplates(fragment.template, this.template);
  }

  /**
   * Run build for all registered components.
   */
  public build(): void {
    if (this.#buildCalled) {
      throw new BuildAlreadyCalledError();
    }
    this.#buildCalled = true;

    // note that this.components might grow while we're iterating
    for (const component of this.components) {
      component.build?.(this);
    }
  }

  /**
   * Emit the assets and optionally the template, if a template file name is
   * provided.
   */
  public async *emit(
    options: FragmentEmitOptions = {},
  ): AsyncGenerator<AssetContent> {
    if (!this.#buildCalled) {
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

        assetBuilder.resolveLocation(
          Ref(AssetBucketParameterName) as string,
          FindInMap(AssetMappingName, assetBuilder.name, "FileName") as string,
        );
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
   * Calls {@link emit} but buffers the assets into an array before returning.
   */
  public async emitArray(
    options: FragmentEmitOptions = {},
  ): Promise<AssetContent[]> {
    const assets: AssetContent[] = [];
    for await (const asset of this.emit(options)) {
      assets.push(asset);
    }
    return assets;
  }
}
