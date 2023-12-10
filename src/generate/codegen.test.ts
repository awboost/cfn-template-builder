import assert from "node:assert";
import { describe, it } from "node:test";
import ts from "typescript";
import { generateResourceFile } from "./codegen.js";

describe("generateResourceFile", () => {
  it("creates a property type alias declaration", () => {
    const statements = generateResourceFile({
      awsTypeName: "AWS::Hello::World",
      definitions: {},
      resource: {
        type: "object",
        properties: [],
      },
    });

    const propTypeDefs = statements.filter(ts.isTypeAliasDeclaration);

    assert.strictEqual(propTypeDefs.length, 1);
    assert.strictEqual(propTypeDefs[0]?.name.text, "HelloWorldProperties");
  });

  describe("the property type alias declaration", () => {
    it("is named with `Properties` as a suffix and without `AWS` as a prefix", () => {
      const statements = generateResourceFile({
        awsTypeName: "AWS::Hello::World",
        definitions: {},
        resource: {
          type: "object",
          properties: [],
        },
      });

      const propTypeDefs = statements.filter(ts.isTypeAliasDeclaration);

      assert.strictEqual(propTypeDefs.length, 1);
      assert.strictEqual(propTypeDefs[0]?.name.text, "HelloWorldProperties");
    });

    it("is named with `Properties` and with a non-AWS namespace as a prefix", () => {
      const statements = generateResourceFile({
        awsTypeName: "Alexa::Hello::World",
        definitions: {},
        resource: {
          type: "object",
          properties: [],
        },
      });

      const propTypeDefs = statements.filter(ts.isTypeAliasDeclaration);

      assert.strictEqual(propTypeDefs.length, 1);
      assert.strictEqual(
        propTypeDefs[0]?.name.text,
        "AlexaHelloWorldProperties",
      );
    });

    it("has a property for each defined property", () => {
      const statements = generateResourceFile({
        awsTypeName: "AWS::Hello::World",
        definitions: {},
        resource: {
          type: "object",
          properties: [
            {
              name: "propOne",
              type: { type: "string" },
            },
            {
              name: "propTwo",
              type: { type: "number" },
            },
            {
              name: "propThree",
              type: { type: "boolean" },
            },
          ],
        },
      });

      const propTypeDef = statements.find(
        (x): x is ts.TypeAliasDeclaration =>
          ts.isTypeAliasDeclaration(x) &&
          x.name.text === "HelloWorldProperties",
      );

      assert.ok(propTypeDef);
      assert.ok(ts.isTypeLiteralNode(propTypeDef.type));

      assert.strictEqual(propTypeDef.type.members.length, 3);
      const [prop1, prop2, prop3] = propTypeDef.type.members;

      assert.ok(prop1 && ts.isPropertySignature(prop1));
      assert.ok(ts.isIdentifier(prop1.name));
      assert.strictEqual(prop1.name.text, "propOne");
      assert.ok(prop1.type && prop1.type.kind === ts.SyntaxKind.StringKeyword);
      assert.ok(!prop1.questionToken);

      assert.ok(prop2 && ts.isPropertySignature(prop2));
      assert.ok(ts.isIdentifier(prop2.name));
      assert.strictEqual(prop2.name.text, "propTwo");
      assert.ok(prop2.type && prop2.type.kind === ts.SyntaxKind.NumberKeyword);
      assert.ok(!prop2.questionToken);

      assert.ok(prop3 && ts.isPropertySignature(prop3));
      assert.ok(ts.isIdentifier(prop3.name));
      assert.strictEqual(prop3.name.text, "propThree");
      assert.ok(prop3.type && prop3.type.kind === ts.SyntaxKind.BooleanKeyword);
      assert.ok(!prop3.questionToken);
    });

    it("supports optional properties", () => {
      const statements = generateResourceFile({
        awsTypeName: "AWS::Hello::World",
        definitions: {},
        resource: {
          type: "object",
          properties: [
            {
              name: "propOne",
              type: { type: "string" },
              optional: true,
            },
          ],
        },
      });

      const propTypeDef = statements.find(
        (x): x is ts.TypeAliasDeclaration =>
          ts.isTypeAliasDeclaration(x) &&
          x.name.text === "HelloWorldProperties",
      );

      assert.ok(propTypeDef);
      assert.ok(ts.isTypeLiteralNode(propTypeDef.type));

      assert.strictEqual(propTypeDef.type.members.length, 1);
      const prop1 = propTypeDef.type.members[0];

      assert.ok(prop1 && ts.isPropertySignature(prop1));
      assert.ok(prop1.type && prop1.type.kind === ts.SyntaxKind.StringKeyword);
      assert.ok(prop1.questionToken);
    });

    it("supports union types", () => {
      const statements = generateResourceFile({
        awsTypeName: "AWS::Hello::World",
        definitions: {},
        resource: {
          type: "object",
          properties: [
            {
              name: "propOne",
              type: {
                type: "union",
                types: [{ type: "string" }, { type: "number" }],
              },
            },
          ],
        },
      });

      const propTypeDef = statements.find(
        (x): x is ts.TypeAliasDeclaration =>
          ts.isTypeAliasDeclaration(x) &&
          x.name.text === "HelloWorldProperties",
      );

      assert.ok(propTypeDef);
      assert.ok(ts.isTypeLiteralNode(propTypeDef.type));

      assert.strictEqual(propTypeDef.type.members.length, 1);
      const prop1 = propTypeDef.type.members[0];

      assert.ok(prop1 && ts.isPropertySignature(prop1));
      assert.ok(prop1.type && ts.isUnionTypeNode(prop1.type));
      assert.strictEqual(prop1.type.types.length, 2);
      assert.strictEqual(
        prop1.type.types[0]?.kind,
        ts.SyntaxKind.StringKeyword,
      );
      assert.strictEqual(
        prop1.type.types[1]?.kind,
        ts.SyntaxKind.NumberKeyword,
      );
    });
  });

  it("creates a type alias declaration for each definition", () => {
    const statements = generateResourceFile({
      awsTypeName: "AWS::Hello::World",
      definitions: {
        TypeOne: {
          type: "object",
          properties: [],
        },
        TypeTwo: {
          type: "object",
          properties: [],
        },
      },
      resource: {
        type: "object",
        properties: [],
      },
    });

    const propTypeDefs = statements.filter(ts.isTypeAliasDeclaration);

    assert.strictEqual(propTypeDefs.length, 3);

    assert.ok(propTypeDefs.find((x) => x.name.text === "HelloWorldProperties"));
    assert.ok(propTypeDefs.find((x) => x.name.text === "TypeOne"));
    assert.ok(propTypeDefs.find((x) => x.name.text === "TypeTwo"));
  });
});
