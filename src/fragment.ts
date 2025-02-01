import {
  addToTemplate,
  mergeTemplates,
  type AssetGenerator,
  type TemplateComponent,
  type TemplateFragment,
} from "./builder.js";
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

export class Fragment implements TemplateFragment {
  public readonly assets: AssetGenerator[];
  public readonly template: Template;

  public constructor(fragment?: TemplateFragment) {
    this.assets = fragment?.assets ?? [];
    this.template = { Resources: {}, ...fragment?.template };
  }

  /**
   * Add the given fragment to this fragment.
   */
  public add<Output>(component: TemplateComponent<Output>): Output;
  public add(fragment: TemplateFragment | TemplateComponent): void;
  public add(element: TemplateFragment | TemplateComponent<unknown>): unknown {
    if ("build" in element) {
      return element.build(this);
    }
    if (element.assets) {
      this.assets.push(...element.assets);
    }
    if (element.template) {
      mergeTemplates(this.template, element.template);
    }
  }

  /**
   * Emit the assets and optionally the template, if a template file name is
   * provided.
   */
  public async *emit(
    options: FragmentEmitOptions = {},
  ): AsyncGenerator<AssetContent> {
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
