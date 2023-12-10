import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::FSx::DataRepositoryAssociation`.
 * Creates an Amazon FSx for Lustre data repository association (DRA). A data repository association is a link between a directory on the file system and an Amazon S3 bucket or prefix. You can have a maximum of 8 data repository associations on a file system. Data repository associations are supported on all FSx for Lustre 2.12 and newer file systems, excluding ``scratch_1`` deployment type.
 Each data repository association must have a unique Amazon FSx file system directory and a unique S3 bucket or prefix associated with it. You can configure a data repository association for automatic import only, for automatic export only, or for both. To learn more about linking a data repository to your file system, see [Linking your file system to an S3 bucket](https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-dra-linked-data-repo.html).
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-datarepositoryassociation.html}
 */
export type FSxDataRepositoryAssociationProperties = {
  /**
   * A boolean flag indicating whether an import data repository task to import metadata should run after the data repository association is created. The task runs if this flag is set to ``true``.
   */
  BatchImportMetaDataOnCreate?: boolean;
  /**
   * The path to the Amazon S3 data repository that will be linked to the file system. The path can be an S3 bucket or prefix in the format ``s3://myBucket/myPrefix/``. This path specifies where in the S3 data repository files will be imported from or exported to.
   */
  DataRepositoryPath: string;
  /**
   * The ID of the file system on which the data repository association is configured.
   */
  FileSystemId: string;
  /**
     * A path on the Amazon FSx for Lustre file system that points to a high-level directory (such as ``/ns1/``) or subdirectory (such as ``/ns1/subdir/``) that will be mapped 1-1 with ``DataRepositoryPath``. The leading forward slash in the name is required. Two data repository associations cannot have overlapping file system paths. For example, if a data repository is associated with file system path ``/ns1/``, then you cannot link another data repository with file system path ``/ns1/ns2``.
     This path specifies where in your file system files will be exported from or imported to. This file system directory can be linked to only one Amazon S3 bucket, and no other S3 bucket can be linked to the directory.
      If you specify only a forward slash (``/``) as the file system path, you can link only one data repository to the file system. You can only specify "/" as the file system path for the first data repository associated with a file system.
     */
  FileSystemPath: string;
  /**
     * For files imported from a data repository, this value determines the stripe count and maximum amount of data per file (in MiB) stored on a single physical disk. The maximum number of disks that a single file can be striped across is limited by the total number of disks that make up the file system or cache.
     The default chunk size is 1,024 MiB (1 GiB) and can go as high as 512,000 MiB (500 GiB). Amazon S3 objects have a maximum size of 5 TB.
     */
  ImportedFileChunkSize?: number;
  /**
   * The configuration for an Amazon S3 data repository linked to an Amazon FSx Lustre file system with a data repository association. The configuration defines which file events (new, changed, or deleted files or directories) are automatically imported from the linked data repository to the file system or automatically exported from the file system to the data repository.
   */
  S3?: S3;
  /**
     * An array of key-value pairs to apply to this resource.
     For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).
     */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::FSx::DataRepositoryAssociation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-datarepositoryassociation.html#aws-resource-fsx-datarepositoryassociation-return-values}
 */
export type FSxDataRepositoryAssociationAttributes = {
  AssociationId: string;
  ResourceARN: string;
};
/**
 * Type definition for `AWS::FSx::DataRepositoryAssociation.AutoExportPolicy`.
 * Describes a data repository association's automatic export policy. The ``AutoExportPolicy`` defines the types of updated objects on the file system that will be automatically exported to the data repository. As you create, modify, or delete files, Amazon FSx for Lustre automatically exports the defined changes asynchronously once your application finishes modifying the file.
 The ``AutoExportPolicy`` is only supported on Amazon FSx for Lustre file systems with a data repository association.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-fsx-datarepositoryassociation-autoexportpolicy.html}
 */
export type AutoExportPolicy = {
  /**
     * The ``AutoExportPolicy`` can have the following event values:
      +   ``NEW`` - New files and directories are automatically exported to the data repository as they are added to the file system.
      +   ``CHANGED`` - Changes to files and directories on the file system are automatically exported to the data repository.
      +   ``DELETED`` - Files and directories are automatically deleted on the data repository when they are deleted on the file system.
      
     You can define any combination of event types for your ``AutoExportPolicy``.
     * @maxLength `3`
     */
  Events: EventType[];
};
/**
 * Type definition for `AWS::FSx::DataRepositoryAssociation.AutoImportPolicy`.
 * Describes the data repository association's automatic import policy. The AutoImportPolicy defines how Amazon FSx keeps your file metadata and directory listings up to date by importing changes to your Amazon FSx for Lustre file system as you modify objects in a linked S3 bucket.
 The ``AutoImportPolicy`` is only supported on Amazon FSx for Lustre file systems with a data repository association.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-fsx-datarepositoryassociation-autoimportpolicy.html}
 */
export type AutoImportPolicy = {
  /**
     * The ``AutoImportPolicy`` can have the following event values:
      +   ``NEW`` - Amazon FSx automatically imports metadata of files added to the linked S3 bucket that do not currently exist in the FSx file system.
      +   ``CHANGED`` - Amazon FSx automatically updates file metadata and invalidates existing file content on the file system as files change in the data repository.
      +   ``DELETED`` - Amazon FSx automatically deletes files on the file system as corresponding files are deleted in the data repository.
      
     You can define any combination of event types for your ``AutoImportPolicy``.
     * @maxLength `3`
     */
  Events: EventType[];
};
/**
 * Type definition for `AWS::FSx::DataRepositoryAssociation.EventType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-fsx-datarepositoryassociation-eventtype.html}
 */
export type EventType = "NEW" | "CHANGED" | "DELETED";
/**
 * Type definition for `AWS::FSx::DataRepositoryAssociation.S3`.
 * The configuration for an Amazon S3 data repository linked to an Amazon FSx Lustre file system with a data repository association. The configuration defines which file events (new, changed, or deleted files or directories) are automatically imported from the linked data repository to the file system or automatically exported from the file system to the data repository.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-fsx-datarepositoryassociation-s3.html}
 */
export type S3 = {
  /**
     * Describes a data repository association's automatic export policy. The ``AutoExportPolicy`` defines the types of updated objects on the file system that will be automatically exported to the data repository. As you create, modify, or delete files, Amazon FSx for Lustre automatically exports the defined changes asynchronously once your application finishes modifying the file.
     The ``AutoExportPolicy`` is only supported on Amazon FSx for Lustre file systems with a data repository association.
     */
  AutoExportPolicy?: AutoExportPolicy;
  /**
     * Describes the data repository association's automatic import policy. The AutoImportPolicy defines how Amazon FSx keeps your file metadata and directory listings up to date by importing changes to your Amazon FSx for Lustre file system as you modify objects in a linked S3 bucket.
     The ``AutoImportPolicy`` is only supported on Amazon FSx for Lustre file systems with a data repository association.
     */
  AutoImportPolicy?: AutoImportPolicy;
};
/**
 * Type definition for `AWS::FSx::DataRepositoryAssociation.Tag`.
 * Specifies a key-value pair for a resource tag.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-fsx-datarepositoryassociation-tag.html}
 */
export type Tag = {
  /**
   * A value that specifies the ``TagKey``, the name of the tag. Tag keys must be unique for the resource to which they are attached.
   * @minLength `1`
   * @maxLength `128`
   */
  Key: string;
  /**
   * A value that specifies the ``TagValue``, the value assigned to the corresponding tag key. Tag values can be null and don't have to be unique in a tag set. For example, you can have a key-value pair in a tag set of ``finances : April`` and also of ``payroll : April``.
   * @maxLength `256`
   */
  Value: string;
};
/**
 * Resource type definition for `AWS::FSx::DataRepositoryAssociation`.
 * Creates an Amazon FSx for Lustre data repository association (DRA). A data repository association is a link between a directory on the file system and an Amazon S3 bucket or prefix. You can have a maximum of 8 data repository associations on a file system. Data repository associations are supported on all FSx for Lustre 2.12 and newer file systems, excluding ``scratch_1`` deployment type.
 Each data repository association must have a unique Amazon FSx file system directory and a unique S3 bucket or prefix associated with it. You can configure a data repository association for automatic import only, for automatic export only, or for both. To learn more about linking a data repository to your file system, see [Linking your file system to an S3 bucket](https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-dra-linked-data-repo.html).
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-datarepositoryassociation.html}
 */
export class FSxDataRepositoryAssociation extends $Resource<
  "AWS::FSx::DataRepositoryAssociation",
  FSxDataRepositoryAssociationProperties,
  FSxDataRepositoryAssociationAttributes
> {
  public static readonly Type = "AWS::FSx::DataRepositoryAssociation";
  public static readonly AttributeNames = [
    "AssociationId" as const,
    "ResourceARN" as const,
  ];
  constructor(
    logicalId: string,
    properties: FSxDataRepositoryAssociationProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      FSxDataRepositoryAssociation.Type,
      properties,
      FSxDataRepositoryAssociation.AttributeNames,
      options,
    );
  }
}
