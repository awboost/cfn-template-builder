import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::Organizations::OrganizationalUnit`.
 * You can use organizational units (OUs) to group accounts together to administer as a single unit. This greatly simplifies the management of your accounts. For example, you can attach a policy-based control to an OU, and all accounts within the OU automatically inherit the policy. You can create multiple OUs within a single organization, and you can create OUs within other OUs. Each OU can contain multiple accounts, and you can move accounts from one OU to another. However, OU names must be unique within a parent OU or root.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-organizations-organizationalunit.html}
 */
export type OrganizationsOrganizationalUnitProperties = {
  /**
   * The friendly name of this OU.
   * @minLength `1`
   * @maxLength `128`
   * @pattern `[\s\S]*`
   */
  Name: string;
  /**
   * The unique identifier (ID) of the parent root or OU that you want to create the new OU in.
   * @maxLength `100`
   * @pattern `^(r-[0-9a-z]{4,32})|(ou-[0-9a-z]{4,32}-[a-z0-9]{8,32})$`
   */
  ParentId: string;
  /**
   * A list of tags that you want to attach to the newly created OU.
   */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::Organizations::OrganizationalUnit`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-organizations-organizationalunit.html#aws-resource-organizations-organizationalunit-return-values}
 */
export type OrganizationsOrganizationalUnitAttributes = {
  /**
   * The Amazon Resource Name (ARN) of this OU.
   * @pattern `^arn:aws.*:organizations::\d{12}:ou/o-[a-z0-9]{10,32}/ou-[0-9a-z]{4,32}-[0-9a-z]{8,32}`
   */
  Arn: string;
  /**
   * The unique identifier (ID) associated with this OU.
   * @maxLength `68`
   * @pattern `^ou-[0-9a-z]{4,32}-[a-z0-9]{8,32}$`
   */
  Id: string;
};
/**
 * Type definition for `AWS::Organizations::OrganizationalUnit.Tag`.
 * A custom key-value pair associated with a resource within your organization.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-organizations-organizationalunit-tag.html}
 */
export type Tag = {
  /**
   * The key identifier, or name, of the tag.
   * @minLength `1`
   * @maxLength `128`
   */
  Key: string;
  /**
   * The string value that's associated with the key of the tag. You can set the value of a tag to an empty string, but you can't set the value of a tag to null.
   * @maxLength `256`
   */
  Value: string;
};
/**
 * Resource type definition for `AWS::Organizations::OrganizationalUnit`.
 * You can use organizational units (OUs) to group accounts together to administer as a single unit. This greatly simplifies the management of your accounts. For example, you can attach a policy-based control to an OU, and all accounts within the OU automatically inherit the policy. You can create multiple OUs within a single organization, and you can create OUs within other OUs. Each OU can contain multiple accounts, and you can move accounts from one OU to another. However, OU names must be unique within a parent OU or root.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-organizations-organizationalunit.html}
 */
export class OrganizationsOrganizationalUnit extends $Resource<
  "AWS::Organizations::OrganizationalUnit",
  OrganizationsOrganizationalUnitProperties,
  OrganizationsOrganizationalUnitAttributes
> {
  public static readonly Type = "AWS::Organizations::OrganizationalUnit";
  public static readonly AttributeNames = ["Arn" as const, "Id" as const];
  constructor(
    logicalId: string,
    properties: OrganizationsOrganizationalUnitProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      OrganizationsOrganizationalUnit.Type,
      properties,
      OrganizationsOrganizationalUnit.AttributeNames,
      options,
    );
  }
}
