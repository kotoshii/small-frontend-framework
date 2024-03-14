import { VDOMNodeElement } from '~types/vdom/VDOMNodeElement';

// Values that can be passed as children
export type SFFElement =
  | VDOMNodeElement
  | string
  | number
  | null
  | boolean
  | undefined;

export type _SFFElementTruthy = VDOMNodeElement | string | number | boolean;
