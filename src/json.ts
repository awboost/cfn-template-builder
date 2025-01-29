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
