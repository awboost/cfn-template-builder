import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::WAFRegional::GeoMatchSet
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-geomatchset.html}
 */
export type WAFRegionalGeoMatchSetProperties = {
  GeoMatchConstraints?: GeoMatchConstraint[];
  Name: string;
};
/**
 * Attribute type definition for `AWS::WAFRegional::GeoMatchSet`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-geomatchset.html#aws-resource-wafregional-geomatchset-return-values}
 */
export type WAFRegionalGeoMatchSetAttributes = {
  Id: string;
};
/**
 * Type definition for `AWS::WAFRegional::GeoMatchSet.GeoMatchConstraint`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-wafregional-geomatchset-geomatchconstraint.html}
 */
export type GeoMatchConstraint = {
  Type: string;
  Value: string;
};
/**
 * Resource Type definition for AWS::WAFRegional::GeoMatchSet
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-geomatchset.html}
 */
export class WAFRegionalGeoMatchSet extends $Resource<
  "AWS::WAFRegional::GeoMatchSet",
  WAFRegionalGeoMatchSetProperties,
  WAFRegionalGeoMatchSetAttributes
> {
  public static readonly Type = "AWS::WAFRegional::GeoMatchSet";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: WAFRegionalGeoMatchSetProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      WAFRegionalGeoMatchSet.Type,
      properties,
      WAFRegionalGeoMatchSet.AttributeNames,
      options,
    );
  }
}
