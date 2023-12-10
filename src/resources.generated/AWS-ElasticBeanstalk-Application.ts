import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * The AWS::ElasticBeanstalk::Application resource specifies an Elastic Beanstalk application.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticbeanstalk-application.html}
 */
export type ElasticBeanstalkApplicationProperties = {
  /**
   * A name for the Elastic Beanstalk application. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the application name.
   */
  ApplicationName?: string;
  /**
   * Your description of the application.
   */
  Description?: string;
  /**
   * Specifies an application resource lifecycle configuration to prevent your application from accumulating too many versions.
   */
  ResourceLifecycleConfig?: ApplicationResourceLifecycleConfig;
};
/**
 * Type definition for `AWS::ElasticBeanstalk::Application.ApplicationResourceLifecycleConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-elasticbeanstalk-application-applicationresourcelifecycleconfig.html}
 */
export type ApplicationResourceLifecycleConfig = {
  /**
   * The ARN of an IAM service role that Elastic Beanstalk has permission to assume. The ServiceRole property is required the first time that you provide a ResourceLifecycleConfig for the application. After you provide it once, Elastic Beanstalk persists the Service Role with the application, and you don't need to specify it again. You can, however, specify it in subsequent updates to change the Service Role to another value.
   */
  ServiceRole?: string;
  /**
   * Defines lifecycle settings for application versions.
   */
  VersionLifecycleConfig?: ApplicationVersionLifecycleConfig;
};
/**
 * Type definition for `AWS::ElasticBeanstalk::Application.ApplicationVersionLifecycleConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-elasticbeanstalk-application-applicationversionlifecycleconfig.html}
 */
export type ApplicationVersionLifecycleConfig = {
  /**
   * Specify a max age rule to restrict the length of time that application versions are retained for an application.
   */
  MaxAgeRule?: MaxAgeRule;
  /**
   * Specify a max count rule to restrict the number of application versions that are retained for an application.
   */
  MaxCountRule?: MaxCountRule;
};
/**
 * Type definition for `AWS::ElasticBeanstalk::Application.MaxAgeRule`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-elasticbeanstalk-application-maxagerule.html}
 */
export type MaxAgeRule = {
  /**
   * Set to true to delete a version's source bundle from Amazon S3 when Elastic Beanstalk deletes the application version.
   */
  DeleteSourceFromS3?: boolean;
  /**
   * Specify true to apply the rule, or false to disable it.
   */
  Enabled?: boolean;
  /**
   * Specify the number of days to retain an application versions.
   */
  MaxAgeInDays?: number;
};
/**
 * Type definition for `AWS::ElasticBeanstalk::Application.MaxCountRule`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-elasticbeanstalk-application-maxcountrule.html}
 */
export type MaxCountRule = {
  /**
   * Set to true to delete a version's source bundle from Amazon S3 when Elastic Beanstalk deletes the application version.
   */
  DeleteSourceFromS3?: boolean;
  /**
   * Specify true to apply the rule, or false to disable it.
   */
  Enabled?: boolean;
  /**
   * Specify the maximum number of application versions to retain.
   */
  MaxCount?: number;
};
/**
 * The AWS::ElasticBeanstalk::Application resource specifies an Elastic Beanstalk application.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticbeanstalk-application.html}
 */
export class ElasticBeanstalkApplication extends $Resource<
  "AWS::ElasticBeanstalk::Application",
  ElasticBeanstalkApplicationProperties,
  Record<string, never>
> {
  public static readonly Type = "AWS::ElasticBeanstalk::Application";
  public static readonly AttributeNames = [];
  constructor(
    logicalId: string,
    properties: ElasticBeanstalkApplicationProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      ElasticBeanstalkApplication.Type,
      properties,
      ElasticBeanstalkApplication.AttributeNames,
      options,
    );
  }
}
