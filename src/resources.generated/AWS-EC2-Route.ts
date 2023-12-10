import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::EC2::Route
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-route.html}
 */
export type EC2RouteProperties = {
  /**
   * The ID of the carrier gateway.
   */
  CarrierGatewayId?: string;
  /**
   * The IPv4 CIDR block used for the destination match.
   */
  DestinationCidrBlock?: string;
  /**
   * The IPv6 CIDR block used for the destination match.
   */
  DestinationIpv6CidrBlock?: string;
  /**
   * The ID of managed prefix list, it's a set of one or more CIDR blocks.
   */
  DestinationPrefixListId?: string;
  /**
   * The ID of the egress-only internet gateway.
   */
  EgressOnlyInternetGatewayId?: string;
  /**
   * The ID of an internet gateway or virtual private gateway attached to your VPC.
   */
  GatewayId?: string;
  /**
   * The ID of a NAT instance in your VPC.
   */
  InstanceId?: string;
  /**
   * The ID of the local gateway.
   */
  LocalGatewayId?: string;
  /**
   * The ID of a NAT gateway.
   */
  NatGatewayId?: string;
  /**
   * The ID of the network interface.
   */
  NetworkInterfaceId?: string;
  /**
   * The ID of the route table. The routing table must be associated with the same VPC that the virtual private gateway is attached to.
   */
  RouteTableId: string;
  /**
   * The ID of a transit gateway.
   */
  TransitGatewayId?: string;
  /**
   * The ID of a VPC endpoint. Supported for Gateway Load Balancer endpoints only.
   */
  VpcEndpointId?: string;
  /**
   * The ID of a VPC peering connection.
   */
  VpcPeeringConnectionId?: string;
};
/**
 * Attribute type definition for `AWS::EC2::Route`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-route.html#aws-resource-ec2-route-return-values}
 */
export type EC2RouteAttributes = {
  /**
   * The primary identifier of the resource generated by the service.
   */
  CidrBlock: string;
};
/**
 * Resource Type definition for AWS::EC2::Route
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-route.html}
 */
export class EC2Route extends $Resource<
  "AWS::EC2::Route",
  EC2RouteProperties,
  EC2RouteAttributes
> {
  public static readonly Type = "AWS::EC2::Route";
  public static readonly AttributeNames = ["CidrBlock" as const];
  constructor(
    logicalId: string,
    properties: EC2RouteProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      EC2Route.Type,
      properties,
      EC2Route.AttributeNames,
      options,
    );
  }
}
