import type { TemplateSection } from "./template.js";

export class BuildAlreadyCalledError extends Error {
  public constructor() {
    super(`build() has already been called`);
    this.name = "BuildAlreadyCalledError";
  }
}

export class CallBuildFirstError extends Error {
  public constructor() {
    super(`call build() first`);
    this.name = "CallBuildFirstError";
  }
}

export class DuplicateAssetError extends Error {
  public constructor(public readonly assetName: string) {
    super(`duplicate asset "${assetName}"`);
    this.name = "DuplicateAssetError";
  }
}

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

export class UnresolvedValueError extends Error {
  public constructor(public readonly valueName: string) {
    super(`the ResolvableValue ${valueName} has not been given a value`);
    this.name = "UnresolvedValueError";
  }
}
