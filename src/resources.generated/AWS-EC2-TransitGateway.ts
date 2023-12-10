import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::EC2::TransitGateway
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgateway.html}
 */
export type EC2TransitGatewayProperties = {
  AmazonSideAsn?: number;
  AssociationDefaultRouteTableId?: string;
  AutoAcceptSharedAttachments?: string;
  DefaultRouteTableAssociation?: string;
  DefaultRouteTablePropagation?: string;
  Description?: string;
  DnsSupport?: string;
  MulticastSupport?: string;
  PropagationDefaultRouteTableId?: string;
  SecurityGroupReferencingSupport?: string;
  Tags?: Tag[];
  TransitGatewayCidrBlocks?: string[];
  VpnEcmpSupport?: string;
};
/**
 * Attribute type definition for `AWS::EC2::TransitGateway`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgateway.html#aws-resource-ec2-transitgateway-return-values}
 */
export type EC2TransitGatewayAttributes = {
  Id: string;
  TransitGatewayArn: string;
};
/**
 * Type definition for `AWS::EC2::TransitGateway.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-transitgateway-tag.html}
 */
export type Tag = {
  Key: string;
  Value: string;
};
/**
 * Resource Type definition for AWS::EC2::TransitGateway
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgateway.html}
 */
export class EC2TransitGateway extends $Resource<
  "AWS::EC2::TransitGateway",
  EC2TransitGatewayProperties,
  EC2TransitGatewayAttributes
> {
  public static readonly Type = "AWS::EC2::TransitGateway";
  public static readonly AttributeNames = [
    "Id" as const,
    "TransitGatewayArn" as const,
  ];
  constructor(
    logicalId: string,
    properties: EC2TransitGatewayProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      EC2TransitGateway.Type,
      properties,
      EC2TransitGateway.AttributeNames,
      options,
    );
  }
}
