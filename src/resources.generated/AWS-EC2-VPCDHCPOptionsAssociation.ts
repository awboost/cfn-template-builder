import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::EC2::VPCDHCPOptionsAssociation`.
 * Associates a set of DHCP options with a VPC, or associates no DHCP options with the VPC.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpcdhcpoptionsassociation.html}
 */
export type EC2VPCDHCPOptionsAssociationProperties = {
  /**
   * The ID of the DHCP options set, or default to associate no DHCP options with the VPC.
   */
  DhcpOptionsId: string;
  /**
   * The ID of the VPC.
   */
  VpcId: string;
};
/**
 * Resource type definition for `AWS::EC2::VPCDHCPOptionsAssociation`.
 * Associates a set of DHCP options with a VPC, or associates no DHCP options with the VPC.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpcdhcpoptionsassociation.html}
 */
export class EC2VPCDHCPOptionsAssociation extends $Resource<
  "AWS::EC2::VPCDHCPOptionsAssociation",
  EC2VPCDHCPOptionsAssociationProperties,
  Record<string, never>
> {
  public static readonly Type = "AWS::EC2::VPCDHCPOptionsAssociation";
  public static readonly AttributeNames = [];
  constructor(
    logicalId: string,
    properties: EC2VPCDHCPOptionsAssociationProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      EC2VPCDHCPOptionsAssociation.Type,
      properties,
      EC2VPCDHCPOptionsAssociation.AttributeNames,
      options,
    );
  }
}
