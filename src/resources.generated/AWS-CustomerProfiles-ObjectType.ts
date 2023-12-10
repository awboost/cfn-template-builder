import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::CustomerProfiles::ObjectType`.
 * An ObjectType resource of Amazon Connect Customer Profiles
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-customerprofiles-objecttype.html}
 */
export type CustomerProfilesObjectTypeProperties = {
  /**
   * Indicates whether a profile should be created when data is received.
   */
  AllowProfileCreation?: boolean;
  /**
   * Description of the profile object type.
   * @minLength `1`
   * @maxLength `1000`
   */
  Description?: string;
  /**
   * The unique name of the domain.
   * @minLength `1`
   * @maxLength `64`
   * @pattern `^[a-zA-Z0-9_-]+$`
   */
  DomainName: string;
  /**
   * The default encryption key
   * @maxLength `255`
   */
  EncryptionKey?: string;
  /**
   * The default number of days until the data within the domain expires.
   * @min `1`
   * @max `1098`
   */
  ExpirationDays?: number;
  /**
   * A list of the name and ObjectType field.
   */
  Fields?: FieldMap[];
  /**
   * A list of unique keys that can be used to map data to the profile.
   */
  Keys?: KeyMap[];
  /**
   * The name of the profile object type.
   * @minLength `1`
   * @maxLength `255`
   * @pattern `^[a-zA-Z_][a-zA-Z_0-9-]*$`
   */
  ObjectTypeName?: string;
  /**
   * The format of your sourceLastUpdatedTimestamp that was previously set up.
   * @minLength `1`
   * @maxLength `255`
   */
  SourceLastUpdatedTimestampFormat?: string;
  /**
   * The tags (keys and values) associated with the integration.
   * @maxLength `50`
   */
  Tags?: Tag[];
  /**
   * A unique identifier for the object template.
   * @minLength `1`
   * @maxLength `64`
   * @pattern `^[a-zA-Z0-9_-]+$`
   */
  TemplateId?: string;
};
/**
 * Attribute type definition for `AWS::CustomerProfiles::ObjectType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-customerprofiles-objecttype.html#aws-resource-customerprofiles-objecttype-return-values}
 */
export type CustomerProfilesObjectTypeAttributes = {
  /**
   * The time of this integration got created.
   */
  CreatedAt: string;
  /**
   * The time of this integration got last updated at.
   */
  LastUpdatedAt: string;
};
/**
 * Type definition for `AWS::CustomerProfiles::ObjectType.FieldMap`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-customerprofiles-objecttype-fieldmap.html}
 */
export type FieldMap = {
  /**
   * @minLength `1`
   * @maxLength `64`
   * @pattern `^[a-zA-Z0-9_-]+$`
   */
  Name?: string;
  /**
   * Represents a field in a ProfileObjectType.
   */
  ObjectTypeField?: ObjectTypeField;
};
/**
 * Type definition for `AWS::CustomerProfiles::ObjectType.KeyMap`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-customerprofiles-objecttype-keymap.html}
 */
export type KeyMap = {
  /**
   * @minLength `1`
   * @maxLength `64`
   * @pattern `^[a-zA-Z0-9_-]+$`
   */
  Name?: string;
  ObjectTypeKeyList?: ObjectTypeKey[];
};
/**
 * Type definition for `AWS::CustomerProfiles::ObjectType.ObjectTypeField`.
 * Represents a field in a ProfileObjectType.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-customerprofiles-objecttype-objecttypefield.html}
 */
export type ObjectTypeField = {
  /**
   * The content type of the field. Used for determining equality when searching.
   */
  ContentType?: "STRING" | "NUMBER" | "PHONE_NUMBER" | "EMAIL_ADDRESS" | "NAME";
  /**
   * A field of a ProfileObject. For example: _source.FirstName, where "_source" is a ProfileObjectType of a Zendesk user and "FirstName" is a field in that ObjectType.
   * @minLength `1`
   * @maxLength `1000`
   */
  Source?: string;
  /**
   * The location of the data in the standard ProfileObject model. For example: _profile.Address.PostalCode.
   * @minLength `1`
   * @maxLength `1000`
   */
  Target?: string;
};
/**
 * Type definition for `AWS::CustomerProfiles::ObjectType.ObjectTypeKey`.
 * An object that defines the Key element of a ProfileObject. A Key is a special element that can be used to search for a customer profile.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-customerprofiles-objecttype-objecttypekey.html}
 */
export type ObjectTypeKey = {
  /**
   * The reference for the key name of the fields map.
   */
  FieldNames?: string[];
  /**
   * The types of keys that a ProfileObject can have. Each ProfileObject can have only 1 UNIQUE key but multiple PROFILE keys. PROFILE means that this key can be used to tie an object to a PROFILE. UNIQUE means that it can be used to uniquely identify an object. If a key a is marked as SECONDARY, it will be used to search for profiles after all other PROFILE keys have been searched. A LOOKUP_ONLY key is only used to match a profile but is not persisted to be used for searching of the profile. A NEW_ONLY key is only used if the profile does not already exist before the object is ingested, otherwise it is only used for matching objects to profiles.
   */
  StandardIdentifiers?: (
    | "PROFILE"
    | "UNIQUE"
    | "SECONDARY"
    | "LOOKUP_ONLY"
    | "NEW_ONLY"
    | "ASSET"
    | "CASE"
    | "ORDER"
  )[];
};
/**
 * Type definition for `AWS::CustomerProfiles::ObjectType.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-customerprofiles-objecttype-tag.html}
 */
export type Tag = {
  /**
   * @minLength `1`
   * @maxLength `128`
   * @pattern `^(?!aws:)[a-zA-Z+-=._:/]+$`
   */
  Key: string;
  /**
   * @maxLength `256`
   */
  Value: string;
};
/**
 * Resource type definition for `AWS::CustomerProfiles::ObjectType`.
 * An ObjectType resource of Amazon Connect Customer Profiles
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-customerprofiles-objecttype.html}
 */
export class CustomerProfilesObjectType extends $Resource<
  "AWS::CustomerProfiles::ObjectType",
  CustomerProfilesObjectTypeProperties,
  CustomerProfilesObjectTypeAttributes
> {
  public static readonly Type = "AWS::CustomerProfiles::ObjectType";
  public static readonly AttributeNames = [
    "CreatedAt" as const,
    "LastUpdatedAt" as const,
  ];
  constructor(
    logicalId: string,
    properties: CustomerProfilesObjectTypeProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      CustomerProfilesObjectType.Type,
      properties,
      CustomerProfilesObjectType.AttributeNames,
      options,
    );
  }
}
