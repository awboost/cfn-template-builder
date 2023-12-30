# @awboost/cfn-template-builder

Zero-dependency package for building [AWS CloudFormation Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-formats.html).

## Raw Template Types

TypeScript types are available for the plain [AWS CloudFormation Template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-formats.html) by importing from `@awboost/cfn-template-builder/template`. For performance reasons (there are thousands of resource types), the resource properties are not strongly typed. Strong types for resources are available from [`@awboost/cfn-resource-types`](https://www.npmjs.com/package/@awboost/cfn-resource-types).

```typescript
import { Template } from "@awboost/cfn-template-builder/template";

const template: Template = {
  Resources: {
    MyFunction: {
      // resource types are not strongly typed here
      Type: "AWS::Lambda::Function",
      Properties: {
        Code: {
          S3Bucket: "my-bucket",
          S3Key: "code",
        },
        Role: "arn:etc:...:...",
      },
    },
  },
};
```

## Building a Stack

A template can be constructed by combining one or more template items using the `Stack` class:

```typescript
import { Stack } from "@awboost/cfn-template-builder/stack";
import { Parameter } from "@awboost/cfn-template-builder/template/Parameter";
import { LambdaFunction } from "@awboost/cfn-resource-types/AWS-Lambda-Function";

const stack = new Stack();

const bucketParam = stack.use(new Parameter("CodeBucket", "String"));
const objectParam = stack.use(new Parameter("CodeKey", "String"));

const lambda = stack.use(
  new LambdaFunction("MyFunction", {
    // properties have accurate types now
    Code: {
      S3Bucket: bucketParam.ref,
      S3Key: objectParam.ref,
    },
    Role: "arn:etc:...:...",
  }),
);

// now write the JSON template to the given path
const emitter = new FileSystemAssetEmitter({
  outputDirectory: "/path/to/output",
});

await stack.build(emitter, { templateFileName: "template.json" });
```

## Using Assets

Additional files can be used by the stack by using the `Asset` class. These will automatically be output alongside the template when the stack is emitted.

```typescript
import { Stack } from "@awboost/cfn-template-builder/stack";
import { Asset } from "@awboost/cfn-template-builder/template/Asset";
import { LambdaFunction } from "@awboost/cfn-resource-types/AWS-Lambda-Function";

const stack = new Stack();

const codeAsset = Asset.fromFile("LambdaCode", "my-code.zip");

const lambda = stack.use(
  new LambdaFunction("MyFunction", {
    // properties have accurate types now
    Code: codeAsset.ref,
    Role: "arn:etc:...:...",
  }),
);
```

## Intrinsic Functions and Pseudo Parameters

[Intrinsic Functions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html) and [Pseudo Parameters](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/pseudo-parameter-reference.html) are available via `Fn` and `AwsParam` classes respectively.

Additionally the `Fn` class has a `join$` method which can construct a value via a [tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) string. This uses the [`Fn::Join` function](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-join.html) under the hood to construct a string from the input.

```typescript
import { Fn } from "@awboost/cfn-template-builder/intrinsics";
import { AwsParam } from "@awboost/cfn-template-builder/pseudo";
import { Template } from "@awboost/cfn-template-builder/template";

const template: Template = {
  Parameters: {
    CodeBucket: { Type: "String" },
    CodeObject: { Type: "String" },
  },
  Resources: {
    MyFunction: {
      Type: "AWS::Lambda::Function",
      Properties: {
        Code: {
          S3Bucket: Fn.ref("CodeBucket"),
          S3Key: Fn.ref("CodeObject"),
        },
        Role: "arn:etc:...:...",
        FunctionName: Fn.join$`${AwsParam.StackName}-MyFunction`,
      },
    },
  },
};
```

Here the `Fn.join$` call is equivalent to:

```typescript
Fn.join("", [AwsParam.StackName, "-MyFunction"]);
```

This ultimately outputs the following JSON in the template:

```json
{
  "Fn::Join": ["", [{ "Ref": "AWS::StackName" }, "-MyFunction"]]
}
```
