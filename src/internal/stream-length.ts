import { ReadStream, Stats } from "node:fs";
import { stat as _stat } from "node:fs/promises";
import { IncomingMessage } from "node:http";
import { Readable } from "node:stream";

export type Fs = {
  stat: (path: string) => PromiseLike<Stats>;
};

export async function streamLength(
  stream: Readable | ReadStream | IncomingMessage,
  fs: Partial<Fs> = {},
): Promise<number | undefined> {
  const { stat = _stat } = fs;

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
      // the content-length header isn't going to be wrong and would be hard to
      // test anyway, so exclude the catch from coverage
      /* c8 ignore next */
    } catch {}
  }
}
