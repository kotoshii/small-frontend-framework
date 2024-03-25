import { VDOMNodeType } from '~constants/vdom';
import { EventListenersMap } from '~types/EventListenersMap';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import { VDOMNodeProps } from '~types/vdom/VDOMNodeProps';

export interface VDOMNode {
  type: VDOMNodeType;
  el: Node | null;
}

export interface VDOMNodeElement extends VDOMNode {
  tag: string;
  props: VDOMNodeProps;
  children: SFFVDOMNode[];
  type: VDOMNodeType.ELEMENT;
  el: HTMLElement | null;
  listeners: EventListenersMap;
}

export interface VDOMNodeFragment extends VDOMNode {
  type: VDOMNodeType.FRAGMENT;
  children: SFFVDOMNode[];
  el: HTMLElement | null;
}

export interface VDOMNodeText extends VDOMNode {
  type: VDOMNodeType.TEXT;
  value: string;
  el: Text | null;
}
