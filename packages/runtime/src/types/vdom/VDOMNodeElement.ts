import { VDOMNodeType } from '~constants/vdom';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import { VDOMNodeProps } from '~types/vdom/VDOMNodeProps';

export interface VDOMNodeElement {
  tag: string;
  props: VDOMNodeProps;
  children: SFFVDOMNode[];
  type: VDOMNodeType.ELEMENT;
}
