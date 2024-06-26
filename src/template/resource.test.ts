import assert from "node:assert";
import { describe, it } from "node:test";
import { Resource } from "./resource.js";

describe("Resource", () => {
  it("adds a resource to the template", (t) => {
    const resource = new Resource(
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
    );
    const add = t.mock.fn();

    resource.onUse({ add } as any);

    assert.strictEqual(add.mock.calls.length, 1);
    assert.strictEqual(add.mock.calls[0]?.arguments[0], "Resources");
    assert.strictEqual(add.mock.calls[0]?.arguments[1], "MyResource");
    assert.deepStrictEqual(add.mock.calls[0]?.arguments[2], {
      Type: "Custom::MyResource",
      Properties: {
        One: "1",
        Two: 2,
      },
      Condition: "TheCondition",
      DeletionPolicy: "Delete",
    });
  });

  describe("the returned instance", () => {
    it("has the correct name", (t) => {
      const resource = new Resource("MyResource", "Custom::MyResource", {
        One: "1",
        Two: 2,
      });
      const add = t.mock.fn();

      const instance = resource.onUse({ add } as any);

      assert.strictEqual(instance.name, "MyResource");
    });
  });

  it("has a ref property", (t) => {
    const resource = new Resource("MyResource", "Custom::MyResource", {
      One: "1",
      Two: 2,
    });
    const add = t.mock.fn();

    const instance = resource.onUse({ add } as any);

    assert.deepStrictEqual(instance.ref, { Ref: "MyResource" });
  });

  it("has an out property", (t) => {
    const resource = new Resource<any, any, any>(
      "MyResource",
      "Custom::MyResource",
      {
        One: "1",
        Two: 2,
      },
    );
    const add = t.mock.fn();

    const instance = resource.onUse({ add } as any);

    assert.deepStrictEqual(instance.out["foo"].toJSON(), {
      "Fn::GetAtt": ["MyResource", "foo"],
    });
    assert.deepStrictEqual(instance.out["bar"].baz.toJSON(), {
      "Fn::GetAtt": ["MyResource", "bar.baz"],
    });
  });

  it("the out property is not directly serializable", (t) => {
    const resource = new Resource<any, any, any>(
      "MyResource",
      "Custom::MyResource",
      {
        One: "1",
        Two: 2,
      },
    );
    const add = t.mock.fn();

    const instance = resource.onUse({ add } as any);

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
