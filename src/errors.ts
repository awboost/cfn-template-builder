import type { TemplateSection } from "./template.js";

export class DuplicateElementError extends Error {
  public constructor(
    public readonly sectionName: TemplateSection,
    public readonly elementName: string,
  ) {
    super(
      `duplicate element "${elementName}" in template section "${sectionName}"`,
    );
    this.name = "DuplicateElementError";
  }
}
