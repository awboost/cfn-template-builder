import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::EC2::TrafficMirrorTarget
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-trafficmirrortarget.html}
 */
export type EC2TrafficMirrorTargetProperties = {
  Description?: string;
  GatewayLoadBalancerEndpointId?: string;
  NetworkInterfaceId?: string;
  NetworkLoadBalancerArn?: string;
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::EC2::TrafficMirrorTarget`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-trafficmirrortarget.html#aws-resource-ec2-trafficmirrortarget-return-values}
 */
export type EC2TrafficMirrorTargetAttributes = {
  Id: string;
};
/**
 * Type definition for `AWS::EC2::TrafficMirrorTarget.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-trafficmirrortarget-tag.html}
 */
export type Tag = {
  Key: string;
  Value: string;
};
/**
 * Resource Type definition for AWS::EC2::TrafficMirrorTarget
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-trafficmirrortarget.html}
 */
export class EC2TrafficMirrorTarget extends $Resource<
  "AWS::EC2::TrafficMirrorTarget",
  EC2TrafficMirrorTargetProperties,
  EC2TrafficMirrorTargetAttributes
> {
  public static readonly Type = "AWS::EC2::TrafficMirrorTarget";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: EC2TrafficMirrorTargetProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      EC2TrafficMirrorTarget.Type,
      properties,
      EC2TrafficMirrorTarget.AttributeNames,
      options,
    );
  }
}
