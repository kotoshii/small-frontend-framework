import { VDOMNodeType } from '~constants/vdom';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';

export interface VDOMNodeFragment {
  type: VDOMNodeType.FRAGMENT;
  children: SFFVDOMNode[];
}
