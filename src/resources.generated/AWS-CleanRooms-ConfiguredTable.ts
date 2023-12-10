import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::CleanRooms::ConfiguredTable`.
 * Represents a table that can be associated with collaborations
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-configuredtable.html}
 */
export type CleanRoomsConfiguredTableProperties = {
  /**
   * @minLength `1`
   * @maxLength `100`
   */
  AllowedColumns: string[];
  AnalysisMethod: AnalysisMethod;
  /**
   * @minLength `1`
   * @maxLength `1`
   */
  AnalysisRules?: AnalysisRule[];
  /**
   * @maxLength `255`
   * @pattern `^[\u0020-\uD7FF\uE000-\uFFFD\uD800\uDBFF-\uDC00\uDFFF\t\r\n]*$`
   */
  Description?: string;
  /**
   * @minLength `1`
   * @maxLength `100`
   * @pattern `^(?!\s*$)[\u0020-\uD7FF\uE000-\uFFFD\uD800\uDBFF-\uDC00\uDFFF\t]*$`
   */
  Name: string;
  TableReference: TableReference;
  /**
   * An arbitrary set of tags (key-value pairs) for this cleanrooms collaboration.
   */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::CleanRooms::ConfiguredTable`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-configuredtable.html#aws-resource-cleanrooms-configuredtable-return-values}
 */
export type CleanRoomsConfiguredTableAttributes = {
  /**
   * @maxLength `100`
   */
  Arn: string;
  /**
   * @minLength `36`
   * @maxLength `36`
   * @pattern `[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`
   */
  ConfiguredTableIdentifier: string;
};
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.AggregateColumn`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-aggregatecolumn.html}
 */
export type AggregateColumn = {
  /**
   * @minLength `1`
   */
  ColumnNames: string[];
  Function: AggregateFunctionName;
};
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.AggregateFunctionName`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-aggregatefunctionname.html}
 */
export type AggregateFunctionName =
  | "SUM"
  | "SUM_DISTINCT"
  | "COUNT"
  | "COUNT_DISTINCT"
  | "AVG";
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.AggregationConstraint`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-aggregationconstraint.html}
 */
export type AggregationConstraint = {
  /**
   * @minLength `1`
   * @maxLength `127`
   * @pattern `^[a-z0-9_](([a-z0-9_ ]+-)*([a-z0-9_ ]+))?$`
   */
  ColumnName: string;
  /**
   * @min `2`
   * @max `100000`
   */
  Minimum: number;
  Type: AggregationType;
};
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.AggregationType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-aggregationtype.html}
 */
export type AggregationType = "COUNT_DISTINCT";
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.AnalysisMethod`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-analysismethod.html}
 */
export type AnalysisMethod = "DIRECT_QUERY";
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.AnalysisRule`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-analysisrule.html}
 */
export type AnalysisRule = {
  Policy: ConfiguredTableAnalysisRulePolicy;
  Type: ConfiguredTableAnalysisRuleType;
};
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.AnalysisRuleAggregation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-analysisruleaggregation.html}
 */
export type AnalysisRuleAggregation = {
  /**
   * @minLength `1`
   */
  AggregateColumns: AggregateColumn[];
  /**
   * @maxLength `2`
   */
  AllowedJoinOperators?: JoinOperator[];
  DimensionColumns: string[];
  JoinColumns: string[];
  JoinRequired?: JoinRequiredOption;
  /**
   * @minLength `1`
   */
  OutputConstraints: AggregationConstraint[];
  ScalarFunctions: ScalarFunctions[];
};
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.AnalysisRuleCustom`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-analysisrulecustom.html}
 */
export type AnalysisRuleCustom = {
  AllowedAnalyses: string[];
  AllowedAnalysisProviders?: string[];
};
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.AnalysisRuleList`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-analysisrulelist.html}
 */
export type AnalysisRuleList = {
  /**
   * @maxLength `2`
   */
  AllowedJoinOperators?: JoinOperator[];
  /**
   * @minLength `1`
   */
  JoinColumns: string[];
  ListColumns: string[];
};
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.ConfiguredTableAnalysisRulePolicy`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-configuredtableanalysisrulepolicy.html}
 */
export type ConfiguredTableAnalysisRulePolicy = {
  V1:
    | {
        List: AnalysisRuleList;
      }
    | {
        Aggregation: AnalysisRuleAggregation;
      }
    | {
        Custom: AnalysisRuleCustom;
      };
};
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.ConfiguredTableAnalysisRuleType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-configuredtableanalysisruletype.html}
 */
export type ConfiguredTableAnalysisRuleType = "AGGREGATION" | "LIST" | "CUSTOM";
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.GlueTableReference`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-gluetablereference.html}
 */
export type GlueTableReference = {
  /**
   * @maxLength `128`
   * @pattern `^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$`
   */
  DatabaseName: string;
  /**
   * @maxLength `128`
   * @pattern `^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$`
   */
  TableName: string;
};
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.JoinOperator`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-joinoperator.html}
 */
export type JoinOperator = "OR" | "AND";
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.JoinRequiredOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-joinrequiredoption.html}
 */
export type JoinRequiredOption = "QUERY_RUNNER";
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.ScalarFunctions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-scalarfunctions.html}
 */
export type ScalarFunctions =
  | "TRUNC"
  | "ABS"
  | "CEILING"
  | "FLOOR"
  | "LN"
  | "LOG"
  | "ROUND"
  | "SQRT"
  | "CAST"
  | "LOWER"
  | "RTRIM"
  | "UPPER"
  | "COALESCE";
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.TableReference`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-tablereference.html}
 */
export type TableReference = {
  Glue: GlueTableReference;
};
/**
 * Type definition for `AWS::CleanRooms::ConfiguredTable.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-configuredtable-tag.html}
 */
export type Tag = {
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Key: string;
  /**
   * @minLength `1`
   * @maxLength `256`
   */
  Value: string;
};
/**
 * Resource type definition for `AWS::CleanRooms::ConfiguredTable`.
 * Represents a table that can be associated with collaborations
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-configuredtable.html}
 */
export class CleanRoomsConfiguredTable extends $Resource<
  "AWS::CleanRooms::ConfiguredTable",
  CleanRoomsConfiguredTableProperties,
  CleanRoomsConfiguredTableAttributes
> {
  public static readonly Type = "AWS::CleanRooms::ConfiguredTable";
  public static readonly AttributeNames = [
    "Arn" as const,
    "ConfiguredTableIdentifier" as const,
  ];
  constructor(
    logicalId: string,
    properties: CleanRoomsConfiguredTableProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      CleanRoomsConfiguredTable.Type,
      properties,
      CleanRoomsConfiguredTable.AttributeNames,
      options,
    );
  }
}
