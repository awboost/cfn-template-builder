import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::SageMaker::ModelBiasJobDefinition
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html}
 */
export type SageMakerModelBiasJobDefinitionProperties = {
  /**
   * The name of the endpoint used to run the monitoring job.
   * @maxLength `63`
   * @pattern `^[a-zA-Z0-9](-*[a-zA-Z0-9])*`
   */
  EndpointName?: string;
  /**
   * The name of the job definition.
   * @maxLength `63`
   * @pattern `^[a-zA-Z0-9](-*[a-zA-Z0-9])*$`
   */
  JobDefinitionName?: string;
  /**
   * Identifies the resources to deploy for a monitoring job.
   */
  JobResources: MonitoringResources;
  /**
   * Container image configuration object for the monitoring job.
   */
  ModelBiasAppSpecification: ModelBiasAppSpecification;
  /**
   * Baseline configuration used to validate that the data conforms to the specified constraints and statistics.
   */
  ModelBiasBaselineConfig?: ModelBiasBaselineConfig;
  /**
   * The inputs for a monitoring job.
   */
  ModelBiasJobInput: ModelBiasJobInput;
  /**
   * The output configuration for monitoring jobs.
   */
  ModelBiasJobOutputConfig: MonitoringOutputConfig;
  /**
   * Networking options for a job, such as network traffic encryption between containers, whether to allow inbound and outbound network calls to and from containers, and the VPC subnets and security groups to use for VPC-enabled jobs.
   */
  NetworkConfig?: NetworkConfig;
  /**
   * The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.
   * @minLength `20`
   * @maxLength `2048`
   * @pattern `^arn:aws[a-z\-]*:iam::\d{12}:role/?[a-zA-Z_0-9+=,.@\-_/]+$`
   */
  RoleArn: string;
  /**
   * Specifies a time limit for how long the monitoring job is allowed to run.
   */
  StoppingCondition?: StoppingCondition;
  /**
   * An array of key-value pairs to apply to this resource.
   * @maxLength `50`
   */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::SageMaker::ModelBiasJobDefinition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#aws-resource-sagemaker-modelbiasjobdefinition-return-values}
 */
export type SageMakerModelBiasJobDefinitionAttributes = {
  /**
   * The time at which the job definition was created.
   */
  CreationTime: string;
  /**
   * The Amazon Resource Name (ARN) of job definition.
   * @minLength `1`
   * @maxLength `256`
   */
  JobDefinitionArn: string;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.BatchTransformInput`.
 * The batch transform input for a monitoring job.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-batchtransforminput.html}
 */
export type BatchTransformInput = {
  /**
   * A URI that identifies the Amazon S3 storage location where Batch Transform Job captures data.
   * @maxLength `512`
   * @pattern `^(https|s3)://([^/]+)/?(.*)$`
   */
  DataCapturedDestinationS3Uri: string;
  /**
   * The dataset format of the data to monitor
   */
  DatasetFormat: DatasetFormat;
  /**
   * Monitoring end time offset, e.g. PT0H
   * @minLength `1`
   * @maxLength `15`
   * @pattern `^.?P.*`
   */
  EndTimeOffset?: string;
  /**
   * JSONpath to locate features in JSONlines dataset
   * @maxLength `256`
   */
  FeaturesAttribute?: string;
  /**
   * Index or JSONpath to locate predicted label(s)
   * @maxLength `256`
   */
  InferenceAttribute?: string;
  /**
   * Path to the filesystem where the endpoint data is available to the container.
   * @maxLength `256`
   * @pattern `.*`
   */
  LocalPath: string;
  /**
   * Index or JSONpath to locate probabilities
   * @maxLength `256`
   */
  ProbabilityAttribute?: string;
  ProbabilityThresholdAttribute?: number;
  /**
   * Whether input data distributed in Amazon S3 is fully replicated or sharded by an S3 key. Defauts to FullyReplicated
   */
  S3DataDistributionType?: "FullyReplicated" | "ShardedByS3Key";
  /**
   * Whether the Pipe or File is used as the input mode for transfering data for the monitoring job. Pipe mode is recommended for large datasets. File mode is useful for small files that fit in memory. Defaults to File.
   */
  S3InputMode?: "Pipe" | "File";
  /**
   * Monitoring start time offset, e.g. -PT1H
   * @minLength `1`
   * @maxLength `15`
   * @pattern `^.?P.*`
   */
  StartTimeOffset?: string;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.ClusterConfig`.
 * Configuration for the cluster used to run model monitoring jobs.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-clusterconfig.html}
 */
export type ClusterConfig = {
  /**
   * The number of ML compute instances to use in the model monitoring job. For distributed processing jobs, specify a value greater than 1. The default value is 1.
   * @min `1`
   * @max `100`
   */
  InstanceCount: number;
  /**
   * The ML compute instance type for the processing job.
   */
  InstanceType: string;
  /**
   * The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance(s) that run the model monitoring job.
   */
  VolumeKmsKeyId?: string;
  /**
   * The size of the ML storage volume, in gigabytes, that you want to provision. You must specify sufficient ML storage for your scenario.
   * @min `1`
   * @max `16384`
   */
  VolumeSizeInGB: number;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.ConstraintsResource`.
 * The baseline constraints resource for a monitoring job.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-constraintsresource.html}
 */
export type ConstraintsResource = {
  /**
   * The Amazon S3 URI for baseline constraint file in Amazon S3 that the current monitoring job should validated against.
   * @maxLength `1024`
   * @pattern `^(https|s3)://([^/]+)/?(.*)$`
   */
  S3Uri?: string;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.Csv`.
 * The CSV format
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-csv.html}
 */
export type Csv = {
  /**
   * A boolean flag indicating if given CSV has header
   */
  Header?: boolean;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.DatasetFormat`.
 * The dataset format of the data to monitor
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-datasetformat.html}
 */
export type DatasetFormat = {
  /**
   * The CSV format
   */
  Csv?: Csv;
  /**
   * The Json format
   */
  Json?: Json;
  /**
   * A flag indicate if the dataset format is Parquet
   */
  Parquet?: boolean;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.EndpointInput`.
 * The endpoint for a monitoring job.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html}
 */
export type EndpointInput = {
  /**
   * Monitoring end time offset, e.g. PT0H
   * @minLength `1`
   * @maxLength `15`
   * @pattern `^.?P.*`
   */
  EndTimeOffset?: string;
  /**
   * The name of the endpoint used to run the monitoring job.
   * @maxLength `63`
   * @pattern `^[a-zA-Z0-9](-*[a-zA-Z0-9])*`
   */
  EndpointName: string;
  /**
   * JSONpath to locate features in JSONlines dataset
   * @maxLength `256`
   */
  FeaturesAttribute?: string;
  /**
   * Index or JSONpath to locate predicted label(s)
   * @maxLength `256`
   */
  InferenceAttribute?: string;
  /**
   * Path to the filesystem where the endpoint data is available to the container.
   * @maxLength `256`
   * @pattern `.*`
   */
  LocalPath: string;
  /**
   * Index or JSONpath to locate probabilities
   * @maxLength `256`
   */
  ProbabilityAttribute?: string;
  ProbabilityThresholdAttribute?: number;
  /**
   * Whether input data distributed in Amazon S3 is fully replicated or sharded by an S3 key. Defauts to FullyReplicated
   */
  S3DataDistributionType?: "FullyReplicated" | "ShardedByS3Key";
  /**
   * Whether the Pipe or File is used as the input mode for transfering data for the monitoring job. Pipe mode is recommended for large datasets. File mode is useful for small files that fit in memory. Defaults to File.
   */
  S3InputMode?: "Pipe" | "File";
  /**
   * Monitoring start time offset, e.g. -PT1H
   * @minLength `1`
   * @maxLength `15`
   * @pattern `^.?P.*`
   */
  StartTimeOffset?: string;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.Json`.
 * The Json format
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-json.html}
 */
export type Json = {
  /**
   * A boolean flag indicating if it is JSON line format
   */
  Line?: boolean;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.ModelBiasAppSpecification`.
 * Container image configuration object for the monitoring job.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasappspecification.html}
 */
export type ModelBiasAppSpecification = {
  /**
   * The S3 URI to an analysis configuration file
   * @maxLength `1024`
   * @pattern `^(https|s3)://([^/]+)/?(.*)$`
   */
  ConfigUri: string;
  /**
   * Sets the environment variables in the Docker container
   */
  Environment?: Record<string, string | string>;
  /**
   * The container image to be run by the monitoring job.
   * @maxLength `255`
   * @pattern `.*`
   */
  ImageUri: string;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.ModelBiasBaselineConfig`.
 * Baseline configuration used to validate that the data conforms to the specified constraints and statistics.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasbaselineconfig.html}
 */
export type ModelBiasBaselineConfig = {
  /**
   * The name of a processing job
   * @minLength `1`
   * @maxLength `63`
   * @pattern `^[a-zA-Z0-9](-*[a-zA-Z0-9])*$`
   */
  BaseliningJobName?: string;
  /**
   * The baseline constraints resource for a monitoring job.
   */
  ConstraintsResource?: ConstraintsResource;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.ModelBiasJobInput`.
 * The inputs for a monitoring job.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasjobinput.html}
 */
export type ModelBiasJobInput = {
  /**
   * The batch transform input for a monitoring job.
   */
  BatchTransformInput?: BatchTransformInput;
  /**
   * The endpoint for a monitoring job.
   */
  EndpointInput?: EndpointInput;
  /**
   * Ground truth input provided in S3
   */
  GroundTruthS3Input: MonitoringGroundTruthS3Input;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.MonitoringGroundTruthS3Input`.
 * Ground truth input provided in S3
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringgroundtruths3input.html}
 */
export type MonitoringGroundTruthS3Input = {
  /**
   * A URI that identifies the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job.
   * @maxLength `512`
   * @pattern `^(https|s3)://([^/]+)/?(.*)$`
   */
  S3Uri: string;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.MonitoringOutput`.
 * The output object for a monitoring job.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringoutput.html}
 */
export type MonitoringOutput = {
  /**
   * Information about where and how to store the results of a monitoring job.
   */
  S3Output: S3Output;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.MonitoringOutputConfig`.
 * The output configuration for monitoring jobs.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringoutputconfig.html}
 */
export type MonitoringOutputConfig = {
  /**
   * The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt the model artifacts at rest using Amazon S3 server-side encryption.
   * @maxLength `2048`
   * @pattern `.*`
   */
  KmsKeyId?: string;
  /**
   * Monitoring outputs for monitoring jobs. This is where the output of the periodic monitoring jobs is uploaded.
   */
  MonitoringOutputs: MonitoringOutput[];
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.MonitoringResources`.
 * Identifies the resources to deploy for a monitoring job.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringresources.html}
 */
export type MonitoringResources = {
  /**
   * Configuration for the cluster used to run model monitoring jobs.
   */
  ClusterConfig: ClusterConfig;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.NetworkConfig`.
 * Networking options for a job, such as network traffic encryption between containers, whether to allow inbound and outbound network calls to and from containers, and the VPC subnets and security groups to use for VPC-enabled jobs.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-networkconfig.html}
 */
export type NetworkConfig = {
  /**
   * Whether to encrypt all communications between distributed processing jobs. Choose True to encrypt communications. Encryption provides greater security for distributed processing jobs, but the processing might take longer.
   */
  EnableInterContainerTrafficEncryption?: boolean;
  /**
   * Whether to allow inbound and outbound network calls to and from the containers used for the processing job.
   */
  EnableNetworkIsolation?: boolean;
  /**
   * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC.
   */
  VpcConfig?: VpcConfig;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.S3Output`.
 * Information about where and how to store the results of a monitoring job.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-s3output.html}
 */
export type S3Output = {
  /**
   * The local path to the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job. LocalPath is an absolute path for the output data.
   * @maxLength `256`
   * @pattern `.*`
   */
  LocalPath: string;
  /**
   * Whether to upload the results of the monitoring job continuously or after the job completes.
   */
  S3UploadMode?: "Continuous" | "EndOfJob";
  /**
   * A URI that identifies the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job.
   * @maxLength `512`
   * @pattern `^(https|s3)://([^/]+)/?(.*)$`
   */
  S3Uri: string;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.StoppingCondition`.
 * Specifies a time limit for how long the monitoring job is allowed to run.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-stoppingcondition.html}
 */
export type StoppingCondition = {
  /**
   * The maximum runtime allowed in seconds.
   * @min `1`
   * @max `86400`
   */
  MaxRuntimeInSeconds: number;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.Tag`.
 * A key-value pair to associate with a resource.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-tag.html}
 */
export type Tag = {
  /**
   * The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @minLength `1`
   * @maxLength `128`
   * @pattern `^([\p{L}\p{Z}\p{N}_.:/=+\-@]*)$`
   */
  Key: string;
  /**
   * The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @maxLength `256`
   * @pattern `^([\p{L}\p{Z}\p{N}_.:/=+\-@]*)$`
   */
  Value: string;
};
/**
 * Type definition for `AWS::SageMaker::ModelBiasJobDefinition.VpcConfig`.
 * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-vpcconfig.html}
 */
export type VpcConfig = {
  /**
   * The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the Subnets field.
   * @minLength `1`
   * @maxLength `5`
   */
  SecurityGroupIds: string[];
  /**
   * The ID of the subnets in the VPC to which you want to connect to your monitoring jobs.
   * @minLength `1`
   * @maxLength `16`
   */
  Subnets: string[];
};
/**
 * Resource Type definition for AWS::SageMaker::ModelBiasJobDefinition
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html}
 */
export class SageMakerModelBiasJobDefinition extends $Resource<
  "AWS::SageMaker::ModelBiasJobDefinition",
  SageMakerModelBiasJobDefinitionProperties,
  SageMakerModelBiasJobDefinitionAttributes
> {
  public static readonly Type = "AWS::SageMaker::ModelBiasJobDefinition";
  public static readonly AttributeNames = [
    "CreationTime" as const,
    "JobDefinitionArn" as const,
  ];
  constructor(
    logicalId: string,
    properties: SageMakerModelBiasJobDefinitionProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      SageMakerModelBiasJobDefinition.Type,
      properties,
      SageMakerModelBiasJobDefinition.AttributeNames,
      options,
    );
  }
}
