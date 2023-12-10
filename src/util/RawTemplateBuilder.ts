import { TemplateSectionBuilder } from "../builder.js";
import { Template, TemplateSection } from "../template.js";

export class RawTemplateBuilder implements TemplateSectionBuilder {
  constructor(public readonly template: Template) {}

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
}
