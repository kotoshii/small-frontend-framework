import { MaybeArray } from '~types/MaybeArray';

export function toArray<T>(maybeArray: MaybeArray<T>) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
