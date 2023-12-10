import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::SageMaker::EndpointConfig
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html}
 */
export type SageMakerEndpointConfigProperties = {
  AsyncInferenceConfig?: AsyncInferenceConfig;
  DataCaptureConfig?: DataCaptureConfig;
  EndpointConfigName?: string;
  ExplainerConfig?: ExplainerConfig;
  KmsKeyId?: string;
  ProductionVariants: ProductionVariant[];
  ShadowProductionVariants?: ProductionVariant[];
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::SageMaker::EndpointConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#aws-resource-sagemaker-endpointconfig-return-values}
 */
export type SageMakerEndpointConfigAttributes = {
  Id: string;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.AsyncInferenceClientConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceclientconfig.html}
 */
export type AsyncInferenceClientConfig = {
  MaxConcurrentInvocationsPerInstance?: number;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.AsyncInferenceConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceconfig.html}
 */
export type AsyncInferenceConfig = {
  ClientConfig?: AsyncInferenceClientConfig;
  OutputConfig: AsyncInferenceOutputConfig;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.AsyncInferenceNotificationConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferencenotificationconfig.html}
 */
export type AsyncInferenceNotificationConfig = {
  ErrorTopic?: string;
  IncludeInferenceResponseIn?: string[];
  SuccessTopic?: string;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.AsyncInferenceOutputConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceoutputconfig.html}
 */
export type AsyncInferenceOutputConfig = {
  KmsKeyId?: string;
  NotificationConfig?: AsyncInferenceNotificationConfig;
  S3FailurePath?: string;
  S3OutputPath?: string;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.CaptureContentTypeHeader`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-capturecontenttypeheader.html}
 */
export type CaptureContentTypeHeader = {
  CsvContentTypes?: string[];
  JsonContentTypes?: string[];
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.CaptureOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-captureoption.html}
 */
export type CaptureOption = {
  CaptureMode: string;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.ClarifyExplainerConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-clarifyexplainerconfig.html}
 */
export type ClarifyExplainerConfig = {
  EnableExplanations?: string;
  InferenceConfig?: ClarifyInferenceConfig;
  ShapConfig: ClarifyShapConfig;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.ClarifyFeatureType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-clarifyfeaturetype.html}
 */
export type ClarifyFeatureType = Record<string, any>;
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.ClarifyHeader`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-clarifyheader.html}
 */
export type ClarifyHeader = Record<string, any>;
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.ClarifyInferenceConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-clarifyinferenceconfig.html}
 */
export type ClarifyInferenceConfig = {
  ContentTemplate?: string;
  FeatureHeaders?: ClarifyHeader[];
  FeatureTypes?: ClarifyFeatureType[];
  FeaturesAttribute?: string;
  LabelAttribute?: string;
  LabelHeaders?: ClarifyHeader[];
  LabelIndex?: number;
  MaxPayloadInMB?: number;
  MaxRecordCount?: number;
  ProbabilityAttribute?: string;
  ProbabilityIndex?: number;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.ClarifyShapBaselineConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-clarifyshapbaselineconfig.html}
 */
export type ClarifyShapBaselineConfig = {
  MimeType?: string;
  ShapBaseline?: string;
  ShapBaselineUri?: string;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.ClarifyShapConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-clarifyshapconfig.html}
 */
export type ClarifyShapConfig = {
  NumberOfSamples?: number;
  Seed?: number;
  ShapBaselineConfig: ClarifyShapBaselineConfig;
  TextConfig?: ClarifyTextConfig;
  UseLogit?: boolean;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.ClarifyTextConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-clarifytextconfig.html}
 */
export type ClarifyTextConfig = {
  Granularity: string;
  Language: string;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.DataCaptureConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-datacaptureconfig.html}
 */
export type DataCaptureConfig = {
  CaptureContentTypeHeader?: CaptureContentTypeHeader;
  CaptureOptions: CaptureOption[];
  DestinationS3Uri: string;
  EnableCapture?: boolean;
  InitialSamplingPercentage: number;
  KmsKeyId?: string;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.ExplainerConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-explainerconfig.html}
 */
export type ExplainerConfig = {
  ClarifyExplainerConfig?: ClarifyExplainerConfig;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.ProductionVariant`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant.html}
 */
export type ProductionVariant = {
  AcceleratorType?: string;
  ContainerStartupHealthCheckTimeoutInSeconds?: number;
  EnableSSMAccess?: boolean;
  InitialInstanceCount?: number;
  InitialVariantWeight: number;
  InstanceType?: string;
  ModelDataDownloadTimeoutInSeconds?: number;
  ModelName: string;
  ServerlessConfig?: ServerlessConfig;
  VariantName: string;
  VolumeSizeInGB?: number;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.ServerlessConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-serverlessconfig.html}
 */
export type ServerlessConfig = {
  MaxConcurrency: number;
  MemorySizeInMB: number;
  ProvisionedConcurrency?: number;
};
/**
 * Type definition for `AWS::SageMaker::EndpointConfig.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-tag.html}
 */
export type Tag = {
  Key: string;
  Value: string;
};
/**
 * Resource Type definition for AWS::SageMaker::EndpointConfig
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html}
 */
export class SageMakerEndpointConfig extends $Resource<
  "AWS::SageMaker::EndpointConfig",
  SageMakerEndpointConfigProperties,
  SageMakerEndpointConfigAttributes
> {
  public static readonly Type = "AWS::SageMaker::EndpointConfig";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: SageMakerEndpointConfigProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      SageMakerEndpointConfig.Type,
      properties,
      SageMakerEndpointConfig.AttributeNames,
      options,
    );
  }
}
