import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::Budgets::Budget
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-budgets-budget.html}
 */
export type BudgetsBudgetProperties = {
  Budget: BudgetData;
  NotificationsWithSubscribers?: NotificationWithSubscribers[];
};
/**
 * Attribute type definition for `AWS::Budgets::Budget`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-budgets-budget.html#aws-resource-budgets-budget-return-values}
 */
export type BudgetsBudgetAttributes = {
  Id: string;
};
/**
 * Type definition for `AWS::Budgets::Budget.AutoAdjustData`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-autoadjustdata.html}
 */
export type AutoAdjustData = {
  AutoAdjustType: string;
  HistoricalOptions?: HistoricalOptions;
};
/**
 * Type definition for `AWS::Budgets::Budget.BudgetData`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-budgetdata.html}
 */
export type BudgetData = {
  AutoAdjustData?: AutoAdjustData;
  BudgetLimit?: Spend;
  BudgetName?: string;
  BudgetType: string;
  CostFilters?: Record<string, any>;
  CostTypes?: CostTypes;
  PlannedBudgetLimits?: Record<string, any>;
  TimePeriod?: TimePeriod;
  TimeUnit: string;
};
/**
 * Type definition for `AWS::Budgets::Budget.CostTypes`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-costtypes.html}
 */
export type CostTypes = {
  IncludeCredit?: boolean;
  IncludeDiscount?: boolean;
  IncludeOtherSubscription?: boolean;
  IncludeRecurring?: boolean;
  IncludeRefund?: boolean;
  IncludeSubscription?: boolean;
  IncludeSupport?: boolean;
  IncludeTax?: boolean;
  IncludeUpfront?: boolean;
  UseAmortized?: boolean;
  UseBlended?: boolean;
};
/**
 * Type definition for `AWS::Budgets::Budget.HistoricalOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-historicaloptions.html}
 */
export type HistoricalOptions = {
  BudgetAdjustmentPeriod: number;
};
/**
 * Type definition for `AWS::Budgets::Budget.Notification`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-notification.html}
 */
export type Notification = {
  ComparisonOperator: string;
  NotificationType: string;
  Threshold: number;
  ThresholdType?: string;
};
/**
 * Type definition for `AWS::Budgets::Budget.NotificationWithSubscribers`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-notificationwithsubscribers.html}
 */
export type NotificationWithSubscribers = {
  Notification: Notification;
  Subscribers: Subscriber[];
};
/**
 * Type definition for `AWS::Budgets::Budget.Spend`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-spend.html}
 */
export type Spend = {
  Amount: number;
  Unit: string;
};
/**
 * Type definition for `AWS::Budgets::Budget.Subscriber`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-subscriber.html}
 */
export type Subscriber = {
  Address: string;
  SubscriptionType: string;
};
/**
 * Type definition for `AWS::Budgets::Budget.TimePeriod`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-budgets-budget-timeperiod.html}
 */
export type TimePeriod = {
  End?: string;
  Start?: string;
};
/**
 * Resource Type definition for AWS::Budgets::Budget
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-budgets-budget.html}
 */
export class BudgetsBudget extends $Resource<
  "AWS::Budgets::Budget",
  BudgetsBudgetProperties,
  BudgetsBudgetAttributes
> {
  public static readonly Type = "AWS::Budgets::Budget";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: BudgetsBudgetProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      BudgetsBudget.Type,
      properties,
      BudgetsBudget.AttributeNames,
      options,
    );
  }
}
