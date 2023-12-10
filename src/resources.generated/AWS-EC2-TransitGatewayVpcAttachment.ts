import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::EC2::TransitGatewayVpcAttachment
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgatewayvpcattachment.html}
 */
export type EC2TransitGatewayVpcAttachmentProperties = {
  AddSubnetIds?: string[];
  /**
   * The options for the transit gateway vpc attachment.
   */
  Options?: {
    /**
     * Indicates whether to enable Ipv6 Support for Vpc Attachment. Valid Values: enable | disable
     */
    ApplianceModeSupport?: string;
    /**
     * Indicates whether to enable DNS Support for Vpc Attachment. Valid Values: enable | disable
     */
    DnsSupport?: string;
    /**
     * Indicates whether to enable Ipv6 Support for Vpc Attachment. Valid Values: enable | disable
     */
    Ipv6Support?: string;
    /**
     * Indicates whether to enable Security Group referencing support for Vpc Attachment. Valid values: enable | disable
     */
    SecurityGroupReferencingSupport?: string;
  };
  RemoveSubnetIds?: string[];
  SubnetIds: string[];
  Tags?: Tag[];
  TransitGatewayId: string;
  VpcId: string;
};
/**
 * Attribute type definition for `AWS::EC2::TransitGatewayVpcAttachment`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgatewayvpcattachment.html#aws-resource-ec2-transitgatewayvpcattachment-return-values}
 */
export type EC2TransitGatewayVpcAttachmentAttributes = {
  Id: string;
};
/**
 * Type definition for `AWS::EC2::TransitGatewayVpcAttachment.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-transitgatewayvpcattachment-tag.html}
 */
export type Tag = {
  Key: string;
  Value: string;
};
/**
 * Resource Type definition for AWS::EC2::TransitGatewayVpcAttachment
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgatewayvpcattachment.html}
 */
export class EC2TransitGatewayVpcAttachment extends $Resource<
  "AWS::EC2::TransitGatewayVpcAttachment",
  EC2TransitGatewayVpcAttachmentProperties,
  EC2TransitGatewayVpcAttachmentAttributes
> {
  public static readonly Type = "AWS::EC2::TransitGatewayVpcAttachment";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: EC2TransitGatewayVpcAttachmentProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      EC2TransitGatewayVpcAttachment.Type,
      properties,
      EC2TransitGatewayVpcAttachment.AttributeNames,
      options,
    );
  }
}
