export const PolicyDocumentVersion = {
  /**
   * This was an earlier version of the policy language. You might see this
   * version on older existing policies. Do not use this version for any new
   * policies or when you update any existing policies. Newer features, such as
   * policy variables, will not work with your policy. For example, variables
   * such as `${aws:username}` aren't recognized as variables and are instead
   * treated as literal strings in the policy.
   */
  Version_2008_10_17: "2008-10-17",

  /**
   * This is the current version of the policy language, and you should always
   * include a Version element and set it to 2012-10-17. Otherwise, you cannot
   * use features such as policy variables that were introduced with this
   * version.
   */
  Version_2012_10_17: "2012-10-17",
} as const;

/**
 * The `Version` policy element specifies the language syntax rules that are to
 * be used to process a policy.
 *
 * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_version.html | IAM JSON policy elements: Version}
 */
export type PolicyDocumentVersion =
  (typeof PolicyDocumentVersion)[keyof typeof PolicyDocumentVersion];

/**
 * You manage access in AWS by creating policies and attaching them to IAM
 * identities (users, groups of users, or roles) or AWS resources. A policy is
 * an object in AWS that, when associated with an identity or resource, defines
 * their permissions. AWS evaluates these policies when an IAM principal (user
 * or role) makes a request. Permissions in the policies determine whether the
 * request is allowed or denied. Most policies are stored in AWS as JSON
 * documents. AWS supports six types of policies: identity-based policies,
 * resource-based policies, permissions boundaries, Organizations SCPs, ACLs,
 * and session policies.
 *
 * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html | IAM JSON policy elements reference}
 */
export type PolicyDocument = {
  /**
   * The `Version` policy element specifies the language syntax rules that are
   * to be used to process a policy. To use all of the available policy
   * features, include a `Version` element with a value of `"2012-10-17"`.
   *
   * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_version.html | IAM JSON policy elements: Version}
   */
  Version?: PolicyDocumentVersion;

  /**
   * The `Statement` element is the main element for a policy. This element is
   * required. The Statement element can contain a single statement or an array
   * of individual statements. Each individual statement block must be enclosed
   * in curly braces `{ }`. For multiple statements, the array must be enclosed
   * in square brackets `[ ]`.
   *
   * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_statement.html | IAM JSON policy elements: Statement}
   */
  Statement: PolicyStatement[];
};

/**
 * The `Statement` element is the main element for a policy. This element is
 * required. The Statement element can contain a single statement or an array
 * of individual statements. Each individual statement block must be enclosed
 * in curly braces `{ }`. For multiple statements, the array must be enclosed
 * in square brackets `[ ]`.
 *
 * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_statement.html | IAM JSON policy elements: Statement}
 */
export type PolicyStatement = {
  /**
   * The `Action` element describes the specific action or actions that will be
   * allowed or denied. Statements must include either an `Action` or
   * `NotAction` element. Each AWS service has its own set of actions that
   * describe tasks that you can perform with that service.
   *
   * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_action.html | IAM JSON policy elements: Action}
   */
  Action: string | string[];

  /**
   * The Condition element (or Condition block) lets you specify conditions for
   * when a policy is in effect. The Condition element is optional. In the
   * Condition element, you build expressions in which you use condition
   * operators (equal, less than, etc.) to match the condition keys and values
   * in the policy against keys and values in the request context.
   *
   * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html | IAM JSON policy elements: Condition}
   */
  Condition?: any;

  /**
   * The `Effect` element is required and specifies whether the statement
   * results in an allow or an explicit deny. Valid values for `Effect` are
   * `Allow` and `Deny`. By default, access to resources is denied. To allow
   * access to a resource, you must set the `Effect` element to `Allow`. To override
   * an allow (for example, to override an allow that is otherwise in force),
   * you set the `Effect` element to `Deny`.
   *
   * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_effect.html | IAM JSON policy elements: Effect}
   */
  Effect?: PolicyEffect;

  /**
   * `NotAction` is an advanced policy element that explicitly matches
   * everything except the specified list of actions. Using `NotAction` can
   * result in a shorter policy by listing only a few actions that should not
   * match, rather than including a long list of actions that will match. When
   * using `NotAction`, you should keep in mind that actions specified in this
   * element are the only actions in that are limited. This, in turn, means that
   * all of the applicable actions or services that are not listed are allowed
   * if you use the `Allow` effect. In addition, such unlisted actions or
   * services are denied if you use the `Deny` effect. When you use `NotAction`
   * with the `Resource` element, you provide scope for the policy. This is how
   * AWS determines which actions or services are applicable. For more
   * information, see the following example policy.
   *
   * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_notaction.html | IAM JSON policy elements: NotAction}
   */
  NotAction?: string | string[];

  /**
   * Use the `NotPrincipal` element to specify the IAM user, federated user, IAM
   * role, AWS account, AWS service, or other principal that is not allowed or
   * denied access to a resource. The `NotPrincipal` element enables you to
   * specify an exception to a list of principals. Use this element to deny
   * access to all principals except the one named in the `NotPrincipal`
   * element.
   *
   * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_notprincipal.html | IAM JSON policy elements: NotPrincipal}
   */
  NotPrincipal?: PolicyPrincipal | string;

  /**
   * `NotResource` is an advanced policy element that explicitly matches every
   * resource except those specified. Using `NotResource` can result in a
   * shorter policy by listing only a few resources that should not match,
   * rather than including a long list of resources that will match. This is
   * particularly useful for policies that apply within a single AWS service.
   *
   * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_notresource.html | IAM JSON policy elements: NotResource}
   */
  NotResource?: string | string[];

  /**
   * Use the `Principal` element in a resource-based JSON policy to specify the
   * principal that is allowed or denied access to a resource.
   *
   * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html | IAM JSON policy elements: Principal}
   */
  Principal?: PolicyPrincipal | string;

  /**
   * The `Resource` element specifies the object or objects that the statement
   * covers. Statements must include either a `Resource` or a `NotResource`
   * element. You specify a resource using an ARN.
   *
   * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_resource.html | IAM JSON policy elements: Resource}
   */
  Resource?: string | string[];

  /**
   * You can provide an optional identifier, `Sid` (statement ID) for the policy
   * statement. You can assign a `Sid` value to each statement in a statement
   * array. In services that let you specify an ID element, such as SQS and SNS,
   * the `Sid` value is just a sub-ID of the policy document ID. In IAM, the
   * `Sid` value must be unique within a JSON policy.
   *
   * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_sid.html | IAM JSON policy elements: Sid}
   */
  Sid?: string;
};

/**
 * By default, access to resources is denied. To allow access to a resource, you
 * must set the `Effect` element to `Allow`. To override an allow (for example,
 * to override an allow that is otherwise in force), you set the `Effect`
 * element to `Deny`.
 *
 * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_effect.html | IAM JSON policy elements: Effect}
 */
export const PolicyEffect = {
  Allow: "Allow",
  Deny: "Deny",
} as const;

/**
 * By default, access to resources is denied. To allow access to a resource, you
 * must set the `Effect` element to `Allow`. To override an allow (for example,
 * to override an allow that is otherwise in force), you set the `Effect`
 * element to `Deny`.
 *
 * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_effect.html | IAM JSON policy elements: Effect}
 */
export type PolicyEffect = (typeof PolicyEffect)[keyof typeof PolicyEffect];

/**
 * You can specify AWS account identifiers in the Principal element of a
 * resource-based policy or in condition keys that support principals. This
 * delegates authority to the account. When you allow access to a different
 * account, an administrator in that account must then grant access to an
 * identity (IAM user or role) in that account. When you specify an AWS account,
 * you can use the account ARN (arn:aws:iam::account-ID:root), or a shortened
 * form that consists of the "AWS" prefix followed by the account ID.
 *
 * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-accounts | AWS account prinicipals}
 */
export type AwsPrincipal = {
  AWS: string | string[];
};

/**
 * An alpha-numeric identifier, that is an obfuscated form of the AWS account
 * ID. You can use this ID to identify an AWS account when granting
 * cross-account access to buckets and objects using Amazon S3. You can retrieve
 * the canonical user ID for your AWS account as either the root user or an IAM
 * user.
 *
 * @see {@link https://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html#FindingCanonicalId | Canonical user ID}
 */
export type CanonicalUserPrincipal = {
  CanonicalUser: string;
};

/**
 * A web identity session principal is a session principal that results from
 * using the AWS STS `AssumeRoleWithWebIdentity` operation. You can use an
 * external web identity provider (IdP) to sign in, and then assume an IAM role
 * using this operation. This leverages identity federation and issues a role
 * session.
 *
 * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-federated-web-identity | Web identity session principals}
 */
export type FederatedPrincipal = {
  Federated: string;
};

/**
 * You can specify AWS services in the `Principal` element of a resource-based
 * policy or in condition keys that support principals. A service principal is
 * an identifier for a service.
 *
 * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-services | AWS service principals}
 */
export type ServicePrincipal = {
  Service: string | string[];
};

/**
 * Use the `Principal` element in a resource-based JSON policy to specify the
 * principal that is allowed or denied access to a resource.
 *
 * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html | IAM JSON policy elements: Principal}
 */
export type PolicyPrincipal =
  | AwsPrincipal
  | CanonicalUserPrincipal
  | FederatedPrincipal
  | ServicePrincipal;

/**
 * Create a policy document from the given statements.
 */
export function makePolicyDocument(
  statements: PolicyStatement[],
  version: PolicyDocumentVersion = "2012-10-17",
): PolicyDocument {
  return {
    Statement: statements,
    Version: version,
  };
}
