import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Definition of AWS::RedshiftServerless::Namespace Resource Type
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshiftserverless-namespace.html}
 */
export type RedshiftServerlessNamespaceProperties = {
  /**
   * The password associated with the admin user for the namespace that is being created. Password must be at least 8 characters in length, should be any printable ASCII character. Must contain at least one lowercase letter, one uppercase letter and one decimal digit.
   * @minLength `8`
   * @maxLength `64`
   * @pattern `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\x00-\x20\x22\x27\x2f\x40\x5c\x7f-\uffff]+`
   */
  AdminUserPassword?: string;
  /**
   * The user name associated with the admin user for the namespace that is being created. Only alphanumeric characters and underscores are allowed. It should start with an alphabet.
   * @pattern `[a-zA-Z][a-zA-Z_0-9+.@-]*`
   */
  AdminUsername?: string;
  /**
   * The database name associated for the namespace that is being created. Only alphanumeric characters and underscores are allowed. It should start with an alphabet.
   * @maxLength `127`
   * @pattern `[a-zA-Z][a-zA-Z_0-9+.@-]*`
   */
  DbName?: string;
  /**
   * The default IAM role ARN for the namespace that is being created.
   */
  DefaultIamRoleArn?: string;
  /**
   * The name of the namespace the source snapshot was created from. Please specify the name if needed before deleting namespace
   * @maxLength `255`
   * @pattern `[a-z][a-z0-9]*(-[a-z0-9]+)*`
   */
  FinalSnapshotName?: string;
  /**
   * The number of days to retain automated snapshot in the destination region after they are copied from the source region. If the value is -1, the manual snapshot is retained indefinitely. The value must be either -1 or an integer between 1 and 3,653.
   */
  FinalSnapshotRetentionPeriod?: number;
  /**
   * A list of AWS Identity and Access Management (IAM) roles that can be used by the namespace to access other AWS services. You must supply the IAM roles in their Amazon Resource Name (ARN) format. The Default role limit for each request is 10.
   */
  IamRoles?: string[];
  /**
   * The AWS Key Management Service (KMS) key ID of the encryption key that you want to use to encrypt data in the namespace.
   */
  KmsKeyId?: string;
  /**
   * The collection of log types to be exported provided by the customer. Should only be one of the three supported log types: userlog, useractivitylog and connectionlog
   * @maxLength `16`
   */
  LogExports?: LogExport[];
  /**
   * A unique identifier for the namespace. You use this identifier to refer to the namespace for any subsequent namespace operations such as deleting or modifying. All alphabetical characters must be lower case. Namespace name should be unique for all namespaces within an AWS account.
   * @minLength `3`
   * @maxLength `64`
   * @pattern `^[a-z0-9-]+$`
   */
  NamespaceName: string;
  /**
   * The list of tags for the namespace.
   * @maxLength `200`
   */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::RedshiftServerless::Namespace`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshiftserverless-namespace.html#aws-resource-redshiftserverless-namespace-return-values}
 */
export type RedshiftServerlessNamespaceAttributes = {
  Namespace: Namespace;
};
/**
 * Type definition for `AWS::RedshiftServerless::Namespace.LogExport`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshiftserverless-namespace-logexport.html}
 */
export type LogExport = "useractivitylog" | "userlog" | "connectionlog";
/**
 * Type definition for `AWS::RedshiftServerless::Namespace.Namespace`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshiftserverless-namespace-namespace.html}
 */
export type Namespace = {
  AdminUsername?: string;
  CreationDate?: string;
  /**
   * @pattern `[a-zA-Z][a-zA-Z_0-9+.@-]*`
   */
  DbName?: string;
  DefaultIamRoleArn?: string;
  IamRoles?: string[];
  KmsKeyId?: string;
  /**
   * @maxLength `16`
   */
  LogExports?: LogExport[];
  NamespaceArn?: string;
  NamespaceId?: string;
  /**
   * @minLength `3`
   * @maxLength `64`
   * @pattern `^[a-z0-9-]+$`
   */
  NamespaceName?: string;
  Status?: NamespaceStatus;
};
/**
 * Type definition for `AWS::RedshiftServerless::Namespace.NamespaceStatus`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshiftserverless-namespace-namespacestatus.html}
 */
export type NamespaceStatus = "AVAILABLE" | "MODIFYING" | "DELETING";
/**
 * Type definition for `AWS::RedshiftServerless::Namespace.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshiftserverless-namespace-tag.html}
 */
export type Tag = {
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Key: string;
  /**
   * @maxLength `256`
   */
  Value: string;
};
/**
 * Definition of AWS::RedshiftServerless::Namespace Resource Type
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshiftserverless-namespace.html}
 */
export class RedshiftServerlessNamespace extends $Resource<
  "AWS::RedshiftServerless::Namespace",
  RedshiftServerlessNamespaceProperties,
  RedshiftServerlessNamespaceAttributes
> {
  public static readonly Type = "AWS::RedshiftServerless::Namespace";
  public static readonly AttributeNames = ["Namespace" as const];
  constructor(
    logicalId: string,
    properties: RedshiftServerlessNamespaceProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      RedshiftServerlessNamespace.Type,
      properties,
      RedshiftServerlessNamespace.AttributeNames,
      options,
    );
  }
}
