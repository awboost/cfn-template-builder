import { Fn, type IntrinsicValue } from "../intrinsics.js";
import { AwsParam } from "../pseudo.js";

/**
 * Represents one or more parts of an ARN.
 *
 * @see {@link https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html | Amazon Resource Names (ARNs)}
 */
export type ArnParts = {
  accountId?: string | null;
  delimiter?: string;
  partition?: string;
  region?: string | null;
  resourceId: string;
  resourceType?: string;
  service: string;
};

/**
 * Build a valid ARN using the given parameters. The values `accountId`,
 * `partition` and `region` are set to the values for the stack being deployed.
 *
 * @see  {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html | Amazon Resource Names (ARNs)}
 */
export function localArn(
  service: string,
  resourceId: string | string[],
): IntrinsicValue {
  const parts = [
    "arn",
    AwsParam.Partition,
    service,
    AwsParam.Region,
    AwsParam.AccountId,
  ];
  if (Array.isArray(resourceId)) {
    parts.push(Fn.join("", resourceId));
  } else {
    parts.push(resourceId);
  }
  return Fn.join(":", parts);
}
