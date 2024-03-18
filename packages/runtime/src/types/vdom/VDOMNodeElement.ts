import { VDOMNodeType } from '~constants/vdom';
import { EventListenersMap } from '~types/EventListenersMap';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import { VDOMNode } from '~types/vdom/VDOMNode';
import { VDOMNodeProps } from '~types/vdom/VDOMNodeProps';

export interface VDOMNodeElement extends VDOMNode {
  tag: string;
  props: VDOMNodeProps;
  children: SFFVDOMNode[];
  type: VDOMNodeType.ELEMENT;
  el: HTMLElement | null;
  listeners: EventListenersMap;
}
