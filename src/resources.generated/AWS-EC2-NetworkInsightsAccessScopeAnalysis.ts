import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource schema for AWS::EC2::NetworkInsightsAccessScopeAnalysis
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkinsightsaccessscopeanalysis.html}
 */
export type EC2NetworkInsightsAccessScopeAnalysisProperties = {
  NetworkInsightsAccessScopeId: string;
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::EC2::NetworkInsightsAccessScopeAnalysis`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkinsightsaccessscopeanalysis.html#aws-resource-ec2-networkinsightsaccessscopeanalysis-return-values}
 */
export type EC2NetworkInsightsAccessScopeAnalysisAttributes = {
  AnalyzedEniCount: number;
  EndDate: string;
  FindingsFound: "true" | "false" | "unknown";
  NetworkInsightsAccessScopeAnalysisArn: string;
  NetworkInsightsAccessScopeAnalysisId: string;
  StartDate: string;
  Status: "running" | "failed" | "succeeded";
  StatusMessage: string;
};
/**
 * Type definition for `AWS::EC2::NetworkInsightsAccessScopeAnalysis.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-networkinsightsaccessscopeanalysis-tag.html}
 */
export type Tag = {
  Key: string;
  Value?: string;
};
/**
 * Resource schema for AWS::EC2::NetworkInsightsAccessScopeAnalysis
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkinsightsaccessscopeanalysis.html}
 */
export class EC2NetworkInsightsAccessScopeAnalysis extends $Resource<
  "AWS::EC2::NetworkInsightsAccessScopeAnalysis",
  EC2NetworkInsightsAccessScopeAnalysisProperties,
  EC2NetworkInsightsAccessScopeAnalysisAttributes
> {
  public static readonly Type = "AWS::EC2::NetworkInsightsAccessScopeAnalysis";
  public static readonly AttributeNames = [
    "AnalyzedEniCount" as const,
    "EndDate" as const,
    "FindingsFound" as const,
    "NetworkInsightsAccessScopeAnalysisArn" as const,
    "NetworkInsightsAccessScopeAnalysisId" as const,
    "StartDate" as const,
    "Status" as const,
    "StatusMessage" as const,
  ];
  constructor(
    logicalId: string,
    properties: EC2NetworkInsightsAccessScopeAnalysisProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      EC2NetworkInsightsAccessScopeAnalysis.Type,
      properties,
      EC2NetworkInsightsAccessScopeAnalysis.AttributeNames,
      options,
    );
  }
}
