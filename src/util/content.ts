import { nextTick } from "node:process";
import { Readable } from "node:stream";
import { checkData, integrityStream } from "ssri";
import type { ContentLike } from "../builder.js";
import { streamLength, type Fs } from "../internal/stream-length.js";

export type ContentStreamInput = {
  content: ContentLike;
  integrity?: string;
};

export async function contentLength(
  content: ContentLike,
  fs?: Partial<Fs>,
): Promise<number | undefined> {
  if (typeof content === "string") {
    return Buffer.byteLength(content);
  }
  if (Buffer.isBuffer(content)) {
    return content.byteLength;
  }
  return await streamLength(content, fs);
}

export function makeContentStream(asset: ContentStreamInput): Readable {
  const { content, integrity } = asset;

  if (typeof content === "string" || Buffer.isBuffer(content)) {
    const contentStream = Readable.from(content);

    if (integrity) {
      try {
        checkData(content, integrity, { error: true });
      } catch (cause: any) {
        nextTick(() => contentStream.destroy(cause));
      }
    }

    return contentStream;
  }
  if (integrity) {
    const output = integrityStream({ integrity });
    content.on("error", (cause) => output.destroy(cause));
    content.pipe(output);
    // wrap the stream because ssri uses minipass streams instead of node streams
    return Readable.from(output);
  }
  return content;
}
