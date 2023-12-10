import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::WAFRegional::SizeConstraintSet
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-sizeconstraintset.html}
 */
export type WAFRegionalSizeConstraintSetProperties = {
  Name: string;
  SizeConstraints?: SizeConstraint[];
};
/**
 * Attribute type definition for `AWS::WAFRegional::SizeConstraintSet`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-sizeconstraintset.html#aws-resource-wafregional-sizeconstraintset-return-values}
 */
export type WAFRegionalSizeConstraintSetAttributes = {
  Id: string;
};
/**
 * Type definition for `AWS::WAFRegional::SizeConstraintSet.FieldToMatch`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-wafregional-sizeconstraintset-fieldtomatch.html}
 */
export type FieldToMatch = {
  Data?: string;
  Type: string;
};
/**
 * Type definition for `AWS::WAFRegional::SizeConstraintSet.SizeConstraint`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-wafregional-sizeconstraintset-sizeconstraint.html}
 */
export type SizeConstraint = {
  ComparisonOperator: string;
  FieldToMatch: FieldToMatch;
  Size: number;
  TextTransformation: string;
};
/**
 * Resource Type definition for AWS::WAFRegional::SizeConstraintSet
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-sizeconstraintset.html}
 */
export class WAFRegionalSizeConstraintSet extends $Resource<
  "AWS::WAFRegional::SizeConstraintSet",
  WAFRegionalSizeConstraintSetProperties,
  WAFRegionalSizeConstraintSetAttributes
> {
  public static readonly Type = "AWS::WAFRegional::SizeConstraintSet";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: WAFRegionalSizeConstraintSetProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      WAFRegionalSizeConstraintSet.Type,
      properties,
      WAFRegionalSizeConstraintSet.AttributeNames,
      options,
    );
  }
}
