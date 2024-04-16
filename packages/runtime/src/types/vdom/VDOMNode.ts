import { VDOMNodeType } from '~constants/vdom';
import { Component } from '~core/components/component';
import { ComponentClass } from '~types/components/ComponentClass';
import { PropsWithoutDefault } from '~types/components/PropsWithoutDefault';
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

export interface VDOMNodeComponent<T extends Component = any> {
  type: VDOMNodeType.COMPONENT;
  componentClass: ComponentClass<T>;
  props?: PropsWithoutDefault<T>;
  children: SFFVDOMNode[];
  instance: T | null;
  el: HTMLElement | null;
}
