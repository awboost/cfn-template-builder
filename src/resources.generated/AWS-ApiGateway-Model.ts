import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * The ``AWS::ApiGateway::Model`` resource defines the structure of a request or response payload for an API method.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-model.html}
 */
export type ApiGatewayModelProperties = {
  /**
   * The content-type for the model.
   */
  ContentType?: string;
  /**
   * The description of the model.
   */
  Description?: string;
  /**
     * A name for the model. If you don't specify a name, CFN generates a unique physical ID and uses that ID for the model name. For more information, see [Name Type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html).
      If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.
     */
  Name?: string;
  /**
   * The string identifier of the associated RestApi.
   */
  RestApiId: string;
  /**
   * The schema for the model. For ``application/json`` models, this should be JSON schema draft 4 model. Do not include "\/‍*" characters in the description of any properties because such "\/‍*" characters may be interpreted as the closing marker for comments in some languages, such as Java or JavaScript, causing the installation of your API's SDK generated by API Gateway to fail.
   */
  Schema?: Record<string, any> | string;
};
/**
 * The ``AWS::ApiGateway::Model`` resource defines the structure of a request or response payload for an API method.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-model.html}
 */
export class ApiGatewayModel extends $Resource<
  "AWS::ApiGateway::Model",
  ApiGatewayModelProperties,
  Record<string, never>
> {
  public static readonly Type = "AWS::ApiGateway::Model";
  public static readonly AttributeNames = [];
  constructor(
    logicalId: string,
    properties: ApiGatewayModelProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      ApiGatewayModel.Type,
      properties,
      ApiGatewayModel.AttributeNames,
      options,
    );
  }
}
