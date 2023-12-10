import { ReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { IncomingMessage } from "node:http";
import { Readable } from "node:stream";

export async function streamLength(
  stream: Readable | ReadStream | IncomingMessage,
): Promise<number | undefined> {
  if ("path" in stream && typeof stream.path === "string") {
    try {
      const stats = await stat(stream.path);
      return stats.size;
    } catch {}
  } else if ("httpVersion" in stream) {
    try {
      const header = stream.headers["content-length"];
      if (header) {
        return parseInt(header, 10);
      }
    } catch {}
  }
}
