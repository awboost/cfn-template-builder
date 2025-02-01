/**
 * Represents a primitive value that can be represented in JSON.
 */
export type JsonPrimitive = boolean | number | string | null;

/**
 * Represents a JSON document.
 */
export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * An object which can serialize itself.
 */
export type JsonSerializable = {
  toJSON: () => unknown;
};

/**
 * Returns true if the value has a toJSON function.
 */
export function isJsonSerializable(value: unknown): value is JsonSerializable {
  return (
    typeof value === "object" &&
    value !== null &&
    "toJSON" in value &&
    typeof value.toJSON === "function"
  );
}
