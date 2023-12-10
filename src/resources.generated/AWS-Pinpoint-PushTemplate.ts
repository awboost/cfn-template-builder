import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::Pinpoint::PushTemplate
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-pushtemplate.html}
 */
export type PinpointPushTemplateProperties = {
  ADM?: AndroidPushNotificationTemplate;
  APNS?: APNSPushNotificationTemplate;
  Baidu?: AndroidPushNotificationTemplate;
  Default?: DefaultPushNotificationTemplate;
  DefaultSubstitutions?: string;
  GCM?: AndroidPushNotificationTemplate;
  Tags?: Record<string, any>;
  TemplateDescription?: string;
  TemplateName: string;
};
/**
 * Attribute type definition for `AWS::Pinpoint::PushTemplate`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-pushtemplate.html#aws-resource-pinpoint-pushtemplate-return-values}
 */
export type PinpointPushTemplateAttributes = {
  Arn: string;
  Id: string;
};
/**
 * Type definition for `AWS::Pinpoint::PushTemplate.APNSPushNotificationTemplate`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-pinpoint-pushtemplate-apnspushnotificationtemplate.html}
 */
export type APNSPushNotificationTemplate = {
  Action?: string;
  Body?: string;
  MediaUrl?: string;
  Sound?: string;
  Title?: string;
  Url?: string;
};
/**
 * Type definition for `AWS::Pinpoint::PushTemplate.AndroidPushNotificationTemplate`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-pinpoint-pushtemplate-androidpushnotificationtemplate.html}
 */
export type AndroidPushNotificationTemplate = {
  Action?: string;
  Body?: string;
  ImageIconUrl?: string;
  ImageUrl?: string;
  SmallImageIconUrl?: string;
  Sound?: string;
  Title?: string;
  Url?: string;
};
/**
 * Type definition for `AWS::Pinpoint::PushTemplate.DefaultPushNotificationTemplate`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-pinpoint-pushtemplate-defaultpushnotificationtemplate.html}
 */
export type DefaultPushNotificationTemplate = {
  Action?: string;
  Body?: string;
  Sound?: string;
  Title?: string;
  Url?: string;
};
/**
 * Resource Type definition for AWS::Pinpoint::PushTemplate
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-pushtemplate.html}
 */
export class PinpointPushTemplate extends $Resource<
  "AWS::Pinpoint::PushTemplate",
  PinpointPushTemplateProperties,
  PinpointPushTemplateAttributes
> {
  public static readonly Type = "AWS::Pinpoint::PushTemplate";
  public static readonly AttributeNames = ["Arn" as const, "Id" as const];
  constructor(
    logicalId: string,
    properties: PinpointPushTemplateProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      PinpointPushTemplate.Type,
      properties,
      PinpointPushTemplate.AttributeNames,
      options,
    );
  }
}
