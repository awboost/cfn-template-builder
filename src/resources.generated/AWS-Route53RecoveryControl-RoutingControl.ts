import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::Route53RecoveryControl::RoutingControl`.
 * AWS Route53 Recovery Control Routing Control resource schema .
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53recoverycontrol-routingcontrol.html}
 */
export type Route53RecoveryControlRoutingControlProperties = {
  /**
   * Arn associated with Control Panel
   */
  ClusterArn?: string;
  /**
   * The Amazon Resource Name (ARN) of the control panel.
   */
  ControlPanelArn?: string;
  /**
   * The name of the routing control. You can use any non-white space character in the name.
   * @minLength `1`
   * @maxLength `64`
   */
  Name: string;
};
/**
 * Attribute type definition for `AWS::Route53RecoveryControl::RoutingControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53recoverycontrol-routingcontrol.html#aws-resource-route53recoverycontrol-routingcontrol-return-values}
 */
export type Route53RecoveryControlRoutingControlAttributes = {
  /**
   * The Amazon Resource Name (ARN) of the routing control.
   */
  RoutingControlArn: string;
  /**
   * The deployment status of the routing control. Status can be one of the following: PENDING, DEPLOYED, PENDING_DELETION.
   */
  Status: "PENDING" | "DEPLOYED" | "PENDING_DELETION";
};
/**
 * Resource type definition for `AWS::Route53RecoveryControl::RoutingControl`.
 * AWS Route53 Recovery Control Routing Control resource schema .
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53recoverycontrol-routingcontrol.html}
 */
export class Route53RecoveryControlRoutingControl extends $Resource<
  "AWS::Route53RecoveryControl::RoutingControl",
  Route53RecoveryControlRoutingControlProperties,
  Route53RecoveryControlRoutingControlAttributes
> {
  public static readonly Type = "AWS::Route53RecoveryControl::RoutingControl";
  public static readonly AttributeNames = [
    "RoutingControlArn" as const,
    "Status" as const,
  ];
  constructor(
    logicalId: string,
    properties: Route53RecoveryControlRoutingControlProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      Route53RecoveryControlRoutingControl.Type,
      properties,
      Route53RecoveryControlRoutingControl.AttributeNames,
      options,
    );
  }
}
