import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource schema for AWS::MediaPackage::Channel
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackage-channel.html}
 */
export type MediaPackageChannelProperties = {
  /**
   * A short text description of the Channel.
   */
  Description?: string;
  /**
   * The configuration parameters for egress access logging.
   */
  EgressAccessLogs?: LogConfiguration;
  /**
   * An HTTP Live Streaming (HLS) ingest resource configuration.
   */
  HlsIngest?: HlsIngest;
  /**
   * The ID of the Channel.
   * @minLength `1`
   * @maxLength `256`
   * @pattern `\A[0-9a-zA-Z-_]+\Z`
   */
  Id: string;
  /**
   * The configuration parameters for egress access logging.
   */
  IngressAccessLogs?: LogConfiguration;
  /**
   * A collection of tags associated with a resource
   */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::MediaPackage::Channel`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackage-channel.html#aws-resource-mediapackage-channel-return-values}
 */
export type MediaPackageChannelAttributes = {
  /**
   * The Amazon Resource Name (ARN) assigned to the Channel.
   */
  Arn: string;
};
/**
 * Type definition for `AWS::MediaPackage::Channel.HlsIngest`.
 * An HTTP Live Streaming (HLS) ingest resource configuration.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediapackage-channel-hlsingest.html}
 */
export type HlsIngest = {
  /**
   * A list of endpoints to which the source stream should be sent.
   */
  ingestEndpoints?: IngestEndpoint[];
};
/**
 * Type definition for `AWS::MediaPackage::Channel.IngestEndpoint`.
 * An endpoint for ingesting source content for a Channel.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediapackage-channel-ingestendpoint.html}
 */
export type IngestEndpoint = {
  /**
   * The system generated unique identifier for the IngestEndpoint
   */
  Id: string;
  /**
   * The system generated password for ingest authentication.
   */
  Password: string;
  /**
   * The ingest URL to which the source stream should be sent.
   */
  Url: string;
  /**
   * The system generated username for ingest authentication.
   */
  Username: string;
};
/**
 * Type definition for `AWS::MediaPackage::Channel.LogConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediapackage-channel-logconfiguration.html}
 */
export type LogConfiguration = {
  /**
   * Sets a custom AWS CloudWatch log group name for access logs. If a log group name isn't specified, the defaults are used: /aws/MediaPackage/EgressAccessLogs for egress access logs and /aws/MediaPackage/IngressAccessLogs for ingress access logs.
   * @minLength `1`
   * @maxLength `256`
   * @pattern `\A^(\/aws\/MediaPackage\/)[a-zA-Z0-9_-]+\Z`
   */
  LogGroupName?: string;
};
/**
 * Type definition for `AWS::MediaPackage::Channel.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediapackage-channel-tag.html}
 */
export type Tag = {
  Key: string;
  Value: string;
};
/**
 * Resource schema for AWS::MediaPackage::Channel
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackage-channel.html}
 */
export class MediaPackageChannel extends $Resource<
  "AWS::MediaPackage::Channel",
  MediaPackageChannelProperties,
  MediaPackageChannelAttributes
> {
  public static readonly Type = "AWS::MediaPackage::Channel";
  public static readonly AttributeNames = ["Arn" as const];
  constructor(
    logicalId: string,
    properties: MediaPackageChannelProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      MediaPackageChannel.Type,
      properties,
      MediaPackageChannel.AttributeNames,
      options,
    );
  }
}
