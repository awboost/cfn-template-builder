import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::IoTWireless::WirelessDevice`.
 * Create and manage wireless gateways, including LoRa gateways.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-wirelessdevice.html}
 */
export type IoTWirelessWirelessDeviceProperties = {
  /**
   * Wireless device description
   * @maxLength `2048`
   */
  Description?: string;
  /**
   * Wireless device destination name
   * @maxLength `128`
   */
  DestinationName: string;
  /**
   * The date and time when the most recent uplink was received.
   */
  LastUplinkReceivedAt?: string;
  /**
   * The combination of Package, Station and Model which represents the version of the LoRaWAN Wireless Device.
   */
  LoRaWAN?: LoRaWANDevice;
  /**
   * Wireless device name
   * @maxLength `256`
   */
  Name?: string;
  /**
   * A list of key-value pairs that contain metadata for the device. Currently not supported, will not create if tags are passed.
   * @maxLength `200`
   */
  Tags?: Tag[];
  /**
   * Thing arn. Passed into update to associate Thing with Wireless device.
   */
  ThingArn?: string;
  /**
   * Wireless device type, currently only Sidewalk and LoRa
   */
  Type: "Sidewalk" | "LoRaWAN";
};
/**
 * Attribute type definition for `AWS::IoTWireless::WirelessDevice`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-wirelessdevice.html#aws-resource-iotwireless-wirelessdevice-return-values}
 */
export type IoTWirelessWirelessDeviceAttributes = {
  /**
   * Wireless device arn. Returned after successful create.
   */
  Arn: string;
  /**
   * Wireless device Id. Returned after successful create.
   * @maxLength `256`
   */
  Id: string;
  /**
   * Thing Arn. If there is a Thing created, this can be returned with a Get call.
   */
  ThingName: string;
};
/**
 * Type definition for `AWS::IoTWireless::WirelessDevice.AbpV10x`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotwireless-wirelessdevice-abpv10x.html}
 */
export type AbpV10x = {
  /**
   * @pattern `[a-fA-F0-9]{8}`
   */
  DevAddr: string;
  SessionKeys: SessionKeysAbpV10x;
};
/**
 * Type definition for `AWS::IoTWireless::WirelessDevice.AbpV11`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotwireless-wirelessdevice-abpv11.html}
 */
export type AbpV11 = {
  /**
   * @pattern `[a-fA-F0-9]{8}`
   */
  DevAddr: string;
  SessionKeys: SessionKeysAbpV11;
};
/**
 * Type definition for `AWS::IoTWireless::WirelessDevice.LoRaWANDevice`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotwireless-wirelessdevice-lorawandevice.html}
 */
export type LoRaWANDevice = {
  AbpV10x?: AbpV10x;
  AbpV11?: AbpV11;
  /**
   * @pattern `[a-f0-9]{16}`
   */
  DevEui?: string;
  /**
   * @maxLength `256`
   */
  DeviceProfileId?: string;
  OtaaV10x?: OtaaV10x;
  OtaaV11?: OtaaV11;
  /**
   * @maxLength `256`
   */
  ServiceProfileId?: string;
};
/**
 * Type definition for `AWS::IoTWireless::WirelessDevice.OtaaV10x`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotwireless-wirelessdevice-otaav10x.html}
 */
export type OtaaV10x = {
  /**
   * @pattern `[a-fA-F0-9]{16}`
   */
  AppEui: string;
  /**
   * @pattern `[a-fA-F0-9]{32}`
   */
  AppKey: string;
};
/**
 * Type definition for `AWS::IoTWireless::WirelessDevice.OtaaV11`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotwireless-wirelessdevice-otaav11.html}
 */
export type OtaaV11 = {
  /**
   * @pattern `[a-fA-F0-9]{32}`
   */
  AppKey: string;
  /**
   * @pattern `[a-fA-F0-9]{16}`
   */
  JoinEui: string;
  /**
   * @pattern `[a-fA-F0-9]{32}`
   */
  NwkKey: string;
};
/**
 * Type definition for `AWS::IoTWireless::WirelessDevice.SessionKeysAbpV10x`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotwireless-wirelessdevice-sessionkeysabpv10x.html}
 */
export type SessionKeysAbpV10x = {
  /**
   * @pattern `[a-fA-F0-9]{32}`
   */
  AppSKey: string;
  /**
   * @pattern `[a-fA-F0-9]{32}`
   */
  NwkSKey: string;
};
/**
 * Type definition for `AWS::IoTWireless::WirelessDevice.SessionKeysAbpV11`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotwireless-wirelessdevice-sessionkeysabpv11.html}
 */
export type SessionKeysAbpV11 = {
  /**
   * @pattern `[a-fA-F0-9]{32}`
   */
  AppSKey: string;
  /**
   * @pattern `[a-fA-F0-9]{32}`
   */
  FNwkSIntKey: string;
  /**
   * @pattern `[a-fA-F0-9]{32}`
   */
  NwkSEncKey: string;
  /**
   * @pattern `[a-fA-F0-9]{32}`
   */
  SNwkSIntKey: string;
};
/**
 * Type definition for `AWS::IoTWireless::WirelessDevice.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotwireless-wirelessdevice-tag.html}
 */
export type Tag = {
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Key?: string;
  /**
   * @maxLength `256`
   */
  Value?: string;
};
/**
 * Resource type definition for `AWS::IoTWireless::WirelessDevice`.
 * Create and manage wireless gateways, including LoRa gateways.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-wirelessdevice.html}
 */
export class IoTWirelessWirelessDevice extends $Resource<
  "AWS::IoTWireless::WirelessDevice",
  IoTWirelessWirelessDeviceProperties,
  IoTWirelessWirelessDeviceAttributes
> {
  public static readonly Type = "AWS::IoTWireless::WirelessDevice";
  public static readonly AttributeNames = [
    "Arn" as const,
    "Id" as const,
    "ThingName" as const,
  ];
  constructor(
    logicalId: string,
    properties: IoTWirelessWirelessDeviceProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      IoTWirelessWirelessDevice.Type,
      properties,
      IoTWirelessWirelessDevice.AttributeNames,
      options,
    );
  }
}
