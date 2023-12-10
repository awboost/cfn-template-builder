import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource schema for AWS::Route53Resolver::FirewallRuleGroup.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html}
 */
export type Route53ResolverFirewallRuleGroupProperties = {
  /**
   * FirewallRules
   */
  FirewallRules?: FirewallRule[];
  /**
   * FirewallRuleGroupName
   * @minLength `1`
   * @maxLength `64`
   * @pattern `(?!^[0-9]+$)([a-zA-Z0-9\-_' ']+)`
   */
  Name?: string;
  /**
   * Tags
   */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::Route53Resolver::FirewallRuleGroup`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html#aws-resource-route53resolver-firewallrulegroup-return-values}
 */
export type Route53ResolverFirewallRuleGroupAttributes = {
  /**
   * Arn
   * @minLength `1`
   * @maxLength `600`
   */
  Arn: string;
  /**
   * Rfc3339TimeString
   * @minLength `20`
   * @maxLength `40`
   */
  CreationTime: string;
  /**
   * The id of the creator request.
   * @minLength `1`
   * @maxLength `255`
   */
  CreatorRequestId: string;
  /**
   * ResourceId
   * @minLength `1`
   * @maxLength `64`
   */
  Id: string;
  /**
   * Rfc3339TimeString
   * @minLength `20`
   * @maxLength `40`
   */
  ModificationTime: string;
  /**
   * AccountId
   * @minLength `12`
   * @maxLength `32`
   */
  OwnerId: string;
  /**
   * Count
   */
  RuleCount: number;
  /**
   * ShareStatus, possible values are NOT_SHARED, SHARED_WITH_ME, SHARED_BY_ME.
   */
  ShareStatus: "NOT_SHARED" | "SHARED_WITH_ME" | "SHARED_BY_ME";
  /**
   * ResolverFirewallRuleGroupAssociation, possible values are COMPLETE, DELETING, UPDATING, and INACTIVE_OWNER_ACCOUNT_CLOSED.
   */
  Status:
    | "COMPLETE"
    | "DELETING"
    | "UPDATING"
    | "INACTIVE_OWNER_ACCOUNT_CLOSED";
  /**
   * FirewallRuleGroupStatus
   */
  StatusMessage: string;
};
/**
 * Type definition for `AWS::Route53Resolver::FirewallRuleGroup.FirewallRule`.
 * Firewall Rule associating the Rule Group to a Domain List
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-firewallrulegroup-firewallrule.html}
 */
export type FirewallRule = {
  /**
   * Rule Action
   */
  Action: "ALLOW" | "BLOCK" | "ALERT";
  /**
   * BlockOverrideDnsType
   */
  BlockOverrideDnsType?: "CNAME";
  /**
   * BlockOverrideDomain
   * @minLength `1`
   * @maxLength `255`
   */
  BlockOverrideDomain?: string;
  /**
   * BlockOverrideTtl
   * @max `604800`
   */
  BlockOverrideTtl?: number;
  /**
   * BlockResponse
   */
  BlockResponse?: "NODATA" | "NXDOMAIN" | "OVERRIDE";
  /**
   * ResourceId
   * @minLength `1`
   * @maxLength `64`
   */
  FirewallDomainListId: string;
  /**
   * Rule Priority
   */
  Priority: number;
};
/**
 * Type definition for `AWS::Route53Resolver::FirewallRuleGroup.Tag`.
 * A key-value pair to associate with a resource.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-firewallrulegroup-tag.html}
 */
export type Tag = {
  /**
   * The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @minLength `1`
   * @maxLength `127`
   */
  Key: string;
  /**
   * The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @maxLength `255`
   */
  Value: string;
};
/**
 * Resource schema for AWS::Route53Resolver::FirewallRuleGroup.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html}
 */
export class Route53ResolverFirewallRuleGroup extends $Resource<
  "AWS::Route53Resolver::FirewallRuleGroup",
  Route53ResolverFirewallRuleGroupProperties,
  Route53ResolverFirewallRuleGroupAttributes
> {
  public static readonly Type = "AWS::Route53Resolver::FirewallRuleGroup";
  public static readonly AttributeNames = [
    "Arn" as const,
    "CreationTime" as const,
    "CreatorRequestId" as const,
    "Id" as const,
    "ModificationTime" as const,
    "OwnerId" as const,
    "RuleCount" as const,
    "ShareStatus" as const,
    "Status" as const,
    "StatusMessage" as const,
  ];
  constructor(
    logicalId: string,
    properties: Route53ResolverFirewallRuleGroupProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      Route53ResolverFirewallRuleGroup.Type,
      properties,
      Route53ResolverFirewallRuleGroup.AttributeNames,
      options,
    );
  }
}
