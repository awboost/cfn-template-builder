import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::Lambda::CodeSigningConfig.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-codesigningconfig.html}
 */
export type LambdaCodeSigningConfigProperties = {
  /**
   * When the CodeSigningConfig is later on attached to a function, the function code will be expected to be signed by profiles from this list
   */
  AllowedPublishers: AllowedPublishers;
  /**
   * Policies to control how to act if a signature is invalid
   */
  CodeSigningPolicies?: CodeSigningPolicies;
  /**
   * A description of the CodeSigningConfig
   * @maxLength `256`
   */
  Description?: string;
};
/**
 * Attribute type definition for `AWS::Lambda::CodeSigningConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-codesigningconfig.html#aws-resource-lambda-codesigningconfig-return-values}
 */
export type LambdaCodeSigningConfigAttributes = {
  /**
   * A unique Arn for CodeSigningConfig resource
   * @pattern `arn:(aws[a-zA-Z-]*)?:lambda:[a-z]{2}((-gov)|(-iso(b?)))?-[a-z]+-\d{1}:\d{12}:code-signing-config:csc-[a-z0-9]{17}`
   */
  CodeSigningConfigArn: string;
  /**
   * A unique identifier for CodeSigningConfig resource
   * @pattern `csc-[a-zA-Z0-9-_\.]{17}`
   */
  CodeSigningConfigId: string;
};
/**
 * Type definition for `AWS::Lambda::CodeSigningConfig.AllowedPublishers`.
 * When the CodeSigningConfig is later on attached to a function, the function code will be expected to be signed by profiles from this list
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lambda-codesigningconfig-allowedpublishers.html}
 */
export type AllowedPublishers = {
  /**
   * List of Signing profile version Arns
   * @minLength `1`
   * @maxLength `20`
   */
  SigningProfileVersionArns: string[];
};
/**
 * Type definition for `AWS::Lambda::CodeSigningConfig.CodeSigningPolicies`.
 * Policies to control how to act if a signature is invalid
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lambda-codesigningconfig-codesigningpolicies.html}
 */
export type CodeSigningPolicies = {
  /**
   * Indicates how Lambda operations involve updating the code artifact will operate. Default to Warn if not provided
   */
  UntrustedArtifactOnDeployment: "Warn" | "Enforce";
};
/**
 * Resource Type definition for AWS::Lambda::CodeSigningConfig.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-codesigningconfig.html}
 */
export class LambdaCodeSigningConfig extends $Resource<
  "AWS::Lambda::CodeSigningConfig",
  LambdaCodeSigningConfigProperties,
  LambdaCodeSigningConfigAttributes
> {
  public static readonly Type = "AWS::Lambda::CodeSigningConfig";
  public static readonly AttributeNames = [
    "CodeSigningConfigArn" as const,
    "CodeSigningConfigId" as const,
  ];
  constructor(
    logicalId: string,
    properties: LambdaCodeSigningConfigProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      LambdaCodeSigningConfig.Type,
      properties,
      LambdaCodeSigningConfig.AttributeNames,
      options,
    );
  }
}
