import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::ECS::CapacityProvider.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-capacityprovider.html}
 */
export type ECSCapacityProviderProperties = {
  AutoScalingGroupProvider: AutoScalingGroupProvider;
  Name?: string;
  Tags?: Tag[];
};
/**
 * Type definition for `AWS::ECS::CapacityProvider.AutoScalingGroupProvider`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-capacityprovider-autoscalinggroupprovider.html}
 */
export type AutoScalingGroupProvider = {
  AutoScalingGroupArn: string;
  /**
   * The managed scaling settings for the Auto Scaling group capacity provider.
   */
  ManagedScaling?: ManagedScaling;
  ManagedTerminationProtection?: "DISABLED" | "ENABLED";
};
/**
 * Type definition for `AWS::ECS::CapacityProvider.ManagedScaling`.
 * The managed scaling settings for the Auto Scaling group capacity provider.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-capacityprovider-managedscaling.html}
 */
export type ManagedScaling = {
  InstanceWarmupPeriod?: number;
  MaximumScalingStepSize?: number;
  MinimumScalingStepSize?: number;
  Status?: "DISABLED" | "ENABLED";
  TargetCapacity?: number;
};
/**
 * Type definition for `AWS::ECS::CapacityProvider.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-capacityprovider-tag.html}
 */
export type Tag = {
  /**
   * @minLength `1`
   */
  Key?: string;
  /**
   * @minLength `1`
   */
  Value?: string;
};
/**
 * Resource Type definition for AWS::ECS::CapacityProvider.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-capacityprovider.html}
 */
export class ECSCapacityProvider extends $Resource<
  "AWS::ECS::CapacityProvider",
  ECSCapacityProviderProperties,
  Record<string, never>
> {
  public static readonly Type = "AWS::ECS::CapacityProvider";
  public static readonly AttributeNames = [];
  constructor(
    logicalId: string,
    properties: ECSCapacityProviderProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      ECSCapacityProvider.Type,
      properties,
      ECSCapacityProvider.AttributeNames,
      options,
    );
  }
}
