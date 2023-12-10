import {
  PropertyDefinition,
  ResourceNamespace,
  TypeDefinition,
} from "@awboost/cfn-resource-schemas-db";
import ts from "typescript";

type DocumentationProps = {
  awsTypeKind?: "attributes" | "property" | "resource";
  awsTypeName?: string;
  description?: string;
  documentationUrl?: string;
  isInteger?: boolean;
  maximum?: number;
  maxLength?: number;
  minimum?: number;
  minLength?: number;
  pattern?: string;
};

const Names = {
  ResourceAttribs: "Attributes",
  ResourceAttribsAlt: "Attribs",
  ResourceBuilderImportPath: "../template/Resource.js",
  ResourceBuilderClass: "Resource",
  ResourceClassAttributesProp: "AttributeNames",
  ResourceClassTypeProp: "Type",
  ResourceName: "",
  ResourceOptionsType: "ResourceOptions",
  ResourceOptionsImportPath: "../template.js",
  ResourceProps: "Properties",
  LogicalResourceIdParam: "logicalId",
  PropertiesParam: "properties",
  OptionsParam: "options",
};

function mangleName(ns: string, type: string): string {
  return ns.replace(/^AWS|::|\./g, "") + type;
}

function shouldInlineType(type: TypeDefinition): boolean {
  return !(
    type.type === "object" ||
    type.type === "record" ||
    ((type.type === "string" || type.type === "number") && !!type.allowedValues)
  );
}

function createType(
  type: TypeDefinition | undefined,
  ns: ResourceNamespace,
): ts.TypeNode {
  if (type === undefined || type.type === "any") {
    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
  } else if (type.type === "array") {
    return ts.factory.createArrayTypeNode(createType(type.itemType, ns));
  } else if (type.type === "boolean") {
    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
  } else if (type.type === "null") {
    return ts.factory.createLiteralTypeNode(ts.factory.createNull());
  } else if (type.type === "number") {
    if (type.allowedValues) {
      return type.allowedValues.length === 1
        ? ts.factory.createLiteralTypeNode(
            ts.factory.createNumericLiteral(type.allowedValues[0]!),
          )
        : ts.factory.createUnionTypeNode(
            type.allowedValues.map((element) =>
              ts.factory.createLiteralTypeNode(
                ts.factory.createNumericLiteral(element),
              ),
            ),
          );
    }
    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
  } else if (type.type === "object") {
    return ts.factory.createTypeLiteralNode(
      type.properties.map((prop) =>
        attachComment(
          resolvePropertyDocs(ns, prop),
          ts.factory.createPropertySignature(
            undefined,
            prop.name,
            prop.optional
              ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
              : undefined,
            createType(prop.type, ns),
          ),
        ),
      ),
    );
  } else if (type.type === "record") {
    return ts.factory.createTypeReferenceNode("Record", [
      ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
      createType(type.valueType, ns),
    ]);
  } else if (type.type === "ref") {
    const target = ns.definitions[type.typeName];
    if (!target) {
      throw new Error(`invalid type reference "${type.typeName}"`);
    }
    if (shouldInlineType(target)) {
      return createType(target, ns);
    }
    return ts.factory.createTypeReferenceNode(type.typeName);
  } else if (type.type === "string") {
    if (type.allowedValues) {
      return type.allowedValues.length === 1
        ? ts.factory.createLiteralTypeNode(
            ts.factory.createStringLiteral(type.allowedValues[0]!),
          )
        : ts.factory.createUnionTypeNode(
            type.allowedValues.map((element) =>
              ts.factory.createLiteralTypeNode(
                ts.factory.createStringLiteral(element),
              ),
            ),
          );
    }
    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
  } else if (type.type === "undefined") {
    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword);
  } else if (type.type === "union") {
    if (type.types.length === 1) {
      return createType(type.types[0], ns);
    }
    return ts.factory.createUnionTypeNode(
      type.types.map((type) => createType(type, ns)),
    );
  }
  throw new Error(`unexpected type "${(type as any).type}"`);
}

function resolvePropertyDocs(
  ns: ResourceNamespace,
  property: PropertyDefinition,
): DocumentationProps[] {
  const docs: DocumentationProps[] = [property.type, property];
  if (property.type.type === "ref") {
    const target = ns.definitions[property.type.typeName];
    if (target) {
      docs.unshift(target);
    }
  }
  return docs;
}

function attachComment<T extends ts.Node>(
  input: DocumentationProps | DocumentationProps[],
  node: T,
): T {
  let props: DocumentationProps;
  if (Array.isArray(input)) {
    props = Object.fromEntries(
      input.flatMap((x) =>
        Object.entries(x).filter(([, v]) => v !== undefined),
      ),
    );
  } else {
    props = input;
  }
  const lines: string[] = [];

  if (props.awsTypeName && !props.description?.includes(props.awsTypeName)) {
    if (props.awsTypeKind === "attributes") {
      lines.push(`Attribute type definition for \`${props.awsTypeName}\`.`);
    } else if (props.awsTypeKind === "property") {
      lines.push(`Type definition for \`${props.awsTypeName}\`.`);
    } else if (props.awsTypeKind === "resource") {
      lines.push(`Resource type definition for \`${props.awsTypeName}\`.`);
    }
  }

  if (props.description) {
    lines.push(props.description);
  }

  // number validation
  if (props.minimum) {
    lines.push(`@min \`${props.minimum}\``);
  }
  if (props.maximum) {
    lines.push(`@max \`${props.maximum}\``);
  }

  // string validation
  if (props.minLength) {
    lines.push(`@minLength \`${props.minLength}\``);
  }
  if (props.maxLength) {
    lines.push(`@maxLength \`${props.maxLength}\``);
  }
  if (props.pattern) {
    lines.push(`@pattern \`${props.pattern}\``);
  }

  if (props.documentationUrl) {
    lines.push(`@see {@link ${props.documentationUrl}}`);
  }

  if (!lines.length) {
    return node;
  }
  // escape the */ sequence to avoid prematurely closing the comment
  const text =
    ["*", ...lines].join("\n * ").replace(/\*\//g, "/\u200d*") + "\n ";

  return ts.addSyntheticLeadingComment(
    node,
    ts.SyntaxKind.MultiLineCommentTrivia,
    text,
    true,
  );
}

function makeDocumentationUrl(
  typeName: string,
  extra?: "attributes",
): string | undefined {
  const match = typeName
    .toLowerCase()
    .match(/^(?:aws|alexa)::(.+)::([^.]+)(?:\.(.+))?$/);

  if (!match) {
    return;
  }

  const ns = match[3] ? "properties" : "resource";
  const suffix = match[3] ? "-" + match[3] : "";

  let url = `https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-${ns}-${match[1]}-${match[2]}${suffix}.html`;
  if (ns !== "properties" && extra === "attributes") {
    url += `#aws-resource-${match[1]}-${match[2]}-return-values`;
  }
  return url;
}

export function generateResourceFile(
  resource: ResourceNamespace,
): ts.Statement[] {
  const statements: ts.Statement[] = [];

  const attributeNames = resource.attributes
    ? resource.attributes.properties.map((x) => x.name)
    : [];

  const resourceName = mangleName(resource.awsTypeName, Names.ResourceName);

  const propertyTypeName = mangleName(
    resource.awsTypeName,
    Names.ResourceProps,
  );

  let attributeTypeName: string | undefined;

  // import { Resource as $Resource } from "../template/Resource.js";
  statements.push(
    ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(
        false,
        undefined,
        ts.factory.createNamedImports([
          ts.factory.createImportSpecifier(
            false,
            ts.factory.createIdentifier(Names.ResourceBuilderClass),
            ts.factory.createIdentifier(`$${Names.ResourceBuilderClass}`),
          ),
        ]),
      ),
      ts.factory.createStringLiteral(Names.ResourceBuilderImportPath),
    ),
  );

  // import { ResourceOptions as $ResourceOptions } from "../template.js";
  statements.push(
    ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(
        false,
        undefined,
        ts.factory.createNamedImports([
          ts.factory.createImportSpecifier(
            false,
            ts.factory.createIdentifier(Names.ResourceOptionsType),
            ts.factory.createIdentifier(`$${Names.ResourceOptionsType}`),
          ),
        ]),
      ),
      ts.factory.createStringLiteral(Names.ResourceOptionsImportPath),
    ),
  );

  // resource props type
  statements.push(
    attachComment(
      {
        documentationUrl: makeDocumentationUrl(resource.awsTypeName),
        ...resource.resource,
        awsTypeName: resource.awsTypeName,
        awsTypeKind: "resource",
      },
      ts.factory.createTypeAliasDeclaration(
        [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
        propertyTypeName,
        undefined,
        createType(resource.resource, resource),
      ),
    ),
  );

  // attributes type
  if (resource.attributes) {
    // avoid duplicate identifier when generating Attributes type
    const attributesName =
      Names.ResourceAttribs in resource.definitions
        ? mangleName(resource.awsTypeName, Names.ResourceAttribsAlt)
        : mangleName(resource.awsTypeName, Names.ResourceAttribs);

    attributeTypeName = attributesName;

    statements.push(
      attachComment(
        {
          documentationUrl: makeDocumentationUrl(
            resource.awsTypeName,
            "attributes",
          ),
          awsTypeName: resource.awsTypeName,
          awsTypeKind: "attributes",
        },
        ts.factory.createTypeAliasDeclaration(
          [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
          attributesName,
          undefined,
          createType(
            {
              ...resource.attributes,
              properties: resource.attributes.properties.map((prop) => ({
                ...prop,
                optional: false,
              })),
            },
            resource,
          ),
        ),
      ),
    );
  }

  // property types
  for (const [name, def] of Object.entries(resource.definitions)) {
    if (shouldInlineType(def)) {
      continue;
    }
    const awsTypeName = resource.awsTypeName + "." + name;

    statements.push(
      attachComment(
        {
          documentationUrl: makeDocumentationUrl(awsTypeName),
          ...def,
          awsTypeName,
          awsTypeKind: "property",
        },
        ts.factory.createTypeAliasDeclaration(
          [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
          name,
          undefined,
          createType(def, resource),
        ),
      ),
    );
  }

  // resource class
  statements.push(
    attachComment(
      {
        documentationUrl: makeDocumentationUrl(resource.awsTypeName),
        ...resource.resource,
        awsTypeName: resource.awsTypeName,
        awsTypeKind: "resource",
      },
      ts.factory.createClassDeclaration(
        [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
        resourceName,
        undefined,
        [
          // extends ResourceBuilder<"AWS::Service::Resource", PropsType, AttribsType>
          ts.factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
            ts.factory.createExpressionWithTypeArguments(
              ts.factory.createIdentifier(`$${Names.ResourceBuilderClass}`),
              [
                ts.factory.createLiteralTypeNode(
                  ts.factory.createStringLiteral(resource.awsTypeName),
                ),
                ts.factory.createTypeReferenceNode(propertyTypeName),
                attributeTypeName
                  ? ts.factory.createTypeReferenceNode(attributeTypeName)
                  : ts.factory.createTypeReferenceNode("Record", [
                      ts.factory.createKeywordTypeNode(
                        ts.SyntaxKind.StringKeyword,
                      ),
                      ts.factory.createKeywordTypeNode(
                        ts.SyntaxKind.NeverKeyword,
                      ),
                    ]),
              ],
            ),
          ]),
        ],
        [
          // public static readonly Type = "AWS::Service::Resource"
          ts.factory.createPropertyDeclaration(
            [
              ts.factory.createToken(ts.SyntaxKind.PublicKeyword),
              ts.factory.createToken(ts.SyntaxKind.StaticKeyword),
              ts.factory.createToken(ts.SyntaxKind.ReadonlyKeyword),
            ],
            Names.ResourceClassTypeProp,
            undefined,
            undefined,
            ts.factory.createStringLiteral(resource.awsTypeName),
          ),
          // public static readonly AttributeNames = [ "Attr" as const, ... ]
          ts.factory.createPropertyDeclaration(
            [
              ts.factory.createModifier(ts.SyntaxKind.PublicKeyword),
              ts.factory.createModifier(ts.SyntaxKind.StaticKeyword),
              ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword),
            ],
            Names.ResourceClassAttributesProp,
            undefined,
            undefined,
            ts.factory.createArrayLiteralExpression(
              attributeNames.map((x) =>
                ts.factory.createAsExpression(
                  ts.factory.createStringLiteral(x),
                  ts.factory.createTypeReferenceNode("const"),
                ),
              ),
            ),
          ),
          // constructor(logicalId, properties, options?)
          ts.factory.createConstructorDeclaration(
            undefined,
            [
              ts.factory.createParameterDeclaration(
                undefined,
                undefined,
                Names.LogicalResourceIdParam,
                undefined,
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
              ),
              ts.factory.createParameterDeclaration(
                undefined,
                undefined,
                Names.PropertiesParam,
                undefined,
                ts.factory.createTypeReferenceNode(propertyTypeName),
              ),
              ts.factory.createParameterDeclaration(
                undefined,
                undefined,
                Names.OptionsParam,
                ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                ts.factory.createTypeReferenceNode(
                  `$${Names.ResourceOptionsType}`,
                ),
              ),
            ],
            ts.factory.createBlock([
              // super()
              ts.factory.createExpressionStatement(
                ts.factory.createCallExpression(
                  ts.factory.createSuper(),
                  undefined,
                  [
                    ts.factory.createIdentifier(Names.LogicalResourceIdParam),
                    ts.factory.createPropertyAccessExpression(
                      ts.factory.createIdentifier(resourceName),
                      ts.factory.createIdentifier(Names.ResourceClassTypeProp),
                    ),
                    ts.factory.createIdentifier(Names.PropertiesParam),
                    ts.factory.createPropertyAccessExpression(
                      ts.factory.createIdentifier(resourceName),
                      ts.factory.createIdentifier(
                        Names.ResourceClassAttributesProp,
                      ),
                    ),
                    ts.factory.createIdentifier(Names.OptionsParam),
                  ],
                ),
              ),
            ]),
          ),
        ],
      ),
    ),
  );

  return statements;
}
