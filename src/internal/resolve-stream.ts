import { PassThrough, Readable } from "stream";

export function resolveReadable(promise: PromiseLike<Readable>): Readable {
  const buffer = new PassThrough();

  promise.then(
    (readable) => {
      readable.pipe(buffer);
    },
    (err) => {
      buffer.destroy(err);
    },
  );

  return buffer;
}
