import assert from "node:assert";
import { describe, it } from "node:test";
import { makePolicyDocument } from "./policy.js";

describe("makePolicyDocument()", () => {
  it("makes a policy document object", () => {
    const policy = makePolicyDocument(
      [
        {
          Action: ["svc:do-the-thing"],
        },
        {
          Effect: "Deny",
          Action: ["svc:secret"],
        },
      ],
      "2008-10-17",
    );

    assert.deepStrictEqual(policy, {
      Statement: [
        {
          Action: ["svc:do-the-thing"],
        },
        {
          Effect: "Deny",
          Action: ["svc:secret"],
        },
      ],
      Version: "2008-10-17",
    });
  });

  it("uses '2012-10-17' as the default version", () => {
    const policy = makePolicyDocument([
      {
        Action: ["svc:do-the-thing"],
      },
      {
        Effect: "Deny",
        Action: ["svc:secret"],
      },
    ]);

    assert.deepStrictEqual(policy, {
      Statement: [
        {
          Action: ["svc:do-the-thing"],
        },
        {
          Effect: "Deny",
          Action: ["svc:secret"],
        },
      ],
      Version: "2012-10-17",
    });
  });
});
