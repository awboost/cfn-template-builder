import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::GuardDuty::IPSet
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html}
 */
export type GuardDutyIPSetProperties = {
  Activate?: boolean;
  /**
   * @minLength `1`
   * @maxLength `300`
   */
  DetectorId?: string;
  Format: string;
  /**
   * @minLength `1`
   * @maxLength `300`
   */
  Location: string;
  /**
   * @minLength `1`
   * @maxLength `300`
   */
  Name: string;
  Tags?: TagItem[];
};
/**
 * Attribute type definition for `AWS::GuardDuty::IPSet`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html#aws-resource-guardduty-ipset-return-values}
 */
export type GuardDutyIPSetAttributes = {
  Id: string;
};
/**
 * Type definition for `AWS::GuardDuty::IPSet.TagItem`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-ipset-tagitem.html}
 */
export type TagItem = {
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Key: string;
  /**
   * @maxLength `256`
   */
  Value: string;
};
/**
 * Resource Type definition for AWS::GuardDuty::IPSet
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html}
 */
export class GuardDutyIPSet extends $Resource<
  "AWS::GuardDuty::IPSet",
  GuardDutyIPSetProperties,
  GuardDutyIPSetAttributes
> {
  public static readonly Type = "AWS::GuardDuty::IPSet";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: GuardDutyIPSetProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      GuardDutyIPSet.Type,
      properties,
      GuardDutyIPSet.AttributeNames,
      options,
    );
  }
}
