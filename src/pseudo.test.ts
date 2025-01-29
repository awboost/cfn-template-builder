import assert from "node:assert";
import { describe, it } from "node:test";
import * as AwsParam from "./pseudo.js";

describe("pseudo", () => {
  it("has a `AccountId` getter", () => {
    const value = AwsParam.AccountId;

    assert.deepStrictEqual(value, { Ref: "AWS::AccountId" });
  });

  it("has a `NotificationARNs` getter", () => {
    const value = AwsParam.NotificationARNs;

    assert.deepStrictEqual(value, { Ref: "AWS::NotificationARNs" });
  });

  it("has a `NoValue` getter", () => {
    const value = AwsParam.NoValue;

    assert.deepStrictEqual(value, { Ref: "AWS::NoValue" });
  });

  it("has a `Partition` getter", () => {
    const value = AwsParam.Partition;

    assert.deepStrictEqual(value, { Ref: "AWS::Partition" });
  });

  it("has a `Region` getter", () => {
    const value = AwsParam.Region;

    assert.deepStrictEqual(value, { Ref: "AWS::Region" });
  });

  it("has a `StackId` getter", () => {
    const value = AwsParam.StackId;

    assert.deepStrictEqual(value, { Ref: "AWS::StackId" });
  });

  it("has a `StackName` getter", () => {
    const value = AwsParam.StackName;

    assert.deepStrictEqual(value, { Ref: "AWS::StackName" });
  });

  it("has a `URLSuffix` getter", () => {
    const value = AwsParam.URLSuffix;

    assert.deepStrictEqual(value, { Ref: "AWS::URLSuffix" });
  });
});
