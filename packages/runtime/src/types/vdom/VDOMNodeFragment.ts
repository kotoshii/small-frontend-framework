import { VDOMNodeType } from '~constants/vdom';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import { VDOMNode } from '~types/vdom/VDOMNode';

export interface VDOMNodeFragment extends VDOMNode {
  type: VDOMNodeType.FRAGMENT;
  children: SFFVDOMNode[];
  el: HTMLElement | null;
}
