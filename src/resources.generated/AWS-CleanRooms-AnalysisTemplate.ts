import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::CleanRooms::AnalysisTemplate`.
 * Represents a stored analysis within a collaboration
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-analysistemplate.html}
 */
export type CleanRoomsAnalysisTemplateProperties = {
  /**
   * The member who can query can provide this placeholder for a literal data value in an analysis template
   * @maxLength `10`
   */
  AnalysisParameters?: AnalysisParameter[];
  /**
   * @maxLength `255`
   * @pattern `^[\u0020-\uD7FF\uE000-\uFFFD\uD800\uDBFF-\uDC00\uDFFF\t\r\n]*$`
   */
  Description?: string;
  Format: "SQL";
  /**
   * @minLength `36`
   * @maxLength `36`
   * @pattern `[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`
   */
  MembershipIdentifier: string;
  /**
   * @maxLength `128`
   * @pattern `^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$`
   */
  Name: string;
  Source: AnalysisSource;
  /**
   * An arbitrary set of tags (key-value pairs) for this cleanrooms analysis template.
   */
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::CleanRooms::AnalysisTemplate`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-analysistemplate.html#aws-resource-cleanrooms-analysistemplate-return-values}
 */
export type CleanRoomsAnalysisTemplateAttributes = {
  /**
   * @minLength `36`
   * @maxLength `36`
   * @pattern `[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`
   */
  AnalysisTemplateIdentifier: string;
  /**
   * @maxLength `200`
   */
  Arn: string;
  /**
   * @maxLength `100`
   */
  CollaborationArn: string;
  /**
   * @minLength `36`
   * @maxLength `36`
   * @pattern `[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`
   */
  CollaborationIdentifier: string;
  /**
   * @maxLength `100`
   */
  MembershipArn: string;
  Schema: AnalysisSchema;
};
/**
 * Type definition for `AWS::CleanRooms::AnalysisTemplate.AnalysisParameter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-analysistemplate-analysisparameter.html}
 */
export type AnalysisParameter = {
  /**
   * @maxLength `250`
   */
  DefaultValue?: string;
  /**
   * @minLength `1`
   * @maxLength `100`
   * @pattern `[0-9a-zA-Z_]+`
   */
  Name: string;
  Type:
    | "SMALLINT"
    | "INTEGER"
    | "BIGINT"
    | "DECIMAL"
    | "REAL"
    | "DOUBLE_PRECISION"
    | "BOOLEAN"
    | "CHAR"
    | "VARCHAR"
    | "DATE"
    | "TIMESTAMP"
    | "TIMESTAMPTZ"
    | "TIME"
    | "TIMETZ"
    | "VARBYTE";
};
/**
 * Type definition for `AWS::CleanRooms::AnalysisTemplate.AnalysisSchema`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-analysistemplate-analysisschema.html}
 */
export type AnalysisSchema = {
  ReferencedTables: string[];
};
/**
 * Type definition for `AWS::CleanRooms::AnalysisTemplate.AnalysisSource`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-analysistemplate-analysissource.html}
 */
export type AnalysisSource = {
  /**
   * @maxLength `15000`
   */
  Text: string;
};
/**
 * Type definition for `AWS::CleanRooms::AnalysisTemplate.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cleanrooms-analysistemplate-tag.html}
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
 * Resource type definition for `AWS::CleanRooms::AnalysisTemplate`.
 * Represents a stored analysis within a collaboration
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-analysistemplate.html}
 */
export class CleanRoomsAnalysisTemplate extends $Resource<
  "AWS::CleanRooms::AnalysisTemplate",
  CleanRoomsAnalysisTemplateProperties,
  CleanRoomsAnalysisTemplateAttributes
> {
  public static readonly Type = "AWS::CleanRooms::AnalysisTemplate";
  public static readonly AttributeNames = [
    "AnalysisTemplateIdentifier" as const,
    "Arn" as const,
    "CollaborationArn" as const,
    "CollaborationIdentifier" as const,
    "MembershipArn" as const,
    "Schema" as const,
  ];
  constructor(
    logicalId: string,
    properties: CleanRoomsAnalysisTemplateProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      CleanRoomsAnalysisTemplate.Type,
      properties,
      CleanRoomsAnalysisTemplate.AttributeNames,
      options,
    );
  }
}
