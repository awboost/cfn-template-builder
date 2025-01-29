import {
  addToTemplate,
  type TemplateBuilder,
  type TemplateComponent,
} from "../builder.js";

/**
 * You can use the optional `Metadata` section to include arbitrary JSON or
 * YAML objects that provide details about the template.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html | Metadata}
 */
export class Metadata implements TemplateComponent {
  public readonly name: string;
  public readonly definition: unknown;

  public constructor(name: string, definition: unknown) {
    this.definition = definition;
    this.name = name;
  }

  public onUse(builder: TemplateBuilder): void {
    addToTemplate(builder.template, "Metadata", this.name, this.definition);
  }
}
