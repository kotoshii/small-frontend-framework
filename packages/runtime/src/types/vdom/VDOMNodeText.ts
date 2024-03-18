import { VDOMNodeType } from '~constants/vdom';
import { VDOMNode } from '~types/vdom/VDOMNode';

export interface VDOMNodeText extends VDOMNode {
  type: VDOMNodeType.TEXT;
  value: string;
  el: Text | null;
}
