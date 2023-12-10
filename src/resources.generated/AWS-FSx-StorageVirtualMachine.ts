import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::FSx::StorageVirtualMachine
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-storagevirtualmachine.html}
 */
export type FSxStorageVirtualMachineProperties = {
  ActiveDirectoryConfiguration?: ActiveDirectoryConfiguration;
  FileSystemId: string;
  Name: string;
  RootVolumeSecurityStyle?: string;
  SvmAdminPassword?: string;
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::FSx::StorageVirtualMachine`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-storagevirtualmachine.html#aws-resource-fsx-storagevirtualmachine-return-values}
 */
export type FSxStorageVirtualMachineAttributes = {
  ResourceARN: string;
  StorageVirtualMachineId: string;
  UUID: string;
};
/**
 * Type definition for `AWS::FSx::StorageVirtualMachine.ActiveDirectoryConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-fsx-storagevirtualmachine-activedirectoryconfiguration.html}
 */
export type ActiveDirectoryConfiguration = {
  NetBiosName?: string;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfiguration;
};
/**
 * Type definition for `AWS::FSx::StorageVirtualMachine.SelfManagedActiveDirectoryConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-fsx-storagevirtualmachine-selfmanagedactivedirectoryconfiguration.html}
 */
export type SelfManagedActiveDirectoryConfiguration = {
  DnsIps?: string[];
  DomainName?: string;
  FileSystemAdministratorsGroup?: string;
  OrganizationalUnitDistinguishedName?: string;
  Password?: string;
  UserName?: string;
};
/**
 * Type definition for `AWS::FSx::StorageVirtualMachine.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-fsx-storagevirtualmachine-tag.html}
 */
export type Tag = {
  Key: string;
  Value: string;
};
/**
 * Resource Type definition for AWS::FSx::StorageVirtualMachine
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-storagevirtualmachine.html}
 */
export class FSxStorageVirtualMachine extends $Resource<
  "AWS::FSx::StorageVirtualMachine",
  FSxStorageVirtualMachineProperties,
  FSxStorageVirtualMachineAttributes
> {
  public static readonly Type = "AWS::FSx::StorageVirtualMachine";
  public static readonly AttributeNames = [
    "ResourceARN" as const,
    "StorageVirtualMachineId" as const,
    "UUID" as const,
  ];
  constructor(
    logicalId: string,
    properties: FSxStorageVirtualMachineProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      FSxStorageVirtualMachine.Type,
      properties,
      FSxStorageVirtualMachine.AttributeNames,
      options,
    );
  }
}
