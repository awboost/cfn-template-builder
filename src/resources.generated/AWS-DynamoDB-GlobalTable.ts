import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Version: None. Resource Type definition for AWS::DynamoDB::GlobalTable
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-globaltable.html}
 */
export type DynamoDBGlobalTableProperties = {
  /**
   * @minLength `1`
   */
  AttributeDefinitions: AttributeDefinition[];
  BillingMode?: string;
  GlobalSecondaryIndexes?: GlobalSecondaryIndex[];
  /**
   * @minLength `1`
   * @maxLength `2`
   */
  KeySchema: KeySchema[];
  LocalSecondaryIndexes?: LocalSecondaryIndex[];
  /**
   * @minLength `1`
   */
  Replicas: ReplicaSpecification[];
  SSESpecification?: SSESpecification;
  StreamSpecification?: StreamSpecification;
  TableName?: string;
  TimeToLiveSpecification?: TimeToLiveSpecification;
  WriteProvisionedThroughputSettings?: WriteProvisionedThroughputSettings;
};
/**
 * Attribute type definition for `AWS::DynamoDB::GlobalTable`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-globaltable.html#aws-resource-dynamodb-globaltable-return-values}
 */
export type DynamoDBGlobalTableAttributes = {
  Arn: string;
  StreamArn: string;
  TableId: string;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.AttributeDefinition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-attributedefinition.html}
 */
export type AttributeDefinition = {
  /**
   * @minLength `1`
   * @maxLength `255`
   */
  AttributeName: string;
  AttributeType: string;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.CapacityAutoScalingSettings`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-capacityautoscalingsettings.html}
 */
export type CapacityAutoScalingSettings = {
  /**
   * @min `1`
   */
  MaxCapacity: number;
  /**
   * @min `1`
   */
  MinCapacity: number;
  /**
   * @min `1`
   */
  SeedCapacity?: number;
  TargetTrackingScalingPolicyConfiguration: TargetTrackingScalingPolicyConfiguration;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.ContributorInsightsSpecification`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-contributorinsightsspecification.html}
 */
export type ContributorInsightsSpecification = {
  Enabled: boolean;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.GlobalSecondaryIndex`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-globalsecondaryindex.html}
 */
export type GlobalSecondaryIndex = {
  /**
   * @minLength `3`
   * @maxLength `255`
   */
  IndexName: string;
  /**
   * @minLength `1`
   * @maxLength `2`
   */
  KeySchema: KeySchema[];
  Projection: Projection;
  WriteProvisionedThroughputSettings?: WriteProvisionedThroughputSettings;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.KeySchema`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-keyschema.html}
 */
export type KeySchema = {
  /**
   * @minLength `1`
   * @maxLength `255`
   */
  AttributeName: string;
  KeyType: string;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.KinesisStreamSpecification`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-kinesisstreamspecification.html}
 */
export type KinesisStreamSpecification = {
  StreamArn: string;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.LocalSecondaryIndex`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-localsecondaryindex.html}
 */
export type LocalSecondaryIndex = {
  /**
   * @minLength `3`
   * @maxLength `255`
   */
  IndexName: string;
  /**
   * @maxLength `2`
   */
  KeySchema: KeySchema[];
  Projection: Projection;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.PointInTimeRecoverySpecification`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-pointintimerecoveryspecification.html}
 */
export type PointInTimeRecoverySpecification = {
  PointInTimeRecoveryEnabled?: boolean;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.Projection`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-projection.html}
 */
export type Projection = {
  /**
   * @maxLength `20`
   */
  NonKeyAttributes?: string[];
  ProjectionType?: string;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.ReadProvisionedThroughputSettings`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-readprovisionedthroughputsettings.html}
 */
export type ReadProvisionedThroughputSettings = {
  ReadCapacityAutoScalingSettings?: CapacityAutoScalingSettings;
  /**
   * @min `1`
   */
  ReadCapacityUnits?: number;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.ReplicaGlobalSecondaryIndexSpecification`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-replicaglobalsecondaryindexspecification.html}
 */
export type ReplicaGlobalSecondaryIndexSpecification = {
  ContributorInsightsSpecification?: ContributorInsightsSpecification;
  /**
   * @minLength `3`
   * @maxLength `255`
   */
  IndexName: string;
  ReadProvisionedThroughputSettings?: ReadProvisionedThroughputSettings;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.ReplicaSSESpecification`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-replicassespecification.html}
 */
export type ReplicaSSESpecification = {
  KMSMasterKeyId: string;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.ReplicaSpecification`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-replicaspecification.html}
 */
export type ReplicaSpecification = {
  ContributorInsightsSpecification?: ContributorInsightsSpecification;
  DeletionProtectionEnabled?: boolean;
  GlobalSecondaryIndexes?: ReplicaGlobalSecondaryIndexSpecification[];
  KinesisStreamSpecification?: KinesisStreamSpecification;
  PointInTimeRecoverySpecification?: PointInTimeRecoverySpecification;
  ReadProvisionedThroughputSettings?: ReadProvisionedThroughputSettings;
  Region: string;
  SSESpecification?: ReplicaSSESpecification;
  TableClass?: string;
  Tags?: Tag[];
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.SSESpecification`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-ssespecification.html}
 */
export type SSESpecification = {
  SSEEnabled: boolean;
  SSEType?: string;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.StreamSpecification`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-streamspecification.html}
 */
export type StreamSpecification = {
  StreamViewType: string;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-tag.html}
 */
export type Tag = {
  Key: string;
  Value: string;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.TargetTrackingScalingPolicyConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-targettrackingscalingpolicyconfiguration.html}
 */
export type TargetTrackingScalingPolicyConfiguration = {
  DisableScaleIn?: boolean;
  ScaleInCooldown?: number;
  ScaleOutCooldown?: number;
  TargetValue: number;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.TimeToLiveSpecification`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-timetolivespecification.html}
 */
export type TimeToLiveSpecification = {
  AttributeName?: string;
  Enabled: boolean;
};
/**
 * Type definition for `AWS::DynamoDB::GlobalTable.WriteProvisionedThroughputSettings`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-globaltable-writeprovisionedthroughputsettings.html}
 */
export type WriteProvisionedThroughputSettings = {
  WriteCapacityAutoScalingSettings?: CapacityAutoScalingSettings;
};
/**
 * Version: None. Resource Type definition for AWS::DynamoDB::GlobalTable
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-globaltable.html}
 */
export class DynamoDBGlobalTable extends $Resource<
  "AWS::DynamoDB::GlobalTable",
  DynamoDBGlobalTableProperties,
  DynamoDBGlobalTableAttributes
> {
  public static readonly Type = "AWS::DynamoDB::GlobalTable";
  public static readonly AttributeNames = [
    "Arn" as const,
    "StreamArn" as const,
    "TableId" as const,
  ];
  constructor(
    logicalId: string,
    properties: DynamoDBGlobalTableProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      DynamoDBGlobalTable.Type,
      properties,
      DynamoDBGlobalTable.AttributeNames,
      options,
    );
  }
}
