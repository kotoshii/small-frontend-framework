export function toArray<T>(maybeArray: T | T[]) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
