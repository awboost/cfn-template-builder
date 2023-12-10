import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource schema for AWS::Detective::OrganizationAdmin
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-detective-organizationadmin.html}
 */
export type DetectiveOrganizationAdminProperties = {
  /**
   * The account ID of the account that should be registered as your Organization's delegated administrator for Detective
   * @pattern `[0-9]{12}`
   */
  AccountId: string;
};
/**
 * Attribute type definition for `AWS::Detective::OrganizationAdmin`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-detective-organizationadmin.html#aws-resource-detective-organizationadmin-return-values}
 */
export type DetectiveOrganizationAdminAttributes = {
  /**
   * The Detective graph ARN
   */
  GraphArn: string;
};
/**
 * Resource schema for AWS::Detective::OrganizationAdmin
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-detective-organizationadmin.html}
 */
export class DetectiveOrganizationAdmin extends $Resource<
  "AWS::Detective::OrganizationAdmin",
  DetectiveOrganizationAdminProperties,
  DetectiveOrganizationAdminAttributes
> {
  public static readonly Type = "AWS::Detective::OrganizationAdmin";
  public static readonly AttributeNames = ["GraphArn" as const];
  constructor(
    logicalId: string,
    properties: DetectiveOrganizationAdminProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      DetectiveOrganizationAdmin.Type,
      properties,
      DetectiveOrganizationAdmin.AttributeNames,
      options,
    );
  }
}
