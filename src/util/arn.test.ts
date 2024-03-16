import assert from "node:assert";
import { describe, it } from "node:test";
import { localArn } from "./arn.js";

describe("localArn", () => {
  it("formats an ARN with service and resourceId", () => {
    const ref = localArn("the-service", "the-resource");

    assert.deepStrictEqual(ref, {
      "Fn::Join": [
        ":",
        [
          "arn",
          { Ref: "AWS::Partition" },
          "the-service",
          { Ref: "AWS::Region" },
          { Ref: "AWS::AccountId" },
          "the-resource",
        ],
      ],
    });
  });

  it("formats an ARN with service, resourceType and resourceId (deprecated)", () => {
    const ref = localArn("the-service", "the-resource-type", "the-resource");

    assert.deepStrictEqual(ref, {
      "Fn::Join": [
        ":",
        [
          "arn",
          { Ref: "AWS::Partition" },
          "the-service",
          { Ref: "AWS::Region" },
          { Ref: "AWS::AccountId" },
          { "Fn::Join": ["/", ["the-resource-type", "the-resource"]] },
        ],
      ],
    });
  });
});
