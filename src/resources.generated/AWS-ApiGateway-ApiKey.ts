import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * The ``AWS::ApiGateway::ApiKey`` resource creates a unique key that you can distribute to clients who are executing API Gateway ``Method`` resources that require an API key. To specify which API key clients must use, map the API key with the ``RestApi`` and ``Stage`` resources that include the methods that require a key.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-apikey.html}
 */
export type ApiGatewayApiKeyProperties = {
  /**
   * An MKT customer identifier, when integrating with the AWS SaaS Marketplace.
   */
  CustomerId?: string;
  /**
   * The description of the ApiKey.
   */
  Description?: string;
  /**
   * Specifies whether the ApiKey can be used by callers.
   */
  Enabled?: boolean;
  /**
   * Specifies whether (``true``) or not (``false``) the key identifier is distinct from the created API key value. This parameter is deprecated and should not be used.
   */
  GenerateDistinctId?: boolean;
  /**
     * A name for the API key. If you don't specify a name, CFN generates a unique physical ID and uses that ID for the API key name. For more information, see [Name Type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html).
     If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.
     */
  Name?: string;
  /**
   * DEPRECATED FOR USAGE PLANS - Specifies stages associated with the API key.
   */
  StageKeys?: StageKey[];
  /**
   * The key-value map of strings. The valid character set is [a-zA-Z+-=._:/]. The tag key can be up to 128 characters and must not start with ``aws:``. The tag value can be up to 256 characters.
   */
  Tags?: Tag[];
  /**
   * Specifies a value of the API key.
   */
  Value?: string;
};
/**
 * Attribute type definition for `AWS::ApiGateway::ApiKey`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-apikey.html#aws-resource-apigateway-apikey-return-values}
 */
export type ApiGatewayApiKeyAttributes = {
  APIKeyId: string;
};
/**
 * Type definition for `AWS::ApiGateway::ApiKey.StageKey`.
 * ``StageKey`` is a property of the [AWS::ApiGateway::ApiKey](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-apikey.html) resource that specifies the stage to associate with the API key. This association allows only clients with the key to make requests to methods in that stage.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigateway-apikey-stagekey.html}
 */
export type StageKey = {
  /**
   * The string identifier of the associated RestApi.
   */
  RestApiId?: string;
  /**
   * The stage name associated with the stage key.
   */
  StageName?: string;
};
/**
 * Type definition for `AWS::ApiGateway::ApiKey.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigateway-apikey-tag.html}
 */
export type Tag = {
  /**
   * The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @minLength `1`
   * @maxLength `128`
   */
  Key: string;
  /**
   * The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.
   * @maxLength `256`
   */
  Value: string;
};
/**
 * The ``AWS::ApiGateway::ApiKey`` resource creates a unique key that you can distribute to clients who are executing API Gateway ``Method`` resources that require an API key. To specify which API key clients must use, map the API key with the ``RestApi`` and ``Stage`` resources that include the methods that require a key.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-apikey.html}
 */
export class ApiGatewayApiKey extends $Resource<
  "AWS::ApiGateway::ApiKey",
  ApiGatewayApiKeyProperties,
  ApiGatewayApiKeyAttributes
> {
  public static readonly Type = "AWS::ApiGateway::ApiKey";
  public static readonly AttributeNames = ["APIKeyId" as const];
  constructor(
    logicalId: string,
    properties: ApiGatewayApiKeyProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      ApiGatewayApiKey.Type,
      properties,
      ApiGatewayApiKey.AttributeNames,
      options,
    );
  }
}
