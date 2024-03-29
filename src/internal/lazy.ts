export function lazy<T>(factory: () => T): () => T {
  let hasValue = false;
  let value: T | undefined;

  return (): T => {
    if (!hasValue) {
      value = factory();
      hasValue = true;
    }
    return value as T;
  };
}
