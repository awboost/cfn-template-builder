import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::EC2::ClientVpnRoute
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-clientvpnroute.html}
 */
export type EC2ClientVpnRouteProperties = {
  ClientVpnEndpointId: string;
  Description?: string;
  DestinationCidrBlock: string;
  TargetVpcSubnetId: string;
};
/**
 * Attribute type definition for `AWS::EC2::ClientVpnRoute`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-clientvpnroute.html#aws-resource-ec2-clientvpnroute-return-values}
 */
export type EC2ClientVpnRouteAttributes = {
  Id: string;
};
/**
 * Resource Type definition for AWS::EC2::ClientVpnRoute
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-clientvpnroute.html}
 */
export class EC2ClientVpnRoute extends $Resource<
  "AWS::EC2::ClientVpnRoute",
  EC2ClientVpnRouteProperties,
  EC2ClientVpnRouteAttributes
> {
  public static readonly Type = "AWS::EC2::ClientVpnRoute";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: EC2ClientVpnRouteProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      EC2ClientVpnRoute.Type,
      properties,
      EC2ClientVpnRoute.AttributeNames,
      options,
    );
  }
}
