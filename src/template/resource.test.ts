import assert from "node:assert";
import { describe, it } from "node:test";
import { Fragment } from "../fragment.js";
import { Resource, type ResourceInstance } from "./resource.js";

describe("Resource", () => {
  it("adds a resource to the template", (t) => {
    const fragment = new Fragment();

    fragment.add(
      new Resource(
        "MyResource",
        "Custom::MyResource",
        {
          One: "1",
          Two: 2,
        },
        {
          Condition: "TheCondition",
          DeletionPolicy: "Delete",
        },
      ),
    );

    assert.deepStrictEqual(fragment.template, {
      Resources: {
        MyResource: {
          Type: "Custom::MyResource",
          Properties: {
            One: "1",
            Two: 2,
          },
          Condition: "TheCondition",
          DeletionPolicy: "Delete",
        },
      },
    });
  });

  describe("the returned instance", () => {
    it("has the correct name", (t) => {
      const fragment = new Fragment();

      const instance = fragment.add(
        new Resource("MyResource", "Custom::MyResource", {
          One: "1",
          Two: 2,
        }),
      );

      assert.strictEqual(instance.name, "MyResource");
    });
  });

  it("has a ref property", (t) => {
    const fragment = new Fragment();

    const instance = fragment.add(
      new Resource("MyResource", "Custom::MyResource", {
        One: "1",
        Two: 2,
      }),
    );

    assert.deepStrictEqual(instance.ref, { Ref: "MyResource" });
  });

  it("has an out property", (t) => {
    const fragment = new Fragment();

    const instance = fragment.add(
      new Resource("MyResource", "Custom::MyResource", {
        One: "1",
        Two: 2,
      }),
    ) as ResourceInstance<any>;

    assert.deepStrictEqual(instance.out["foo"].toJSON(), {
      "Fn::GetAtt": ["MyResource", "foo"],
    });
    assert.deepStrictEqual(instance.out["bar"].baz.toJSON(), {
      "Fn::GetAtt": ["MyResource", "bar.baz"],
    });
  });

  it("the out property is not directly serializable", (t) => {
    const fragment = new Fragment();

    const instance = fragment.add(
      new Resource("MyResource", "Custom::MyResource", {
        One: "1",
        Two: 2,
      }),
    );

    assert.throws(
      () => JSON.stringify(instance.out),
      (err: any) => {
        assert.strictEqual(
          err.message,
          "the whole attributes object cannot be serialized directly",
        );
        return true;
      },
    );
  });
});
