import { Element } from "../builder.js";

/**
 * You can use the optional `Metadata` section to include arbitrary JSON or
 * YAML objects that provide details about the template.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html | Metadata}
 */
export class Metadata extends Element<"Metadata"> {
  public constructor(name: string, definition: unknown) {
    super("Metadata", name, definition);
  }
}
