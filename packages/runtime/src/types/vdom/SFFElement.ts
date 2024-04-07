import { VDOMNodeElement, VDOMNodeFragment } from '~types/vdom/VDOMNode';

// Values that can be passed as children
export type SFFElement =
  | VDOMNodeElement
  | VDOMNodeFragment
  | string
  | number
  | null
  | boolean
  | undefined;

export type _SFFElementTruthy = Exclude<SFFElement, null | undefined>;
