import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::RDS::GlobalCluster
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html}
 */
export type RDSGlobalClusterProperties = {
  /**
   * The deletion protection setting for the new global database. The global database can't be deleted when deletion protection is enabled.
   */
  DeletionProtection?: boolean;
  /**
     * The name of the database engine to be used for this DB cluster. Valid Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL 5.7-compatible Aurora).
    If you specify the SourceDBClusterIdentifier property, don't specify this property. The value is inherited from the cluster.
     */
  Engine?: "aurora" | "aurora-mysql" | "aurora-postgresql";
  /**
   * The version number of the database engine to use. If you specify the SourceDBClusterIdentifier property, don't specify this property. The value is inherited from the cluster.
   */
  EngineVersion?: string;
  /**
   * The cluster identifier of the new global database cluster. This parameter is stored as a lowercase string.
   * @pattern `^[a-zA-Z]{1}(?:-?[a-zA-Z0-9]){0,62}$`
   */
  GlobalClusterIdentifier?: string;
  /**
   * The Amazon Resource Name (ARN) to use as the primary cluster of the global database. This parameter is optional. This parameter is stored as a lowercase string.
   */
  SourceDBClusterIdentifier?: string;
  /**
     *  The storage encryption setting for the new global database cluster.
    If you specify the SourceDBClusterIdentifier property, don't specify this property. The value is inherited from the cluster.
     */
  StorageEncrypted?: boolean;
};
/**
 * Resource Type definition for AWS::RDS::GlobalCluster
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html}
 */
export class RDSGlobalCluster extends $Resource<
  "AWS::RDS::GlobalCluster",
  RDSGlobalClusterProperties,
  Record<string, never>
> {
  public static readonly Type = "AWS::RDS::GlobalCluster";
  public static readonly AttributeNames = [];
  constructor(
    logicalId: string,
    properties: RDSGlobalClusterProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      RDSGlobalCluster.Type,
      properties,
      RDSGlobalCluster.AttributeNames,
      options,
    );
  }
}
