declare const BRAND: unique symbol;

/**
 * Represents a branded intrinsic function type.
 * @see {@link https://www.learningtypescript.com/articles/branded-types}
 */
type Intrinsic<B> = { [BRAND]: B };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const CONDITION: unique symbol;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const RULE: unique symbol;

/**
 * You can use intrinsic functions, such as Fn::If, Fn::Equals, and Fn::Not, to
 * conditionally create stack resources. These conditions are evaluated based on
 * input parameters that you declare when you create or update a stack. After
 * you define all your conditions, you can associate them with resources or
 * resource properties in the Resources and Outputs sections of a template.
 *
 * You define all conditions in the Conditions section of a template except for
 * Fn::If conditions. You can use the Fn::If condition in the metadata
 * attribute, update policy attribute, and property values in the Resources
 * section and Outputs sections of a template.
 *
 * You might use conditions when you want to reuse a template that can create
 * resources in different contexts, such as a test environment versus a
 * production environment. In your template, you can add an EnvironmentType
 * input parameter, which accepts either prod or test as inputs. For the
 * production environment, you might include Amazon EC2 instances with certain
 * capabilities; however, for the test environment, you want to use less
 * capabilities to save costs. With conditions, you can define which resources
 * are created and how they're configured for each environment type.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-conditions.html}
 */
export type IntrinsicCondition = Intrinsic<typeof CONDITION>;

/**
 * Represents an intrinsic function used to define a rule.
 *
 * In the condition or assertions of a rule, you can use intrinsic functions,
 * such as Fn::Equals, Fn::Not, and Fn::RefAll. The condition property
 * determines if AWS CloudFormation applies the assertions. If the condition
 * evaluates to true, CloudFormation evaluates the assertions to verify whether
 * a parameter value is valid when a provisioned product is created or updated.
 * If a parameter value isn't valid, CloudFormation doesn't create or update the
 * stack. If the condition evaluates to false, CloudFormation doesn't check the
 * parameter value and proceeds with the stack operation.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-rules.html}
 */
export type IntrinsicRule = Intrinsic<typeof RULE>;

/**
 * You can use intrinsic functions, such as `Fn::If`, `Fn::Equals`, and
 * `Fn::Not`, to conditionally create stack resources. These conditions are
 * evaluated based on input parameters that you declare when you create or
 * update a stack. After you define all your conditions, you can associate them
 * with resources or resource properties in the Resources and Outputs sections
 * of a template.
 *
 * You define all conditions in the Conditions section of a template except for
 * `Fn::If conditions`. You can use the `Fn::If` condition in the metadata
 * attribute, update policy attribute, and property values in the Resources
 * section and Outputs sections of a template.
 *
 * You might use conditions when you want to reuse a template that can create
 * resources in different contexts, such as a test environment versus a
 * production environment. In your template, you can add an EnvironmentType
 * input parameter, which accepts either prod or test as inputs. For the
 * production environment, you might include Amazon EC2 instances with certain
 * capabilities; however, for the test environment, you want to use less
 * capabilities to save costs. With conditions, you can define which resources
 * are created and how they're configured for each environment type.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html}
 */
export function intrinsicCondition(
  name: string,
  args: unknown,
): IntrinsicCondition {
  return { [name]: args } as IntrinsicCondition;
}

/**
 * Create an intrinsic function used to define a rule.
 *
 * In the condition or assertions of a rule, you can use intrinsic functions,
 * such as Fn::Equals, Fn::Not, and Fn::RefAll. The condition property
 * determines if AWS CloudFormation applies the assertions. If the condition
 * evaluates to true, CloudFormation evaluates the assertions to verify whether
 * a parameter value is valid when a provisioned product is created or updated.
 * If a parameter value isn't valid, CloudFormation doesn't create or update the
 * stack. If the condition evaluates to false, CloudFormation doesn't check the
 * parameter value and proceeds with the stack operation.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-rules.html}
 */
export function intrinsicRule(name: string, args: unknown): IntrinsicRule {
  return { [name]: args } as IntrinsicRule;
}

/**
 * Makes an intrinsic function which produces a value.
 *
 * AWS CloudFormation provides several built-in functions that help you manage
 * your stacks. Use intrinsic functions in your templates to assign values to
 * properties that are not available until runtime.
 *
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html}
 */
export function intrinsicValue(name: string, args: unknown): unknown {
  return { [name]: args };
}
