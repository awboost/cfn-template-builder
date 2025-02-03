import { statSync as _stat, ReadStream, Stats } from "node:fs";
import { IncomingMessage } from "node:http";
import { Readable } from "node:stream";

export type Fs = {
  stat: (path: string) => Stats;
};

export function streamLength(
  stream: Readable | ReadStream | IncomingMessage,
  fs: Partial<Fs> = {},
): number | undefined {
  const { stat = _stat } = fs;

  if ("path" in stream && typeof stream.path === "string") {
    try {
      const stats = stat(stream.path);
      return stats.size;
    } catch {}
  } else if ("httpVersion" in stream) {
    try {
      const header = stream.headers["content-length"];
      if (header) {
        return Number.parseInt(header, 10);
      }
      // the content-length header isn't going to be wrong and would be hard to
      // test anyway, so exclude the catch from coverage
      /* c8 ignore next */
    } catch {}
  }
}
