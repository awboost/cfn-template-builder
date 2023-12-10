import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * You can use AWS::Organizations::Account to manage accounts in organization.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-organizations-account.html}
 */
export type OrganizationsAccountProperties = {
  /**
   * The friendly name of the member account.
   * @minLength `1`
   * @maxLength `50`
   * @pattern `[\u0020-\u007E]+`
   */
  AccountName: string;
  /**
   * The email address of the owner to assign to the new member account.
   * @minLength `6`
   * @maxLength `64`
   * @pattern `[^\s@]+@[^\s@]+\.[^\s@]+`
   */
  Email: string;
  /**
   * List of parent nodes for the member account. Currently only one parent at a time is supported. Default is root.
   */
  ParentIds?: string[];
  /**
   * The name of an IAM role that AWS Organizations automatically preconfigures in the new member account. Default name is OrganizationAccountAccessRole if not specified.
   * @minLength `1`
   * @maxLength `64`
   * @pattern `[\w+=,.@-]{1,64}`
   */
  RoleName?: string;
  /**
   * A list of tags that you want to attach to the newly created account. For each tag in the list, you must specify both a tag key and a value.
   */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::Organizations::Account`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-organizations-account.html#aws-resource-organizations-account-return-values}
 */
export type OrganizationsAccountAttributes = {
  /**
   * If the account was created successfully, the unique identifier (ID) of the new account.
   * @maxLength `12`
   * @pattern `^\d{12}$`
   */
  AccountId: string;
  /**
   * The Amazon Resource Name (ARN) of the account.
   * @pattern `^arn:aws.*:organizations::\d{12}:account\/o-[a-z0-9]{10,32}\/\d{12}`
   */
  Arn: string;
  /**
   * The method by which the account joined the organization.
   */
  JoinedMethod: "INVITED" | "CREATED";
  /**
   * The date the account became a part of the organization.
   */
  JoinedTimestamp: string;
  /**
   * The status of the account in the organization.
   */
  Status: "ACTIVE" | "SUSPENDED" | "PENDING_CLOSURE";
};
/**
 * Type definition for `AWS::Organizations::Account.Tag`.
 * A custom key-value pair associated with a resource within your organization.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-organizations-account-tag.html}
 */
export type Tag = {
  /**
   * The key identifier, or name, of the tag.
   * @minLength `1`
   * @maxLength `128`
   * @pattern `[\s\S]*`
   */
  Key: string;
  /**
   * The string value that's associated with the key of the tag. You can set the value of a tag to an empty string, but you can't set the value of a tag to null.
   * @maxLength `256`
   * @pattern `[\s\S]*`
   */
  Value: string;
};
/**
 * You can use AWS::Organizations::Account to manage accounts in organization.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-organizations-account.html}
 */
export class OrganizationsAccount extends $Resource<
  "AWS::Organizations::Account",
  OrganizationsAccountProperties,
  OrganizationsAccountAttributes
> {
  public static readonly Type = "AWS::Organizations::Account";
  public static readonly AttributeNames = [
    "AccountId" as const,
    "Arn" as const,
    "JoinedMethod" as const,
    "JoinedTimestamp" as const,
    "Status" as const,
  ];
  constructor(
    logicalId: string,
    properties: OrganizationsAccountProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      OrganizationsAccount.Type,
      properties,
      OrganizationsAccount.AttributeNames,
      options,
    );
  }
}
