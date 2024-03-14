import { VDOMNodeType } from '~constants/vdom';

export interface VDOMNodeText {
  type: VDOMNodeType.TEXT;
  value: string;
}
