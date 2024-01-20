import { TemplateBuilder, TemplateExtension } from "../builder.js";

/**
 * You can use the optional `Metadata` section to include arbitrary JSON or
 * YAML objects that provide details about the template.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html | Metadata}
 */
export class Metadata implements TemplateExtension {
  public readonly name: string;
  public readonly definition: any;

  constructor(name: string, definition: any) {
    this.definition = definition;
    this.name = name;
  }

  public onUse(builder: TemplateBuilder): void {
    builder.add("Metadata", this.name, this.definition);
  }
}
