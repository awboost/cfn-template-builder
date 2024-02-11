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

export function normalizeProvider<T>(
  provider: T | (() => T | PromiseLike<T>),
): () => PromiseLike<T> {
  if (typeof provider === "function") {
    return lazy(() => Promise.resolve((provider as () => T)()));
  }
  return () => Promise.resolve(provider);
}
