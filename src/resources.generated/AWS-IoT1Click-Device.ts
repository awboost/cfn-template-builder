import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::IoT1Click::Device
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot1click-device.html}
 */
export type IoT1ClickDeviceProperties = {
  Enabled: boolean;
};
/**
 * Attribute type definition for `AWS::IoT1Click::Device`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot1click-device.html#aws-resource-iot1click-device-return-values}
 */
export type IoT1ClickDeviceAttributes = {
  Arn: string;
  DeviceId: string;
};
/**
 * Resource Type definition for AWS::IoT1Click::Device
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot1click-device.html}
 */
export class IoT1ClickDevice extends $Resource<
  "AWS::IoT1Click::Device",
  IoT1ClickDeviceProperties,
  IoT1ClickDeviceAttributes
> {
  public static readonly Type = "AWS::IoT1Click::Device";
  public static readonly AttributeNames = ["Arn" as const, "DeviceId" as const];
  constructor(
    logicalId: string,
    properties: IoT1ClickDeviceProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      IoT1ClickDevice.Type,
      properties,
      IoT1ClickDevice.AttributeNames,
      options,
    );
  }
}
