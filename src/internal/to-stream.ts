import { Readable } from "stream";

export function toStream(content: Readable | Buffer | string): Readable {
  if (content instanceof Readable) {
    return content;
  }
  return Readable.from(content);
}
