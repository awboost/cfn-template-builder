import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * The AWS::EC2::SubnetCidrBlock resource creates association between subnet and IPv6 CIDR
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnetcidrblock.html}
 */
export type EC2SubnetCidrBlockProperties = {
  /**
   * The IPv6 network range for the subnet, in CIDR notation. The subnet size must use a /64 prefix length
   * @maxLength `42`
   */
  Ipv6CidrBlock: string;
  /**
   * The ID of the subnet
   */
  SubnetId: string;
};
/**
 * Attribute type definition for `AWS::EC2::SubnetCidrBlock`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnetcidrblock.html#aws-resource-ec2-subnetcidrblock-return-values}
 */
export type EC2SubnetCidrBlockAttributes = {
  /**
   * Information about the IPv6 association.
   */
  Id: string;
};
/**
 * The AWS::EC2::SubnetCidrBlock resource creates association between subnet and IPv6 CIDR
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnetcidrblock.html}
 */
export class EC2SubnetCidrBlock extends $Resource<
  "AWS::EC2::SubnetCidrBlock",
  EC2SubnetCidrBlockProperties,
  EC2SubnetCidrBlockAttributes
> {
  public static readonly Type = "AWS::EC2::SubnetCidrBlock";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: EC2SubnetCidrBlockProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      EC2SubnetCidrBlock.Type,
      properties,
      EC2SubnetCidrBlock.AttributeNames,
      options,
    );
  }
}
