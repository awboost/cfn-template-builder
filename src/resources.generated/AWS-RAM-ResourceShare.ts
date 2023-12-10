import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::RAM::ResourceShare
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ram-resourceshare.html}
 */
export type RAMResourceShareProperties = {
  AllowExternalPrincipals?: boolean;
  Name: string;
  PermissionArns?: string[];
  Principals?: string[];
  ResourceArns?: string[];
  Sources?: string[];
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::RAM::ResourceShare`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ram-resourceshare.html#aws-resource-ram-resourceshare-return-values}
 */
export type RAMResourceShareAttributes = {
  Arn: string;
  Id: string;
};
/**
 * Type definition for `AWS::RAM::ResourceShare.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ram-resourceshare-tag.html}
 */
export type Tag = {
  Key: string;
  Value: string;
};
/**
 * Resource Type definition for AWS::RAM::ResourceShare
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ram-resourceshare.html}
 */
export class RAMResourceShare extends $Resource<
  "AWS::RAM::ResourceShare",
  RAMResourceShareProperties,
  RAMResourceShareAttributes
> {
  public static readonly Type = "AWS::RAM::ResourceShare";
  public static readonly AttributeNames = ["Arn" as const, "Id" as const];
  constructor(
    logicalId: string,
    properties: RAMResourceShareProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      RAMResourceShare.Type,
      properties,
      RAMResourceShare.AttributeNames,
      options,
    );
  }
}
