import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * The AWS::ECR::Repository resource specifies an Amazon Elastic Container Registry (Amazon ECR) repository, where users can push and pull Docker images. For more information, see https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecr-repository.html}
 */
export type ECRRepositoryProperties = {
  /**
   * If true, deleting the repository force deletes the contents of the repository. Without a force delete, you can only delete empty repositories.
   */
  EmptyOnDelete?: boolean;
  /**
     * The encryption configuration for the repository. This determines how the contents of your repository are encrypted at rest.
    
    By default, when no encryption configuration is set or the AES256 encryption type is used, Amazon ECR uses server-side encryption with Amazon S3-managed encryption keys which encrypts your data at rest using an AES-256 encryption algorithm. This does not require any action on your part.
    
    For more information, see https://docs.aws.amazon.com/AmazonECR/latest/userguide/encryption-at-rest.html
     */
  EncryptionConfiguration?: EncryptionConfiguration;
  /**
   * The image scanning configuration for the repository. This setting determines whether images are scanned for known vulnerabilities after being pushed to the repository.
   */
  ImageScanningConfiguration?: ImageScanningConfiguration;
  /**
   * The image tag mutability setting for the repository.
   */
  ImageTagMutability?: "MUTABLE" | "IMMUTABLE";
  /**
   * The LifecyclePolicy property type specifies a lifecycle policy. For information about lifecycle policy syntax, see https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html
   */
  LifecyclePolicy?: LifecyclePolicy;
  /**
   * The name to use for the repository. The repository name may be specified on its own (such as nginx-web-app) or it can be prepended with a namespace to group the repository into a category (such as project-a/nginx-web-app). If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the repository name. For more information, see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html.
   * @minLength `2`
   * @maxLength `256`
   * @pattern `^(?=.{2,256}$)((?:[a-z0-9]+(?:[._-][a-z0-9]+)/‍*)*[a-z0-9]+(?:[._-][a-z0-9]+)*)$`
   */
  RepositoryName?: string;
  /**
   * The JSON repository policy text to apply to the repository. For more information, see https://docs.aws.amazon.com/AmazonECR/latest/userguide/RepositoryPolicyExamples.html in the Amazon Elastic Container Registry User Guide.
   */
  RepositoryPolicyText?: Record<string, any> | string;
  /**
   * An array of key-value pairs to apply to this resource.
   * @maxLength `50`
   */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::ECR::Repository`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecr-repository.html#aws-resource-ecr-repository-return-values}
 */
export type ECRRepositoryAttributes = {
  Arn: string;
  RepositoryUri: string;
};
/**
 * Type definition for `AWS::ECR::Repository.EncryptionConfiguration`.
 * The encryption configuration for the repository. This determines how the contents of your repository are encrypted at rest.

By default, when no encryption configuration is set or the AES256 encryption type is used, Amazon ECR uses server-side encryption with Amazon S3-managed encryption keys which encrypts your data at rest using an AES-256 encryption algorithm. This does not require any action on your part.

For more information, see https://docs.aws.amazon.com/AmazonECR/latest/userguide/encryption-at-rest.html
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecr-repository-encryptionconfiguration.html}
 */
export type EncryptionConfiguration = {
  /**
   * The encryption type to use.
   */
  EncryptionType: EncryptionType;
  /**
   * If you use the KMS encryption type, specify the CMK to use for encryption. The alias, key ID, or full ARN of the CMK can be specified. The key must exist in the same Region as the repository. If no key is specified, the default AWS managed CMK for Amazon ECR will be used.
   * @minLength `1`
   * @maxLength `2048`
   */
  KmsKey?: string;
};
/**
 * Type definition for `AWS::ECR::Repository.EncryptionType`.
 * The encryption type to use.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecr-repository-encryptiontype.html}
 */
export type EncryptionType = "AES256" | "KMS";
/**
 * Type definition for `AWS::ECR::Repository.ImageScanningConfiguration`.
 * The image scanning configuration for the repository. This setting determines whether images are scanned for known vulnerabilities after being pushed to the repository.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecr-repository-imagescanningconfiguration.html}
 */
export type ImageScanningConfiguration = {
  /**
   * The setting that determines whether images are scanned after being pushed to a repository.
   */
  ScanOnPush?: boolean;
};
/**
 * Type definition for `AWS::ECR::Repository.LifecyclePolicy`.
 * The LifecyclePolicy property type specifies a lifecycle policy. For information about lifecycle policy syntax, see https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecr-repository-lifecyclepolicy.html}
 */
export type LifecyclePolicy = {
  /**
   * The JSON repository policy text to apply to the repository.
   * @minLength `100`
   * @maxLength `30720`
   */
  LifecyclePolicyText?: string;
  /**
   * The AWS account ID associated with the registry that contains the repository. If you do not specify a registry, the default registry is assumed.
   * @minLength `12`
   * @maxLength `12`
   * @pattern `^[0-9]{12}$`
   */
  RegistryId?: string;
};
/**
 * Type definition for `AWS::ECR::Repository.Tag`.
 * A key-value pair to associate with a resource.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecr-repository-tag.html}
 */
export type Tag = {
  /**
   * The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @minLength `1`
   * @maxLength `127`
   */
  Key: string;
  /**
   * The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @minLength `1`
   * @maxLength `255`
   */
  Value: string;
};
/**
 * The AWS::ECR::Repository resource specifies an Amazon Elastic Container Registry (Amazon ECR) repository, where users can push and pull Docker images. For more information, see https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecr-repository.html}
 */
export class ECRRepository extends $Resource<
  "AWS::ECR::Repository",
  ECRRepositoryProperties,
  ECRRepositoryAttributes
> {
  public static readonly Type = "AWS::ECR::Repository";
  public static readonly AttributeNames = [
    "Arn" as const,
    "RepositoryUri" as const,
  ];
  constructor(
    logicalId: string,
    properties: ECRRepositoryProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      ECRRepository.Type,
      properties,
      ECRRepository.AttributeNames,
      options,
    );
  }
}
