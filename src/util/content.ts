import { nextTick } from "process";
import { checkData, integrityStream } from "ssri";
import { Readable } from "stream";
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
  } else if (Buffer.isBuffer(content)) {
    return content.byteLength;
  } else {
    return await streamLength(content, fs);
  }
}

export function makeContentStream(asset: ContentStreamInput): Readable {
  const { content, integrity } = asset;

  if (typeof content === "string" || Buffer.isBuffer(content)) {
    const contentStream = Readable.from(content);

    if (integrity) {
      try {
        checkData(content, integrity, { error: true });
      } catch (err: any) {
        nextTick(() => contentStream.destroy(err));
      }
    }

    return contentStream;
  } else if (integrity) {
    return content.compose(integrityStream({ integrity }));
  } else {
    return content;
  }
}
