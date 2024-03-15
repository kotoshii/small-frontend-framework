import { VDOMNodeElement } from '~types/vdom/VDOMNodeElement';
import { VDOMNodeFragment } from '~types/vdom/VDOMNodeFragment';

// Values that can be passed as children
export type SFFElement =
  | VDOMNodeElement
  | VDOMNodeFragment
  | string
  | number
  | null
  | boolean
  | undefined;

export type _SFFElementTruthy = VDOMNodeElement | string | number | boolean;
