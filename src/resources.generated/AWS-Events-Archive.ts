import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::Events::Archive
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-archive.html}
 */
export type EventsArchiveProperties = {
  /**
   * @minLength `1`
   * @maxLength `48`
   */
  ArchiveName?: string;
  Description?: string;
  EventPattern?: Record<string, any>;
  RetentionDays?: number;
  SourceArn: string;
};
/**
 * Attribute type definition for `AWS::Events::Archive`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-archive.html#aws-resource-events-archive-return-values}
 */
export type EventsArchiveAttributes = {
  Arn: string;
};
/**
 * Resource Type definition for AWS::Events::Archive
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-archive.html}
 */
export class EventsArchive extends $Resource<
  "AWS::Events::Archive",
  EventsArchiveProperties,
  EventsArchiveAttributes
> {
  public static readonly Type = "AWS::Events::Archive";
  public static readonly AttributeNames = ["Arn" as const];
  constructor(
    logicalId: string,
    properties: EventsArchiveProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      EventsArchive.Type,
      properties,
      EventsArchive.AttributeNames,
      options,
    );
  }
}
