import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::Backup::ReportPlan`.
 * Contains detailed information about a report plan in AWS Backup Audit Manager.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backup-reportplan.html}
 */
export type BackupReportPlanProperties = {
  /**
   * A structure that contains information about where and how to deliver your reports, specifically your Amazon S3 bucket name, S3 key prefix, and the formats of your reports.
   */
  ReportDeliveryChannel: {
    /**
     * A list of the format of your reports: CSV, JSON, or both. If not specified, the default format is CSV.
     */
    Formats?: string[];
    /**
     * The unique name of the S3 bucket that receives your reports.
     */
    S3BucketName: string;
    /**
     * The prefix for where AWS Backup Audit Manager delivers your reports to Amazon S3. The prefix is this part of the following path: s3://your-bucket-name/prefix/Backup/us-west-2/year/month/day/report-name. If not specified, there is no prefix.
     */
    S3KeyPrefix?: string;
  };
  /**
   * An optional description of the report plan with a maximum of 1,024 characters.
   * @maxLength `1024`
   * @pattern `.*\S.*`
   */
  ReportPlanDescription?: string;
  /**
   * The unique name of the report plan. The name must be between 1 and 256 characters, starting with a letter, and consisting of letters (a-z, A-Z), numbers (0-9), and underscores (_).
   * @minLength `1`
   * @maxLength `256`
   * @pattern `[a-zA-Z][_a-zA-Z0-9]*`
   */
  ReportPlanName?: string;
  /**
   * Metadata that you can assign to help organize the report plans that you create. Each tag is a key-value pair.
   */
  ReportPlanTags?: Tag[];
  /**
   * Identifies the report template for the report. Reports are built using a report template.
   */
  ReportSetting: {
    /**
     * The list of AWS accounts that a report covers.
     */
    Accounts?: string[];
    /**
     * The Amazon Resource Names (ARNs) of the frameworks a report covers.
     */
    FrameworkArns?: string[];
    /**
     * The list of AWS organization units that a report covers.
     */
    OrganizationUnits?: string[];
    /**
     * The list of AWS regions that a report covers.
     */
    Regions?: string[];
    /**
     * Identifies the report template for the report. Reports are built using a report template. The report templates are: `BACKUP_JOB_REPORT | COPY_JOB_REPORT | RESTORE_JOB_REPORT`
     */
    ReportTemplate: string;
  };
};
/**
 * Attribute type definition for `AWS::Backup::ReportPlan`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backup-reportplan.html#aws-resource-backup-reportplan-return-values}
 */
export type BackupReportPlanAttributes = {
  /**
   * An Amazon Resource Name (ARN) that uniquely identifies a resource. The format of the ARN depends on the resource type.
   */
  ReportPlanArn: string;
};
/**
 * Type definition for `AWS::Backup::ReportPlan.Tag`.
 * A key-value pair to associate with a resource.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-backup-reportplan-tag.html}
 */
export type Tag = {
  /**
   * The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @minLength `1`
   * @maxLength `128`
   */
  Key?: string;
  /**
   * The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @maxLength `256`
   */
  Value?: string;
};
/**
 * Resource type definition for `AWS::Backup::ReportPlan`.
 * Contains detailed information about a report plan in AWS Backup Audit Manager.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backup-reportplan.html}
 */
export class BackupReportPlan extends $Resource<
  "AWS::Backup::ReportPlan",
  BackupReportPlanProperties,
  BackupReportPlanAttributes
> {
  public static readonly Type = "AWS::Backup::ReportPlan";
  public static readonly AttributeNames = ["ReportPlanArn" as const];
  constructor(
    logicalId: string,
    properties: BackupReportPlanProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      BackupReportPlan.Type,
      properties,
      BackupReportPlan.AttributeNames,
      options,
    );
  }
}
