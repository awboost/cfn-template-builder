import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::Greengrass::LoggerDefinition
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-loggerdefinition.html}
 */
export type GreengrassLoggerDefinitionProperties = {
  InitialVersion?: LoggerDefinitionVersion;
  Name: string;
  Tags?: Record<string, any>;
};
/**
 * Attribute type definition for `AWS::Greengrass::LoggerDefinition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-loggerdefinition.html#aws-resource-greengrass-loggerdefinition-return-values}
 */
export type GreengrassLoggerDefinitionAttributes = {
  Arn: string;
  Id: string;
  LatestVersionArn: string;
};
/**
 * Type definition for `AWS::Greengrass::LoggerDefinition.Logger`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrass-loggerdefinition-logger.html}
 */
export type Logger = {
  Component: string;
  Id: string;
  Level: string;
  Space?: number;
  Type: string;
};
/**
 * Type definition for `AWS::Greengrass::LoggerDefinition.LoggerDefinitionVersion`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrass-loggerdefinition-loggerdefinitionversion.html}
 */
export type LoggerDefinitionVersion = {
  Loggers: Logger[];
};
/**
 * Resource Type definition for AWS::Greengrass::LoggerDefinition
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-loggerdefinition.html}
 */
export class GreengrassLoggerDefinition extends $Resource<
  "AWS::Greengrass::LoggerDefinition",
  GreengrassLoggerDefinitionProperties,
  GreengrassLoggerDefinitionAttributes
> {
  public static readonly Type = "AWS::Greengrass::LoggerDefinition";
  public static readonly AttributeNames = [
    "Arn" as const,
    "Id" as const,
    "LatestVersionArn" as const,
  ];
  constructor(
    logicalId: string,
    properties: GreengrassLoggerDefinitionProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      GreengrassLoggerDefinition.Type,
      properties,
      GreengrassLoggerDefinition.AttributeNames,
      options,
    );
  }
}
