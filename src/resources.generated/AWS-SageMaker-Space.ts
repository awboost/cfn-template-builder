import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::SageMaker::Space
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-space.html}
 */
export type SageMakerSpaceProperties = {
  /**
   * The ID of the associated Domain.
   * @minLength `1`
   * @maxLength `63`
   */
  DomainId: string;
  /**
   * A name for the Space.
   * @minLength `1`
   * @maxLength `63`
   */
  SpaceName: string;
  /**
   * A collection of settings.
   */
  SpaceSettings?: SpaceSettings;
  /**
   * A list of tags to apply to the space.
   * @maxLength `50`
   */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::SageMaker::Space`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-space.html#aws-resource-sagemaker-space-return-values}
 */
export type SageMakerSpaceAttributes = {
  /**
   * The space Amazon Resource Name (ARN).
   * @maxLength `256`
   * @pattern `arn:aws[a-z\-]*:sagemaker:[a-z0-9\-]*:[0-9]{12}:space/.*`
   */
  SpaceArn: string;
};
/**
 * Type definition for `AWS::SageMaker::Space.CustomImage`.
 * A custom SageMaker image.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-space-customimage.html}
 */
export type CustomImage = {
  /**
   * The Name of the AppImageConfig.
   * @maxLength `63`
   * @pattern `^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}`
   */
  AppImageConfigName: string;
  /**
   * The name of the CustomImage. Must be unique to your account.
   * @maxLength `63`
   * @pattern `^[a-zA-Z0-9]([-.]?[a-zA-Z0-9]){0,62}$`
   */
  ImageName: string;
  /**
   * The version number of the CustomImage.
   */
  ImageVersionNumber?: number;
};
/**
 * Type definition for `AWS::SageMaker::Space.JupyterServerAppSettings`.
 * The JupyterServer app settings.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-space-jupyterserverappsettings.html}
 */
export type JupyterServerAppSettings = {
  DefaultResourceSpec?: ResourceSpec;
};
/**
 * Type definition for `AWS::SageMaker::Space.KernelGatewayAppSettings`.
 * The kernel gateway app settings.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-space-kernelgatewayappsettings.html}
 */
export type KernelGatewayAppSettings = {
  /**
   * A list of custom SageMaker images that are configured to run as a KernelGateway app.
   * @maxLength `30`
   */
  CustomImages?: CustomImage[];
  /**
   * The default instance type and the Amazon Resource Name (ARN) of the default SageMaker image used by the KernelGateway app.
   */
  DefaultResourceSpec?: ResourceSpec;
};
/**
 * Type definition for `AWS::SageMaker::Space.ResourceSpec`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-space-resourcespec.html}
 */
export type ResourceSpec = {
  /**
   * The instance type that the image version runs on.
   */
  InstanceType?:
    | "system"
    | "ml.t3.micro"
    | "ml.t3.small"
    | "ml.t3.medium"
    | "ml.t3.large"
    | "ml.t3.xlarge"
    | "ml.t3.2xlarge"
    | "ml.m5.large"
    | "ml.m5.xlarge"
    | "ml.m5.2xlarge"
    | "ml.m5.4xlarge"
    | "ml.m5.8xlarge"
    | "ml.m5.12xlarge"
    | "ml.m5.16xlarge"
    | "ml.m5.24xlarge"
    | "ml.c5.large"
    | "ml.c5.xlarge"
    | "ml.c5.2xlarge"
    | "ml.c5.4xlarge"
    | "ml.c5.9xlarge"
    | "ml.c5.12xlarge"
    | "ml.c5.18xlarge"
    | "ml.c5.24xlarge"
    | "ml.p3.2xlarge"
    | "ml.p3.8xlarge"
    | "ml.p3.16xlarge"
    | "ml.g4dn.xlarge"
    | "ml.g4dn.2xlarge"
    | "ml.g4dn.4xlarge"
    | "ml.g4dn.8xlarge"
    | "ml.g4dn.12xlarge"
    | "ml.g4dn.16xlarge"
    | "ml.r5.large"
    | "ml.r5.xlarge"
    | "ml.r5.2xlarge"
    | "ml.r5.4xlarge"
    | "ml.r5.8xlarge"
    | "ml.r5.12xlarge"
    | "ml.r5.16xlarge"
    | "ml.r5.24xlarge"
    | "ml.p3dn.24xlarge"
    | "ml.m5d.large"
    | "ml.m5d.xlarge"
    | "ml.m5d.2xlarge"
    | "ml.m5d.4xlarge"
    | "ml.m5d.8xlarge"
    | "ml.m5d.12xlarge"
    | "ml.m5d.16xlarge"
    | "ml.m5d.24xlarge"
    | "ml.g5.xlarge"
    | "ml.g5.2xlarge"
    | "ml.g5.4xlarge"
    | "ml.g5.8xlarge"
    | "ml.g5.12xlarge"
    | "ml.g5.16xlarge"
    | "ml.g5.24xlarge"
    | "ml.g5.48xlarge"
    | "ml.p4d.24xlarge"
    | "ml.p4de.24xlarge"
    | "ml.geospatial.interactive";
  /**
   * The ARN of the SageMaker image that the image version belongs to.
   * @maxLength `256`
   * @pattern `^arn:aws(-[\w]+)*:sagemaker:.+:[0-9]{12}:image/[a-z0-9]([-.]?[a-z0-9])*$`
   */
  SageMakerImageArn?: string;
  /**
   * The ARN of the image version created on the instance.
   * @maxLength `256`
   * @pattern `^arn:aws(-[\w]+)*:sagemaker:.+:[0-9]{12}:image-version/[a-z0-9]([-.]?[a-z0-9])/‍*[0-9]+$`
   */
  SageMakerImageVersionArn?: string;
};
/**
 * Type definition for `AWS::SageMaker::Space.SpaceSettings`.
 * A collection of settings that apply to spaces of Amazon SageMaker Studio. These settings are specified when the CreateSpace API is called.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-space-spacesettings.html}
 */
export type SpaceSettings = {
  /**
   * The Jupyter server's app settings.
   */
  JupyterServerAppSettings?: JupyterServerAppSettings;
  /**
   * The kernel gateway app settings.
   */
  KernelGatewayAppSettings?: KernelGatewayAppSettings;
};
/**
 * Type definition for `AWS::SageMaker::Space.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-space-tag.html}
 */
export type Tag = {
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Key: string;
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Value: string;
};
/**
 * Resource Type definition for AWS::SageMaker::Space
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-space.html}
 */
export class SageMakerSpace extends $Resource<
  "AWS::SageMaker::Space",
  SageMakerSpaceProperties,
  SageMakerSpaceAttributes
> {
  public static readonly Type = "AWS::SageMaker::Space";
  public static readonly AttributeNames = ["SpaceArn" as const];
  constructor(
    logicalId: string,
    properties: SageMakerSpaceProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      SageMakerSpace.Type,
      properties,
      SageMakerSpace.AttributeNames,
      options,
    );
  }
}
