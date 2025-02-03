import assert from "node:assert";
import {
  createHash,
  type BinaryLike,
  type BinaryToTextEncoding,
} from "node:crypto";
import { buffer } from "node:stream/consumers";
import type { TemplateFragment } from "../builder.js";
import type { StackWriter } from "../stack.js";
import type { Template } from "../template.js";

export type TestStackAsset = {
  content: Buffer;
  key: string;
  bucket: string;
  fileName: string;
};

/**
 * Makes assets inspectable for testing.
 */
export class TestStackWriter implements StackWriter {
  public static async write(stack: TemplateFragment): Promise<TestStackWriter> {
    const writer = new TestStackWriter();
    await writer.write(stack);
    return writer;
  }

  #template: Template | undefined;

  public readonly assets = new Map<string, TestStackAsset>();

  public get template(): Template {
    assert(this.#template, `call write() first`);
    return this.#template;
  }

  public async write(stack: TemplateFragment): Promise<void> {
    if (stack.assets) {
      for (const asset of stack.assets) {
        let content: Buffer;
        if (Buffer.isBuffer(asset.content)) {
          content = asset.content;
        } else if (typeof asset.content === "string") {
          content = Buffer.from(asset.content);
        } else {
          content = await buffer(asset.content);
        }

        const bucket = `Bucket:${asset.name}`;
        const key = `Key:${asset.name}`;

        this.assets.set(asset.name, {
          content,
          bucket,
          key,
          fileName: asset.fileName,
        });

        asset.resolveLocation(bucket, key);
      }
    }
    this.#template = resolveAll({ Resources: {}, ...stack.template });
  }
}

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
