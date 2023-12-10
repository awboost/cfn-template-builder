import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::EMR::SecurityConfiguration`.
 * Use a SecurityConfiguration resource to configure data encryption, Kerberos authentication, and Amazon S3 authorization for EMRFS.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-emr-securityconfiguration.html}
 */
export type EMRSecurityConfigurationProperties = {
  /**
   * The name of the security configuration.
   */
  Name?: string;
  /**
   * The security configuration details in JSON format.
   */
  SecurityConfiguration: Record<string, any> | string;
};
/**
 * Resource type definition for `AWS::EMR::SecurityConfiguration`.
 * Use a SecurityConfiguration resource to configure data encryption, Kerberos authentication, and Amazon S3 authorization for EMRFS.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-emr-securityconfiguration.html}
 */
export class EMRSecurityConfiguration extends $Resource<
  "AWS::EMR::SecurityConfiguration",
  EMRSecurityConfigurationProperties,
  Record<string, never>
> {
  public static readonly Type = "AWS::EMR::SecurityConfiguration";
  public static readonly AttributeNames = [];
  constructor(
    logicalId: string,
    properties: EMRSecurityConfigurationProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      EMRSecurityConfiguration.Type,
      properties,
      EMRSecurityConfiguration.AttributeNames,
      options,
    );
  }
}
