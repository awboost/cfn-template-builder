import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Definition of AWS::BackupGateway::Hypervisor Resource Type
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backupgateway-hypervisor.html}
 */
export type BackupGatewayHypervisorProperties = {
  /**
   * @minLength `3`
   * @maxLength `128`
   * @pattern `^.+$`
   */
  Host?: string;
  /**
   * @minLength `50`
   * @maxLength `500`
   * @pattern `^(^arn:(aws|aws-cn|aws-us-gov):kms:([a-zA-Z0-9-]+):([0-9]+):(key|alias)/(\S+)$)|(^alias/(\S+)$)$`
   */
  KmsKeyArn?: string;
  /**
   * @maxLength `2048`
   * @pattern `^$|^arn:(aws|aws-cn|aws-us-gov):logs:([a-zA-Z0-9-]+):([0-9]+):log-group:[a-zA-Z0-9_\-\/\.]+:\*$`
   */
  LogGroupArn?: string;
  /**
   * @minLength `1`
   * @maxLength `100`
   * @pattern `^[a-zA-Z0-9-]*$`
   */
  Name?: string;
  /**
   * @minLength `1`
   * @maxLength `100`
   * @pattern `^[ -~]+$`
   */
  Password?: string;
  Tags?: Tag[];
  /**
   * @minLength `1`
   * @maxLength `100`
   * @pattern `^[ -\.0-\[\]-~]*[!-\.0-\[\]-~][ -\.0-\[\]-~]*$`
   */
  Username?: string;
};
/**
 * Attribute type definition for `AWS::BackupGateway::Hypervisor`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backupgateway-hypervisor.html#aws-resource-backupgateway-hypervisor-return-values}
 */
export type BackupGatewayHypervisorAttributes = {
  /**
   * @minLength `50`
   * @maxLength `500`
   * @pattern `^arn:(aws|aws-cn|aws-us-gov):backup-gateway(:[a-zA-Z-0-9]+){3}\/[a-zA-Z-0-9]+$`
   */
  HypervisorArn: string;
};
/**
 * Type definition for `AWS::BackupGateway::Hypervisor.HypervisorState`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-backupgateway-hypervisor-hypervisorstate.html}
 */
export type HypervisorState = "PENDING" | "ONLINE" | "OFFLINE" | "ERROR";
/**
 * Type definition for `AWS::BackupGateway::Hypervisor.SyncMetadataStatus`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-backupgateway-hypervisor-syncmetadatastatus.html}
 */
export type SyncMetadataStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED";
/**
 * Type definition for `AWS::BackupGateway::Hypervisor.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-backupgateway-hypervisor-tag.html}
 */
export type Tag = {
  /**
   * @minLength `1`
   * @maxLength `128`
   * @pattern `^([\p{L}\p{Z}\p{N}_.:/=+\-@]*)$`
   */
  Key: string;
  /**
   * @maxLength `256`
   * @pattern `^[^\x00]*$`
   */
  Value: string;
};
/**
 * Definition of AWS::BackupGateway::Hypervisor Resource Type
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backupgateway-hypervisor.html}
 */
export class BackupGatewayHypervisor extends $Resource<
  "AWS::BackupGateway::Hypervisor",
  BackupGatewayHypervisorProperties,
  BackupGatewayHypervisorAttributes
> {
  public static readonly Type = "AWS::BackupGateway::Hypervisor";
  public static readonly AttributeNames = ["HypervisorArn" as const];
  constructor(
    logicalId: string,
    properties: BackupGatewayHypervisorProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      BackupGatewayHypervisor.Type,
      properties,
      BackupGatewayHypervisor.AttributeNames,
      options,
    );
  }
}
