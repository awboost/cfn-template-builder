import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource schema for AWS::Personalize::Dataset.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html}
 */
export type PersonalizeDatasetProperties = {
  /**
   * The Amazon Resource Name (ARN) of the dataset group to add the dataset to
   * @maxLength `256`
   * @pattern `arn:([a-z\d-]+):personalize:.*:.*:.+`
   */
  DatasetGroupArn: string;
  /**
   * Initial DatasetImportJob for the created dataset
   */
  DatasetImportJob?: DatasetImportJob;
  /**
   * The type of dataset
   * @maxLength `256`
   */
  DatasetType: "Interactions" | "Items" | "Users";
  /**
   * The name for the dataset
   * @minLength `1`
   * @maxLength `63`
   * @pattern `^[a-zA-Z0-9][a-zA-Z0-9\-_]*`
   */
  Name: string;
  /**
   * The ARN of the schema to associate with the dataset. The schema defines the dataset fields.
   * @maxLength `256`
   * @pattern `arn:([a-z\d-]+):personalize:.*:.*:.+`
   */
  SchemaArn: string;
};
/**
 * Attribute type definition for `AWS::Personalize::Dataset`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html#aws-resource-personalize-dataset-return-values}
 */
export type PersonalizeDatasetAttributes = {
  /**
   * The ARN of the dataset
   * @maxLength `256`
   * @pattern `arn:([a-z\d-]+):personalize:.*:.*:.+`
   */
  DatasetArn: string;
};
/**
 * Type definition for `AWS::Personalize::Dataset.DatasetImportJob`.
 * Initial DatasetImportJob for the created dataset
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-dataset-datasetimportjob.html}
 */
export type DatasetImportJob = {
  /**
   * The Amazon S3 bucket that contains the training data to import.
   */
  DataSource?: {
    /**
     * The path to the Amazon S3 bucket where the data that you want to upload to your dataset is stored.
     * @maxLength `256`
     * @pattern `(s3|http|https)://.+`
     */
    DataLocation?: string;
  };
  /**
   * The ARN of the dataset that receives the imported data
   * @maxLength `256`
   * @pattern `arn:([a-z\d-]+):personalize:.*:.*:.+`
   */
  DatasetArn?: string;
  /**
   * The ARN of the dataset import job
   * @maxLength `256`
   * @pattern `arn:([a-z\d-]+):personalize:.*:.*:.+`
   */
  DatasetImportJobArn?: string;
  /**
   * The name for the dataset import job.
   * @minLength `1`
   * @maxLength `63`
   * @pattern `^[a-zA-Z0-9][a-zA-Z0-9\-_]*`
   */
  JobName?: string;
  /**
   * The ARN of the IAM role that has permissions to read from the Amazon S3 data source.
   * @maxLength `256`
   * @pattern `arn:([a-z\d-]+):iam::\d{12}:role/?[a-zA-Z_0-9+=,.@\-_/]+`
   */
  RoleArn?: string;
};
/**
 * Resource schema for AWS::Personalize::Dataset.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html}
 */
export class PersonalizeDataset extends $Resource<
  "AWS::Personalize::Dataset",
  PersonalizeDatasetProperties,
  PersonalizeDatasetAttributes
> {
  public static readonly Type = "AWS::Personalize::Dataset";
  public static readonly AttributeNames = ["DatasetArn" as const];
  constructor(
    logicalId: string,
    properties: PersonalizeDatasetProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      PersonalizeDataset.Type,
      properties,
      PersonalizeDataset.AttributeNames,
      options,
    );
  }
}
