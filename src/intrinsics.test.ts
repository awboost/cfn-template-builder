import assert from "node:assert";
import { describe, it } from "node:test";
import * as Fn from "./intrinsics.js";

describe("intrinsics", () => {
  it("has a `And` function for Fn::And", () => {
    const input = [Symbol(), Symbol(), Symbol()] as any[];

    const result = Fn.And(...input);

    assert.deepStrictEqual(result, {
      "Fn::And": input,
    });
  });

  it("has a `Base64` function for Fn::Base64", () => {
    const input = "hello world";

    const result = Fn.Base64(input);

    assert.deepStrictEqual(result, {
      "Fn::Base64": input,
    });
  });

  it("has a `Cidr` function for Fn::Cidr", () => {
    const ipBlock = "192.168.0.0/24";
    const count = 6;
    const cidrBits = 5;

    const result = Fn.Cidr(ipBlock, count, cidrBits);

    assert.deepStrictEqual(result, {
      "Fn::Cidr": [ipBlock, count, cidrBits],
    });
  });

  it("has a `Condition` function for Condition", () => {
    const input = "hello-world";

    const result = Fn.Condition(input);

    assert.deepStrictEqual(result, {
      Condition: input,
    });
  });

  it("has a `Contains` function for Fn::Contains", () => {
    const list = ["one", "two", "three"];
    const find = "value";

    const result = Fn.Contains(list, find);

    assert.deepStrictEqual(result, {
      "Fn::Contains": [list, find],
    });
  });

  it("has a `eachMemberEquals` function for Fn::EachMemberEquals", () => {
    const list = ["one", "two", "three"];
    const allowed = "one";

    const result = Fn.EachMemberEquals(list, allowed);

    assert.deepStrictEqual(result, {
      "Fn::EachMemberEquals": [list, allowed],
    });
  });

  it("has a `EachMemberIn` function for Fn::EachMemberIn", () => {
    const list = ["one", "two", "three"];
    const allowed = ["one", "four"];

    const result = Fn.EachMemberIn(list, allowed);

    assert.deepStrictEqual(result, {
      "Fn::EachMemberIn": [list, allowed],
    });
  });

  it("has a `Equals` function for Fn::Equals", () => {
    const value1 = Symbol() as any;
    const value2 = Symbol() as any;

    const result = Fn.Equals(value1, value2);

    assert.deepStrictEqual(result, {
      "Fn::Equals": [value1, value2],
    });
  });

  it("has a `FindInMap` function for Fn::FindInMap", () => {
    const mapName = "MyMap";
    const topLevelKey = "KeyLevel1";
    const secondLevelKey = "KeyLevel2";

    const result = Fn.FindInMap(mapName, topLevelKey, secondLevelKey);

    assert.deepStrictEqual(result, {
      "Fn::FindInMap": [mapName, topLevelKey, secondLevelKey],
    });
  });

  it("has a `GetAtt` function for Fn::GetAtt", () => {
    const logicalName = "MyResource";
    const attrName = "MyAttribute";

    const result = Fn.GetAtt(logicalName, attrName);

    assert.deepStrictEqual(result, {
      "Fn::GetAtt": [logicalName, attrName],
    });
  });

  it("has a `GetAZs` function for Fn::GetAZs", () => {
    const region = "eu-central-1";

    const result = Fn.GetAZs(region);

    assert.deepStrictEqual(result, {
      "Fn::GetAZs": region,
    });
  });

  it("has a `If` function for Fn::If", () => {
    const name = "MyCondition";
    const trueValue = Symbol() as any;
    const falseValue = Symbol() as any;

    const result = Fn.If(name, trueValue, falseValue);

    assert.deepStrictEqual(result, {
      "Fn::If": [name, trueValue, falseValue],
    });
  });

  it("has a `ImportValue` function for Fn::ImportValue", () => {
    const name = "SomeOtherStack-Value";

    const result = Fn.ImportValue(name);

    assert.deepStrictEqual(result, {
      "Fn::ImportValue": name,
    });
  });

  it("has a `Join` function for Fn::Join", () => {
    const delimiter = ",";
    const input = [Symbol(), Symbol(), Symbol()] as any[];

    const result = Fn.Join(delimiter, input);

    assert.deepStrictEqual(result, {
      "Fn::Join": [delimiter, input],
    });
  });

  it("has a `template` function that turns a tagged template string into Fn::Join", () => {
    const input = [Symbol(), Symbol(), Symbol()] as any[];

    const result = Fn.joinString`one${input[0]}two${input[1]}three${input[2]}`;

    assert.deepStrictEqual(result, {
      "Fn::Join": ["", ["one", input[0], "two", input[1], "three", input[2]]],
    });
  });

  it("has a `Not` function for Fn::Not", () => {
    const input = Symbol() as any;

    const result = Fn.Not(input);

    assert.deepStrictEqual(result, {
      "Fn::Not": [input],
    });
  });

  it("has a `Or` function for Fn::Or", () => {
    const input = [Symbol(), Symbol(), Symbol()] as any[];

    const result = Fn.Or(...input);

    assert.deepStrictEqual(result, {
      "Fn::Or": input,
    });
  });

  it("has a `Ref` function for Ref", () => {
    const input = "mySymbol";

    const result = Fn.Ref(input);

    assert.deepStrictEqual(result, {
      Ref: input,
    });
  });

  it("has a `RefAll` function for Fn::RefAll", () => {
    const input = "mySymbol";

    const result = Fn.RefAll(input);

    assert.deepStrictEqual(result, {
      "Fn::RefAll": input,
    });
  });

  it("has a `Select` function for Fn::Select", () => {
    const index = 2;
    const input = [Symbol(), Symbol(), Symbol()];

    const result = Fn.Select(index, input);

    assert.deepStrictEqual(result, {
      "Fn::Select": [index, input],
    });
  });

  it("has a `Split` function for Fn::Split", () => {
    const result = Fn.Split("|", "a|b|c");

    assert.deepStrictEqual(result, {
      "Fn::Split": ["|", "a|b|c"],
    });
  });

  it("has a `sub` function for Fn::Sub", () => {
    const result = Fn.Sub("www.${Domain}", {
      Domain: { Ref: "RootDomainName" } as any,
    });

    assert.deepStrictEqual(result, {
      "Fn::Sub": [
        "www.${Domain}",
        {
          Domain: { Ref: "RootDomainName" },
        },
      ],
    });
  });

  it("has a `ValueOf` function for Fn::ValueOf", () => {
    const result = Fn.ValueOf("ElbVpc", "Tags.Department");

    assert.deepStrictEqual(result, {
      "Fn::ValueOf": ["ElbVpc", "Tags.Department"],
    });
  });

  it("has a `ValueOfAll` function for Fn::ValueOfAll", () => {
    const result = Fn.ValueOfAll("AWS::EC2::VPC::Id", "Tags.Department");

    assert.deepStrictEqual(result, {
      "Fn::ValueOfAll": ["AWS::EC2::VPC::Id", "Tags.Department"],
    });
  });
});
