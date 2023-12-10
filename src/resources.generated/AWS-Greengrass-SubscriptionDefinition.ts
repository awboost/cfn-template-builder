import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::Greengrass::SubscriptionDefinition
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-subscriptiondefinition.html}
 */
export type GreengrassSubscriptionDefinitionProperties = {
  InitialVersion?: SubscriptionDefinitionVersion;
  Name: string;
  Tags?: Record<string, any>;
};
/**
 * Attribute type definition for `AWS::Greengrass::SubscriptionDefinition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-subscriptiondefinition.html#aws-resource-greengrass-subscriptiondefinition-return-values}
 */
export type GreengrassSubscriptionDefinitionAttributes = {
  Arn: string;
  Id: string;
  LatestVersionArn: string;
};
/**
 * Type definition for `AWS::Greengrass::SubscriptionDefinition.Subscription`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrass-subscriptiondefinition-subscription.html}
 */
export type Subscription = {
  Id: string;
  Source: string;
  Subject: string;
  Target: string;
};
/**
 * Type definition for `AWS::Greengrass::SubscriptionDefinition.SubscriptionDefinitionVersion`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrass-subscriptiondefinition-subscriptiondefinitionversion.html}
 */
export type SubscriptionDefinitionVersion = {
  Subscriptions: Subscription[];
};
/**
 * Resource Type definition for AWS::Greengrass::SubscriptionDefinition
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-subscriptiondefinition.html}
 */
export class GreengrassSubscriptionDefinition extends $Resource<
  "AWS::Greengrass::SubscriptionDefinition",
  GreengrassSubscriptionDefinitionProperties,
  GreengrassSubscriptionDefinitionAttributes
> {
  public static readonly Type = "AWS::Greengrass::SubscriptionDefinition";
  public static readonly AttributeNames = [
    "Arn" as const,
    "Id" as const,
    "LatestVersionArn" as const,
  ];
  constructor(
    logicalId: string,
    properties: GreengrassSubscriptionDefinitionProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      GreengrassSubscriptionDefinition.Type,
      properties,
      GreengrassSubscriptionDefinition.AttributeNames,
      options,
    );
  }
}
