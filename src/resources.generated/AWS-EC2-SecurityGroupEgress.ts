import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::EC2::SecurityGroupEgress
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-securitygroupegress.html}
 */
export type EC2SecurityGroupEgressProperties = {
  CidrIp?: string;
  CidrIpv6?: string;
  Description?: string;
  DestinationPrefixListId?: string;
  DestinationSecurityGroupId?: string;
  FromPort?: number;
  GroupId: string;
  IpProtocol: string;
  ToPort?: number;
};
/**
 * Attribute type definition for `AWS::EC2::SecurityGroupEgress`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-securitygroupegress.html#aws-resource-ec2-securitygroupegress-return-values}
 */
export type EC2SecurityGroupEgressAttributes = {
  Id: string;
};
/**
 * Resource Type definition for AWS::EC2::SecurityGroupEgress
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-securitygroupegress.html}
 */
export class EC2SecurityGroupEgress extends $Resource<
  "AWS::EC2::SecurityGroupEgress",
  EC2SecurityGroupEgressProperties,
  EC2SecurityGroupEgressAttributes
> {
  public static readonly Type = "AWS::EC2::SecurityGroupEgress";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: EC2SecurityGroupEgressProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      EC2SecurityGroupEgress.Type,
      properties,
      EC2SecurityGroupEgress.AttributeNames,
      options,
    );
  }
}
