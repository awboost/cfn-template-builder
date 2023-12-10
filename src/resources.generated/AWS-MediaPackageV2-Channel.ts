import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Definition of AWS::MediaPackageV2::Channel Resource Type
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackagev2-channel.html}
 */
export type MediaPackageV2ChannelProperties = {
  /**
   * @minLength `1`
   * @maxLength `256`
   * @pattern `^[a-zA-Z0-9_-]+$`
   */
  ChannelGroupName?: string;
  /**
   * @minLength `1`
   * @maxLength `256`
   * @pattern `^[a-zA-Z0-9_-]+$`
   */
  ChannelName?: string;
  /**
   * @maxLength `1024`
   */
  Description?: string;
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::MediaPackageV2::Channel`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackagev2-channel.html#aws-resource-mediapackagev2-channel-return-values}
 */
export type MediaPackageV2ChannelAttributes = {
  Arn: string;
  CreatedAt: string;
  IngestEndpoints: IngestEndpoint[];
  ModifiedAt: string;
};
/**
 * Type definition for `AWS::MediaPackageV2::Channel.IngestEndpoint`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediapackagev2-channel-ingestendpoint.html}
 */
export type IngestEndpoint = {
  Id?: string;
  Url?: string;
};
/**
 * Type definition for `AWS::MediaPackageV2::Channel.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediapackagev2-channel-tag.html}
 */
export type Tag = {
  Key?: string;
  Value?: string;
};
/**
 * Definition of AWS::MediaPackageV2::Channel Resource Type
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackagev2-channel.html}
 */
export class MediaPackageV2Channel extends $Resource<
  "AWS::MediaPackageV2::Channel",
  MediaPackageV2ChannelProperties,
  MediaPackageV2ChannelAttributes
> {
  public static readonly Type = "AWS::MediaPackageV2::Channel";
  public static readonly AttributeNames = [
    "Arn" as const,
    "CreatedAt" as const,
    "IngestEndpoints" as const,
    "ModifiedAt" as const,
  ];
  constructor(
    logicalId: string,
    properties: MediaPackageV2ChannelProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      MediaPackageV2Channel.Type,
      properties,
      MediaPackageV2Channel.AttributeNames,
      options,
    );
  }
}
