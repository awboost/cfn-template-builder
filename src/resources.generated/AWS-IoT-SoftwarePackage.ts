import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::IoT::SoftwarePackage`.
 * resource definition
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-softwarepackage.html}
 */
export type IoTSoftwarePackageProperties = {
  /**
   * @maxLength `1024`
   * @pattern `^[^\p{C}]+$`
   */
  Description?: string;
  /**
   * @minLength `1`
   * @maxLength `128`
   * @pattern `^[a-zA-Z0-9-_.]+$`
   */
  PackageName?: string;
  /**
   * An array of key-value pairs to apply to this resource.
   * @maxLength `50`
   */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::IoT::SoftwarePackage`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-softwarepackage.html#aws-resource-iot-softwarepackage-return-values}
 */
export type IoTSoftwarePackageAttributes = {
  PackageArn: string;
};
/**
 * Type definition for `AWS::IoT::SoftwarePackage.Tag`.
 * A key-value pair to associate with a resource.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-softwarepackage-tag.html}
 */
export type Tag = {
  /**
   * The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @minLength `1`
   * @maxLength `128`
   * @pattern `^([\p{L}\p{Z}\p{N}_.:/=+\-@]*)$`
   */
  Key: string;
  /**
   * The value for the tag. You can specify a value that is 1 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @minLength `1`
   * @maxLength `256`
   */
  Value: string;
};
/**
 * Resource type definition for `AWS::IoT::SoftwarePackage`.
 * resource definition
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-softwarepackage.html}
 */
export class IoTSoftwarePackage extends $Resource<
  "AWS::IoT::SoftwarePackage",
  IoTSoftwarePackageProperties,
  IoTSoftwarePackageAttributes
> {
  public static readonly Type = "AWS::IoT::SoftwarePackage";
  public static readonly AttributeNames = ["PackageArn" as const];
  constructor(
    logicalId: string,
    properties: IoTSoftwarePackageProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      IoTSoftwarePackage.Type,
      properties,
      IoTSoftwarePackage.AttributeNames,
      options,
    );
  }
}
