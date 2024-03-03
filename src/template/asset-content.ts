import assert from "node:assert/strict";
import { Readable } from "node:stream";
import { buffer } from "node:stream/consumers";
import { checkData, fromData, fromStream, integrityStream } from "ssri";
import type { ContentLike } from "../builder.js";
import { getValueAsync, type AsyncProvider } from "../internal/provider.js";
import { toStream } from "../internal/to-stream.js";

export type AssetContentInput = {
  fileName: AsyncProvider<string>;
  content: AsyncProvider<ContentLike>;
  integrity?: AsyncProvider<string>;
};

export type AssetContent = {
  fileName: string;
  content: Readable;
  integrity: string;
};

export type GetAssetContentOptions = {
  integrity?: { algorithms?: string[] };
};

export async function getAssetContent(
  provider: AsyncProvider<AssetContentInput>,
  opts?: GetAssetContentOptions,
): Promise<AssetContent> {
  const algorithms = opts?.integrity?.algorithms ?? ["sha512"];
  const input = await getValueAsync(provider);
  let content = await getValueAsync(input.content);
  const fileName = await getValueAsync(input.fileName);
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
    integrity = (await fromStream(content, { algorithms })).toString();
    content = await input.content();
  } else {
    // no integrity given so we need to calculate it now.
    // the content is a stream so we'll need to buffer it since we can't read
    // it twice
    const hash = integrityStream({ algorithms });
    content = await buffer(content.pipe(hash));

    integrity = await new Promise((resolve) =>
      hash.on("integrity", (v) => resolve(v.toString())),
    );
  }

  // we should have either been passed or calculated this already
  assert(integrity, "expected to have calculated integrity");

  return {
    content: toStream(content),
    fileName,
    integrity,
  };
}
