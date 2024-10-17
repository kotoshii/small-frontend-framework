import { SFFElement } from '~core/vdom/types/SFFElement';

/**
 * Represents a type of values that `h()` function can accept as `children`.
 * */
export type SFFNode = SFFElement | string | number | null | boolean | undefined;
