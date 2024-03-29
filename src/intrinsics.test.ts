import assert from "node:assert";
import { describe, it } from "node:test";
import { Fn } from "./intrinsics.js";

describe("Fn", () => {
  it("has a `and` method for Fn::And", () => {
    const input = [Symbol(), Symbol(), Symbol()];

    const result = Fn.and(...input);

    assert.deepStrictEqual(result, {
      "Fn::And": input,
    });
  });

  it("has a `base64` method for Fn::Base64", () => {
    const input = "hello world";

    const result = Fn.base64(input);

    assert.deepStrictEqual(result, {
      "Fn::Base64": input,
    });
  });

  it("has a `cidr` method for Fn::Cidr", () => {
    const ipBlock = "192.168.0.0/24";
    const count = 6;
    const cidrBits = 5;

    const result = Fn.cidr(ipBlock, count, cidrBits);

    assert.deepStrictEqual(result, {
      "Fn::Cidr": [ipBlock, count, cidrBits],
    });
  });

  it("has a `contains` method for Fn::Contains", () => {
    const list = ["one", "two", "three"];
    const find = "value";

    const result = Fn.contains(list, find);

    assert.deepStrictEqual(result, {
      "Fn::Contains": [list, find],
    });
  });

  it("has a `eachMemberEquals` method for Fn::EachMemberEquals", () => {
    const list = ["one", "two", "three"];
    const allowed = "one";

    const result = Fn.eachMemberEquals(list, allowed);

    assert.deepStrictEqual(result, {
      "Fn::EachMemberEquals": [list, allowed],
    });
  });

  it("has a `eachMemberIn` method for Fn::EachMemberIn", () => {
    const list = ["one", "two", "three"];
    const allowed = ["one", "four"];

    const result = Fn.eachMemberIn(list, allowed);

    assert.deepStrictEqual(result, {
      "Fn::EachMemberIn": [list, allowed],
    });
  });

  it("has a `equals` method for Fn::Equals", () => {
    const value1 = Symbol();
    const value2 = Symbol();

    const result = Fn.equals(value1, value2);

    assert.deepStrictEqual(result, {
      "Fn::Equals": [value1, value2],
    });
  });

  it("has a `findInMap` method for Fn::FindInMap", () => {
    const mapName = "MyMap";
    const topLevelKey = "KeyLevel1";
    const secondLevelKey = "KeyLevel2";

    const result = Fn.findInMap(mapName, topLevelKey, secondLevelKey);

    assert.deepStrictEqual(result, {
      "Fn::FindInMap": [mapName, topLevelKey, secondLevelKey],
    });
  });

  it("has a `getAtt` method for Fn::GetAtt", () => {
    const logicalName = "MyResource";
    const attrName = "MyAttribute";

    const result = Fn.getAtt(logicalName, attrName);

    assert.deepStrictEqual(result, {
      "Fn::GetAtt": [logicalName, attrName],
    });
  });

  it("has a `getAZs` method for Fn::GetAZs", () => {
    const region = "eu-central-1";

    const result = Fn.getAZs(region);

    assert.deepStrictEqual(result, {
      "Fn::GetAZs": region,
    });
  });

  it("has a `ifThen` method for Fn::If", () => {
    const name = "MyCondition";
    const trueValue = Symbol();
    const falseValue = Symbol();

    const result = Fn.ifThen(name, trueValue, falseValue);

    assert.deepStrictEqual(result, {
      "Fn::If": [name, trueValue, falseValue],
    });
  });

  it("has a `importValue` method for Fn::ImportValue", () => {
    const name = "SomeOtherStack-Value";

    const result = Fn.importValue(name);

    assert.deepStrictEqual(result, {
      "Fn::ImportValue": name,
    });
  });

  it("has a `join` method for Fn::Join", () => {
    const delimiter = ",";
    const input = [Symbol(), Symbol(), Symbol()];

    const result = Fn.join(delimiter, input);

    assert.deepStrictEqual(result, {
      "Fn::Join": [delimiter, input],
    });
  });

  it("has a `join$` method that turns a tagged template string into Fn::Join", () => {
    const input = [Symbol(), Symbol(), Symbol()];

    const result = Fn.join$`one${input[0]}two${input[1]}three${input[2]}`;

    assert.deepStrictEqual(result, {
      "Fn::Join": ["", ["one", input[0], "two", input[1], "three", input[2]]],
    });
  });

  it("has a `not` method for Fn::Not", () => {
    const input = Symbol();

    const result = Fn.not(input);

    assert.deepStrictEqual(result, {
      "Fn::Not": [input],
    });
  });

  it("has a `or` method for Fn::Or", () => {
    const input = [Symbol(), Symbol(), Symbol()];

    const result = Fn.or(...input);

    assert.deepStrictEqual(result, {
      "Fn::Or": input,
    });
  });

  it("has a `ref` method for Ref", () => {
    const input = "mySymbol";

    const result = Fn.ref(input);

    assert.deepStrictEqual(result, {
      Ref: input,
    });
  });

  it("has a `refAll` method for Fn::RefAll", () => {
    const input = "mySymbol";

    const result = Fn.refAll(input);

    assert.deepStrictEqual(result, {
      "Fn::RefAll": input,
    });
  });

  it("has a `select` method for Fn::Select", () => {
    const index = 2;
    const input = [Symbol(), Symbol(), Symbol()];

    const result = Fn.select(index, input);

    assert.deepStrictEqual(result, {
      "Fn::Select": [index, input],
    });
  });

  it("has a `split` method for Fn::Split", () => {
    const result = Fn.split("|", "a|b|c");

    assert.deepStrictEqual(result, {
      "Fn::Split": ["|", "a|b|c"],
    });
  });

  it("has a `sub` method for Fn::Sub", () => {
    const result = Fn.sub("www.${Domain}", {
      Domain: { Ref: "RootDomainName" },
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

  it("has a `valueOf` method for Fn::ValueOf", () => {
    const result = Fn.valueOf("ElbVpc", "Tags.Department");

    assert.deepStrictEqual(result, {
      "Fn::ValueOf": ["ElbVpc", "Tags.Department"],
    });
  });

  it("has a `valueOfAll` method for Fn::ValueOfAll", () => {
    const result = Fn.valueOfAll("AWS::EC2::VPC::Id", "Tags.Department");

    assert.deepStrictEqual(result, {
      "Fn::ValueOfAll": ["AWS::EC2::VPC::Id", "Tags.Department"],
    });
  });
});
