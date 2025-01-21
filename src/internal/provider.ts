export type AsyncProviderFn<T> = () => T | PromiseLike<T>;
export type AsyncProvider<T> = T | AsyncProviderFn<T>;

export async function getValueAsync<T>(provider: AsyncProvider<T>): Promise<T> {
  return typeof provider === "function"
    ? await (provider as AsyncProviderFn<T>)()
    : provider;
}
