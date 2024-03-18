import { VDOMNodeType } from '~constants/vdom';

export interface VDOMNode {
  type: VDOMNodeType;
  el: Node | null;
}
