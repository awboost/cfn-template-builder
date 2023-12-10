import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::AppConfig::Environment
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appconfig-environment.html}
 */
export type AppConfigEnvironmentProperties = {
  ApplicationId: string;
  Description?: string;
  Monitors?: Monitors[];
  Name: string;
  Tags?: Tags[];
};
/**
 * Attribute type definition for `AWS::AppConfig::Environment`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appconfig-environment.html#aws-resource-appconfig-environment-return-values}
 */
export type AppConfigEnvironmentAttributes = {
  Id: string;
};
/**
 * Type definition for `AWS::AppConfig::Environment.Monitors`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appconfig-environment-monitors.html}
 */
export type Monitors = {
  AlarmArn?: string;
  AlarmRoleArn?: string;
};
/**
 * Type definition for `AWS::AppConfig::Environment.Tags`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appconfig-environment-tags.html}
 */
export type Tags = {
  Key?: string;
  Value?: string;
};
/**
 * Resource Type definition for AWS::AppConfig::Environment
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appconfig-environment.html}
 */
export class AppConfigEnvironment extends $Resource<
  "AWS::AppConfig::Environment",
  AppConfigEnvironmentProperties,
  AppConfigEnvironmentAttributes
> {
  public static readonly Type = "AWS::AppConfig::Environment";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: AppConfigEnvironmentProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      AppConfigEnvironment.Type,
      properties,
      AppConfigEnvironment.AttributeNames,
      options,
    );
  }
}
