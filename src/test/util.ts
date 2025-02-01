import {
  createHash,
  type BinaryLike,
  type BinaryToTextEncoding,
} from "node:crypto";

/**
 * Compute a hash string.
 */
export function hash(
  input: BinaryLike,
  algorithm: string,
  digestEncoding: BinaryToTextEncoding = "hex",
  truncate?: number,
): string {
  const hash = createHash(algorithm).update(input).digest(digestEncoding);
  if (truncate !== undefined) {
    return hash.slice(0, truncate);
  }
  return hash;
}

/**
 * Force all resolvable symbols to be finalized by converting to JSON and back
 * again.
 */
export function resolveAll<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
