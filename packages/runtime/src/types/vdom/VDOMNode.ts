import { VDOMNodeType } from '~constants/vdom';
import { EventListenersMap } from '~types/vdom/EventListenersMap';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import { VDOMNodeProps } from '~types/vdom/VDOMNodeProps';

export interface VDOMNodeElement {
  tag: string;
  props: VDOMNodeProps;
  children: SFFVDOMNode[];
  type: VDOMNodeType.ELEMENT;
  el: HTMLElement | null;
  listeners: EventListenersMap;
}

export interface VDOMNodeFragment {
  type: VDOMNodeType.FRAGMENT;
  children: SFFVDOMNode[];
  el: HTMLElement | null;
}

export interface VDOMNodeText {
  type: VDOMNodeType.TEXT;
  value: string;
  el: Text | null;
}
