import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::Pinpoint::GCMChannel
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-gcmchannel.html}
 */
export type PinpointGCMChannelProperties = {
  ApiKey: string;
  ApplicationId: string;
  Enabled?: boolean;
};
/**
 * Attribute type definition for `AWS::Pinpoint::GCMChannel`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-gcmchannel.html#aws-resource-pinpoint-gcmchannel-return-values}
 */
export type PinpointGCMChannelAttributes = {
  Id: string;
};
/**
 * Resource Type definition for AWS::Pinpoint::GCMChannel
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-gcmchannel.html}
 */
export class PinpointGCMChannel extends $Resource<
  "AWS::Pinpoint::GCMChannel",
  PinpointGCMChannelProperties,
  PinpointGCMChannelAttributes
> {
  public static readonly Type = "AWS::Pinpoint::GCMChannel";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: PinpointGCMChannelProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      PinpointGCMChannel.Type,
      properties,
      PinpointGCMChannel.AttributeNames,
      options,
    );
  }
}
