import assert from "node:assert/strict";
import { basename, dirname, extname, join } from "node:path";
import { Readable } from "node:stream";
import { buffer } from "node:stream/consumers";
import {
  Integrity,
  checkData,
  fromData,
  fromStream,
  integrityStream,
  parse,
} from "ssri";
import { getValueAsync, type AsyncProvider } from "../internal/provider.js";
import { toStream } from "../internal/to-stream.js";

const DefaultFileNameHashLength = 32;

/**
 * Represents a data source.
 */
export type ContentLike = Readable | Buffer | string;

/**
 * Flexible input for {@link getAssetContent} to normalize.
 */
export type AssetContentInput = {
  fileName: AsyncProvider<string>;
  content: AsyncProvider<ContentLike>;
  integrity?: AsyncProvider<string>;
};

/**
 * Normalized output from {@link getAssetContent}.
 */
export type AssetContent = {
  fileName: string;
  content: Readable;
  integrity: string;
};

/**
 * Controls how {@link getAssetContent} normalizes the input.
 */
export type GetAssetContentOptions = {
  /**
   * Truthy to add the integrity hash to the file name. If a number is given,
   * this is the length of the hash to be added. If `true`, then the default
   * hash length of 32 will be used.
   *
   * @default false
   */
  addHashToFileName?: boolean | number;
  /**
   * Options to control the generation of the integrity value.
   */
  integrity?: { algorithms?: string[] };
};

/**
 * Normalize the given asset input, using provided options or defaults.
 */
export async function getAssetContent(
  provider: AsyncProvider<AssetContentInput>,
  options?: GetAssetContentOptions,
): Promise<AssetContent> {
  const algorithms = options?.integrity?.algorithms ?? ["sha512"];

  const input = await getValueAsync(provider);
  let content = await getValueAsync(input.content);
  let fileName = await getValueAsync(input.fileName);
  let integrity = await getValueAsync(input.integrity);

  if (typeof content === "string" || Buffer.isBuffer(content)) {
    // we can calculate the integrity immediately
    if (integrity) {
      checkData(content, integrity, { error: true });
    } else {
      integrity = fromData(content, { algorithms }).toString();
    }
  } else if (integrity) {
    // integrity provided, input is a stream, so wrap it an an integrity stream
    // to check the given value is correct
    content = content.pipe(integrityStream({ integrity: integrity }));
  } else if (typeof input.content === "function") {
    // no integrity given so we need to calculate it now.
    // the input is a function so we can avoid buffering and just open the
    // stream again
    const result = await fromStream(content, { algorithms });
    integrity = result.toString();
    content = await input.content();
  } else {
    // no integrity given so we need to calculate it now.
    // the content is a stream so we'll need to buffer it since we can't read
    // it twice
    const hash = integrityStream({ algorithms });
    content = await buffer(content.pipe(hash));

    integrity = await new Promise((resolve) => {
      hash.on("integrity", (v: Integrity) => {
        resolve(v.toString());
      });
    });
  }

  // we should have either been passed or calculated this already
  assert(integrity, "expected to have calculated integrity");

  if (options?.addHashToFileName) {
    const hashLength =
      options.addHashToFileName === true
        ? DefaultFileNameHashLength
        : options.addHashToFileName;

    const ext = extname(fileName);
    const base = join(dirname(fileName), basename(fileName, ext));
    const hash = parse(integrity).hexDigest().slice(0, hashLength);

    fileName = `${base}.${hash}${ext}`;
  }

  return {
    content: toStream(content),
    fileName,
    integrity,
  };
}
