import assert from "node:assert";
import { describe, it } from "node:test";
import {
  DefaultFileNameHashLength,
  DefaultIntegrityAlgorithm,
} from "./defaults.js";

// These values are essentially part of the API contract since consumers rely on
// them to some extent, so be explicity about that and have tests for them.

describe("defaults", () => {
  describe("DefaultIntegrityAlgorithm", () => {
    it("equals 'sha512'", () => {
      assert.strictEqual(DefaultIntegrityAlgorithm, "sha512");
    });
  });

  describe("DefaultFileNameHashLength", () => {
    it("equals 32", () => {
      assert.strictEqual(DefaultFileNameHashLength, 32);
    });
  });
});
