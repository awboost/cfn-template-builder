import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::AppSync::ApiKey
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-apikey.html}
 */
export type AppSyncApiKeyProperties = {
  ApiId: string;
  Description?: string;
  Expires?: number;
};
/**
 * Attribute type definition for `AWS::AppSync::ApiKey`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-apikey.html#aws-resource-appsync-apikey-return-values}
 */
export type AppSyncApiKeyAttributes = {
  ApiKey: string;
  ApiKeyId: string;
  Arn: string;
};
/**
 * Resource Type definition for AWS::AppSync::ApiKey
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-apikey.html}
 */
export class AppSyncApiKey extends $Resource<
  "AWS::AppSync::ApiKey",
  AppSyncApiKeyProperties,
  AppSyncApiKeyAttributes
> {
  public static readonly Type = "AWS::AppSync::ApiKey";
  public static readonly AttributeNames = [
    "ApiKey" as const,
    "ApiKeyId" as const,
    "Arn" as const,
  ];
  constructor(
    logicalId: string,
    properties: AppSyncApiKeyProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      AppSyncApiKey.Type,
      properties,
      AppSyncApiKey.AttributeNames,
      options,
    );
  }
}
