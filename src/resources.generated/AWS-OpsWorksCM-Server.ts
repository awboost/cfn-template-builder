import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::OpsWorksCM::Server
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opsworkscm-server.html}
 */
export type OpsWorksCMServerProperties = {
  AssociatePublicIpAddress?: boolean;
  /**
   * @maxLength `79`
   * @pattern `[a-zA-Z][a-zA-Z0-9\-\.\:]*`
   */
  BackupId?: string;
  BackupRetentionCount?: number;
  /**
   * @maxLength `2097152`
   * @pattern `(?s)\s*-----BEGIN CERTIFICATE-----.+-----END CERTIFICATE-----\s*`
   */
  CustomCertificate?: string;
  /**
   * @maxLength `253`
   * @pattern `^(((?!-)[A-Za-z0-9-]{0,62}[A-Za-z0-9])\.)+((?!-)[A-Za-z0-9-]{1,62}[A-Za-z0-9])$`
   */
  CustomDomain?: string;
  /**
   * @maxLength `4096`
   * @pattern `(?ms)\s*^-----BEGIN (?-s:.*)PRIVATE KEY-----$.*?^-----END (?-s:.*)PRIVATE KEY-----$\s*`
   */
  CustomPrivateKey?: string;
  DisableAutomatedBackup?: boolean;
  /**
   * @maxLength `10000`
   */
  Engine?: string;
  EngineAttributes?: EngineAttribute[];
  /**
   * @maxLength `10000`
   */
  EngineModel?: string;
  /**
   * @maxLength `10000`
   */
  EngineVersion?: string;
  /**
   * @maxLength `10000`
   * @pattern `arn:aws:iam::[0-9]{12}:instance-profile/.*`
   */
  InstanceProfileArn: string;
  /**
   * @maxLength `10000`
   */
  InstanceType: string;
  /**
   * @maxLength `10000`
   * @pattern `.*`
   */
  KeyPair?: string;
  /**
   * @maxLength `10000`
   * @pattern `^((Mon|Tue|Wed|Thu|Fri|Sat|Sun):)?([0-1][0-9]|2[0-3]):[0-5][0-9]$`
   */
  PreferredBackupWindow?: string;
  /**
   * @maxLength `10000`
   * @pattern `^((Mon|Tue|Wed|Thu|Fri|Sat|Sun):)?([0-1][0-9]|2[0-3]):[0-5][0-9]$`
   */
  PreferredMaintenanceWindow?: string;
  SecurityGroupIds?: string[];
  /**
   * @maxLength `10000`
   * @pattern `arn:aws:iam::[0-9]{12}:role/.*`
   */
  ServiceRoleArn: string;
  SubnetIds?: string[];
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::OpsWorksCM::Server`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opsworkscm-server.html#aws-resource-opsworkscm-server-return-values}
 */
export type OpsWorksCMServerAttributes = {
  /**
   * @maxLength `10000`
   */
  Arn: string;
  /**
   * @maxLength `10000`
   */
  Endpoint: string;
  /**
   * @minLength `1`
   * @maxLength `40`
   * @pattern `[a-zA-Z][a-zA-Z0-9\-]*`
   */
  ServerName: string;
};
/**
 * Type definition for `AWS::OpsWorksCM::Server.EngineAttribute`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-opsworkscm-server-engineattribute.html}
 */
export type EngineAttribute = {
  /**
   * @maxLength `10000`
   * @pattern `(?s).*`
   */
  Name?: string;
  /**
   * @maxLength `10000`
   * @pattern `(?s).*`
   */
  Value?: string;
};
/**
 * Type definition for `AWS::OpsWorksCM::Server.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-opsworkscm-server-tag.html}
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
   * @pattern `^([\p{L}\p{Z}\p{N}_.:/=+\-@]*)$`
   */
  Value: string;
};
/**
 * Resource Type definition for AWS::OpsWorksCM::Server
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opsworkscm-server.html}
 */
export class OpsWorksCMServer extends $Resource<
  "AWS::OpsWorksCM::Server",
  OpsWorksCMServerProperties,
  OpsWorksCMServerAttributes
> {
  public static readonly Type = "AWS::OpsWorksCM::Server";
  public static readonly AttributeNames = [
    "Arn" as const,
    "Endpoint" as const,
    "ServerName" as const,
  ];
  constructor(
    logicalId: string,
    properties: OpsWorksCMServerProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      OpsWorksCMServer.Type,
      properties,
      OpsWorksCMServer.AttributeNames,
      options,
    );
  }
}
