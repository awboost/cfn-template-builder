import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::CloudFront::ContinuousDeploymentPolicy
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-continuousdeploymentpolicy.html}
 */
export type CloudFrontContinuousDeploymentPolicyProperties = {
  ContinuousDeploymentPolicyConfig: ContinuousDeploymentPolicyConfig;
};
/**
 * Attribute type definition for `AWS::CloudFront::ContinuousDeploymentPolicy`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-continuousdeploymentpolicy.html#aws-resource-cloudfront-continuousdeploymentpolicy-return-values}
 */
export type CloudFrontContinuousDeploymentPolicyAttributes = {
  Id: string;
  LastModifiedTime: string;
};
/**
 * Type definition for `AWS::CloudFront::ContinuousDeploymentPolicy.ContinuousDeploymentPolicyConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-continuousdeploymentpolicy-continuousdeploymentpolicyconfig.html}
 */
export type ContinuousDeploymentPolicyConfig = {
  Enabled: boolean;
  SingleHeaderPolicyConfig?: {
    /**
     * @minLength `1`
     * @maxLength `256`
     */
    Header: string;
    /**
     * @minLength `1`
     * @maxLength `1783`
     */
    Value: string;
  };
  SingleWeightPolicyConfig?: {
    SessionStickinessConfig?: SessionStickinessConfig;
    /**
     * @max `1`
     */
    Weight: number;
  };
  /**
   * @minLength `1`
   */
  StagingDistributionDnsNames: string[];
  TrafficConfig?: TrafficConfig;
  Type?: "SingleWeight" | "SingleHeader";
};
/**
 * Type definition for `AWS::CloudFront::ContinuousDeploymentPolicy.SessionStickinessConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-continuousdeploymentpolicy-sessionstickinessconfig.html}
 */
export type SessionStickinessConfig = {
  /**
   * @min `300`
   * @max `3600`
   */
  IdleTTL: number;
  /**
   * @min `300`
   * @max `3600`
   */
  MaximumTTL: number;
};
/**
 * Type definition for `AWS::CloudFront::ContinuousDeploymentPolicy.SingleHeaderConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-continuousdeploymentpolicy-singleheaderconfig.html}
 */
export type SingleHeaderConfig = {
  /**
   * @minLength `1`
   * @maxLength `256`
   */
  Header: string;
  /**
   * @minLength `1`
   * @maxLength `1783`
   */
  Value: string;
};
/**
 * Type definition for `AWS::CloudFront::ContinuousDeploymentPolicy.SingleWeightConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-continuousdeploymentpolicy-singleweightconfig.html}
 */
export type SingleWeightConfig = {
  SessionStickinessConfig?: SessionStickinessConfig;
  /**
   * @max `1`
   */
  Weight: number;
};
/**
 * Type definition for `AWS::CloudFront::ContinuousDeploymentPolicy.TrafficConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-continuousdeploymentpolicy-trafficconfig.html}
 */
export type TrafficConfig = {
  SingleHeaderConfig?: SingleHeaderConfig;
  SingleWeightConfig?: SingleWeightConfig;
  Type: "SingleWeight" | "SingleHeader";
};
/**
 * Resource Type definition for AWS::CloudFront::ContinuousDeploymentPolicy
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-continuousdeploymentpolicy.html}
 */
export class CloudFrontContinuousDeploymentPolicy extends $Resource<
  "AWS::CloudFront::ContinuousDeploymentPolicy",
  CloudFrontContinuousDeploymentPolicyProperties,
  CloudFrontContinuousDeploymentPolicyAttributes
> {
  public static readonly Type = "AWS::CloudFront::ContinuousDeploymentPolicy";
  public static readonly AttributeNames = [
    "Id" as const,
    "LastModifiedTime" as const,
  ];
  constructor(
    logicalId: string,
    properties: CloudFrontContinuousDeploymentPolicyProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      CloudFrontContinuousDeploymentPolicy.Type,
      properties,
      CloudFrontContinuousDeploymentPolicy.AttributeNames,
      options,
    );
  }
}
