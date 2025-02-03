/**
 * An async function.
 */
export type AsyncFunc<T, Args extends any[]> = (
  ...args: Args
) => PromiseLike<T>;

/**
 * A function which causes an async function to run at some later point.
 */
export type Scheduler = <T, Args extends any[]>(
  func: AsyncFunc<T, Args>,
  ...args: Args
) => PromiseLike<T>;

/**
 * Make a scheduler function that can run async functions up to the provided
 * concurrency limit.
 */
export function maxConcurrencyScheduler(limit: number): Scheduler {
  if (limit <= 0) {
    throw new TypeError("limit must be greater than zero");
  }

  let semaphore = limit;
  const waiters: (() => void)[] = [];

  return async <T, Args extends any[]>(
    func: AsyncFunc<T, Args>,
    ...args: Args
  ): Promise<T> => {
    try {
      if (--semaphore < 0) {
        // if we took the semaphore below zero then we need to wait
        await new Promise<void>((resolve) => {
          waiters.push(resolve);
        });
      }

      return await func(...args);
    } finally {
      if (++semaphore <= 0) {
        // if the semaphore is below zero then every release will release a
        // waiter; in other words when below zero, it's working in a one in, one
        // out fashion
        waiters.shift()?.();
      }
    }
  };
}
