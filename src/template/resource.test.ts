import assert from "node:assert";
import { describe, it, mock } from "node:test";
import type { TemplateFragment } from "../builder.js";
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

    const template: TemplateFragment = {
      assets: [],
      template: {},
      use: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    resource.onUse(template);

    assert.deepStrictEqual(template.template, {
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
      const resource = new Resource("MyResource", "Custom::MyResource", {
        One: "1",
        Two: 2,
      });

      const template: TemplateFragment = {
        assets: [],
        template: {},
        use: mock.fn(() => {
          assert(false, `unexpected call`);
        }),
      };

      const instance = resource.onUse(template);

      assert.strictEqual(instance.name, "MyResource");
    });
  });

  it("has a ref property", (t) => {
    const resource = new Resource("MyResource", "Custom::MyResource", {
      One: "1",
      Two: 2,
    });

    const template: TemplateFragment = {
      assets: [],
      template: {},
      use: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    const instance = resource.onUse(template);

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

    const template: TemplateFragment = {
      assets: [],
      template: {},
      use: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    const instance = resource.onUse(template);

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

    const template: TemplateFragment = {
      assets: [],
      template: {},
      use: mock.fn(() => {
        assert(false, `unexpected call`);
      }),
    };

    const instance = resource.onUse(template);

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
