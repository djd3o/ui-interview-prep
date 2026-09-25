// bun test src/problems/02-debounce/test/debounce.test.ts

export function debounce<F extends (...args: any[]) => void>(
  fn: F,
  delay: number,
): (...args: Parameters<F>) => void {
  let timerID: ReturnType<typeof setTimeout> | null = null
  return function debounced(this: unknown, ...args: Parameters<F>) {
    if (timerID) {
      clearTimeout(timerID)
    }
    //timerID && clearTimeout(timerID)
    timerID = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function debounceDeo(fn: (...args: any[]) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>
  return function (this: unknown, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
// --- Examples ---
// Uncomment to test your implementation:

const log = debounceDeo((msg: string) => console.log(msg), 300)
log('a') // cancelled by next call
log('b') // cancelled by next call
log('c') // only this one fires after 300ms → "c"
