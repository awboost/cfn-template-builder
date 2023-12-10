import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::DMS::ReplicationTask
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dms-replicationtask.html}
 */
export type DMSReplicationTaskProperties = {
  CdcStartPosition?: string;
  CdcStartTime?: number;
  CdcStopPosition?: string;
  MigrationType: string;
  ReplicationInstanceArn: string;
  ReplicationTaskIdentifier?: string;
  ReplicationTaskSettings?: string;
  ResourceIdentifier?: string;
  SourceEndpointArn: string;
  TableMappings: string;
  Tags?: Tag[];
  TargetEndpointArn: string;
  TaskData?: string;
};
/**
 * Attribute type definition for `AWS::DMS::ReplicationTask`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dms-replicationtask.html#aws-resource-dms-replicationtask-return-values}
 */
export type DMSReplicationTaskAttributes = {
  Id: string;
};
/**
 * Type definition for `AWS::DMS::ReplicationTask.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dms-replicationtask-tag.html}
 */
export type Tag = {
  Key: string;
  Value: string;
};
/**
 * Resource Type definition for AWS::DMS::ReplicationTask
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dms-replicationtask.html}
 */
export class DMSReplicationTask extends $Resource<
  "AWS::DMS::ReplicationTask",
  DMSReplicationTaskProperties,
  DMSReplicationTaskAttributes
> {
  public static readonly Type = "AWS::DMS::ReplicationTask";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: DMSReplicationTaskProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      DMSReplicationTask.Type,
      properties,
      DMSReplicationTask.AttributeNames,
      options,
    );
  }
}
