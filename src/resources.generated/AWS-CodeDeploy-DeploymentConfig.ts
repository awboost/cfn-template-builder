import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::CodeDeploy::DeploymentConfig
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-deploymentconfig.html}
 */
export type CodeDeployDeploymentConfigProperties = {
  /**
   * The destination platform type for the deployment (Lambda, Server, or ECS).
   */
  ComputePlatform?: string;
  /**
   * A name for the deployment configuration. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the deployment configuration name. For more information, see Name Type.
   */
  DeploymentConfigName?: string;
  /**
   * The minimum number of healthy instances that should be available at any time during the deployment. There are two parameters expected in the input: type and value.
   */
  MinimumHealthyHosts?: MinimumHealthyHosts;
  /**
   * The configuration that specifies how the deployment traffic is routed.
   */
  TrafficRoutingConfig?: TrafficRoutingConfig;
};
/**
 * Type definition for `AWS::CodeDeploy::DeploymentConfig.MinimumHealthyHosts`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-codedeploy-deploymentconfig-minimumhealthyhosts.html}
 */
export type MinimumHealthyHosts = {
  Type: string;
  Value: number;
};
/**
 * Type definition for `AWS::CodeDeploy::DeploymentConfig.TimeBasedCanary`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-codedeploy-deploymentconfig-timebasedcanary.html}
 */
export type TimeBasedCanary = {
  CanaryInterval: number;
  CanaryPercentage: number;
};
/**
 * Type definition for `AWS::CodeDeploy::DeploymentConfig.TimeBasedLinear`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-codedeploy-deploymentconfig-timebasedlinear.html}
 */
export type TimeBasedLinear = {
  LinearInterval: number;
  LinearPercentage: number;
};
/**
 * Type definition for `AWS::CodeDeploy::DeploymentConfig.TrafficRoutingConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-codedeploy-deploymentconfig-trafficroutingconfig.html}
 */
export type TrafficRoutingConfig = {
  TimeBasedCanary?: TimeBasedCanary;
  TimeBasedLinear?: TimeBasedLinear;
  Type: string;
};
/**
 * Resource Type definition for AWS::CodeDeploy::DeploymentConfig
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-deploymentconfig.html}
 */
export class CodeDeployDeploymentConfig extends $Resource<
  "AWS::CodeDeploy::DeploymentConfig",
  CodeDeployDeploymentConfigProperties,
  Record<string, never>
> {
  public static readonly Type = "AWS::CodeDeploy::DeploymentConfig";
  public static readonly AttributeNames = [];
  constructor(
    logicalId: string,
    properties: CodeDeployDeploymentConfigProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      CodeDeployDeploymentConfig.Type,
      properties,
      CodeDeployDeploymentConfig.AttributeNames,
      options,
    );
  }
}
