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
 * Build a valid ARN using the given parameters, with `accountId`, `partition`
 * and `region` defaulting to the values for the stack being deployed.
 *
 * ARNs can look like:
 *   - arn:partition:service:region:account-id:resource-id
 *   - arn:partition:service:region:account-id:resource-type/resource-id
 *   - arn:partition:service:region:account-id:resource-type:resource-id
 *
 * @see {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html | Amazon Resource Names (ARNs)}
 */
export function formatArn({
  accountId = AwsParam.AccountId,
  delimiter = "/",
  partition = AwsParam.Partition,
  region = AwsParam.Region,
  resourceId,
  resourceType,
  service,
}: ArnParts): IntrinsicValue {
  if (resourceType) {
    return Fn.join(":", [
      "arn",
      partition,
      service,
      region ?? "",
      accountId ?? "",
      Fn.join(delimiter, [resourceType, resourceId]),
    ]);
  } else {
    return Fn.join(":", [
      "arn",
      partition,
      service,
      region ?? "",
      accountId ?? "",
      resourceId,
    ]);
  }
}

/**
 * Build a valid ARN using the given parameters. The values `accountId`,
 * `partition` and `region` are set to the values for the stack being deployed.
 *
 * @see  {@link https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html | Amazon Resource Names (ARNs)}
 */
export function localArn(service: string, resourceId: string): IntrinsicValue;
/**
 * This overload is deprecated because there is no consistency in the delimiter
 * used to join {@link resourceType} and {@link resourceId} across different
 * services.
 * @deprecated
 */
export function localArn(
  service: string,
  resourceType: string,
  resourceId: string,
): IntrinsicValue;
export function localArn(
  service: string,
  resourceTypeOrId: string,
  resourceId?: string,
): IntrinsicValue {
  return Fn.join(":", [
    "arn",
    AwsParam.Partition,
    service,
    AwsParam.Region,
    AwsParam.AccountId,
    resourceId === undefined
      ? resourceTypeOrId
      : Fn.join("/", [resourceTypeOrId, resourceId]),
  ]);
}
