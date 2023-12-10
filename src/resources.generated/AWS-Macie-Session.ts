import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * The AWS::Macie::Session resource specifies a new Amazon Macie session. A session is an object that represents the Amazon Macie service. A session is required for Amazon Macie to become operational.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-session.html}
 */
export type MacieSessionProperties = {
  /**
   * A enumeration value that specifies how frequently finding updates are published.
   */
  FindingPublishingFrequency?: "FIFTEEN_MINUTES" | "ONE_HOUR" | "SIX_HOURS";
  /**
   * A enumeration value that specifies the status of the Macie Session.
   */
  Status?: "ENABLED" | "PAUSED";
};
/**
 * Attribute type definition for `AWS::Macie::Session`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-session.html#aws-resource-macie-session-return-values}
 */
export type MacieSessionAttributes = {
  /**
   * AWS account ID of customer
   */
  AwsAccountId: string;
  /**
   * Service role used by Macie
   */
  ServiceRole: string;
};
/**
 * The AWS::Macie::Session resource specifies a new Amazon Macie session. A session is an object that represents the Amazon Macie service. A session is required for Amazon Macie to become operational.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-session.html}
 */
export class MacieSession extends $Resource<
  "AWS::Macie::Session",
  MacieSessionProperties,
  MacieSessionAttributes
> {
  public static readonly Type = "AWS::Macie::Session";
  public static readonly AttributeNames = [
    "AwsAccountId" as const,
    "ServiceRole" as const,
  ];
  constructor(
    logicalId: string,
    properties: MacieSessionProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      MacieSession.Type,
      properties,
      MacieSession.AttributeNames,
      options,
    );
  }
}
