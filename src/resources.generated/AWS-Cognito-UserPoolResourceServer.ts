import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource Type definition for AWS::Cognito::UserPoolResourceServer
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolresourceserver.html}
 */
export type CognitoUserPoolResourceServerProperties = {
  Identifier: string;
  Name: string;
  Scopes?: ResourceServerScopeType[];
  UserPoolId: string;
};
/**
 * Attribute type definition for `AWS::Cognito::UserPoolResourceServer`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolresourceserver.html#aws-resource-cognito-userpoolresourceserver-return-values}
 */
export type CognitoUserPoolResourceServerAttributes = {
  Id: string;
};
/**
 * Type definition for `AWS::Cognito::UserPoolResourceServer.ResourceServerScopeType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cognito-userpoolresourceserver-resourceserverscopetype.html}
 */
export type ResourceServerScopeType = {
  ScopeDescription: string;
  ScopeName: string;
};
/**
 * Resource Type definition for AWS::Cognito::UserPoolResourceServer
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolresourceserver.html}
 */
export class CognitoUserPoolResourceServer extends $Resource<
  "AWS::Cognito::UserPoolResourceServer",
  CognitoUserPoolResourceServerProperties,
  CognitoUserPoolResourceServerAttributes
> {
  public static readonly Type = "AWS::Cognito::UserPoolResourceServer";
  public static readonly AttributeNames = ["Id" as const];
  constructor(
    logicalId: string,
    properties: CognitoUserPoolResourceServerProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      CognitoUserPoolResourceServer.Type,
      properties,
      CognitoUserPoolResourceServer.AttributeNames,
      options,
    );
  }
}
