/**
 * wait
 * Creates a Promise-based delay.
 * This is useful when we want to keep a loading state visible for a minimum time.
 */
export function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
