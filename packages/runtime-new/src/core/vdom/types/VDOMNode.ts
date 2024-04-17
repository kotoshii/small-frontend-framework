import { Component } from '~core/components/component';
import { ComponentClass } from '~core/components/types/ComponentClass';
import { VDOMNodeType } from '~core/vdom/constants/VDOMNodeType';
import { EventListenersMap } from '~core/vdom/types/EventListenersMap';
import { SFFElement } from '~core/vdom/types/SFFElement';
import { SFFNode } from '~core/vdom/types/SFFNode';

export interface VDOMNodeElementProps {
  on?: EventListenersMap;
  [index: string]: any;
}

export interface VDOMNodeElement {
  tag: string;
  props: VDOMNodeElementProps;
  children: SFFElement[];
  type: VDOMNodeType.ELEMENT;
  el: HTMLElement | null;
  listeners: EventListenersMap;
}

export interface VDOMNodeFragment {
  type: VDOMNodeType.FRAGMENT;
  children: SFFElement[];
  el: HTMLElement | null;
}

export interface VDOMNodeText {
  type: VDOMNodeType.TEXT;
  value: string;
  el: Text | null;
}

export interface VDOMNodeComponent<T extends Component = Component> {
  type: VDOMNodeType.COMPONENT;
  componentClass: ComponentClass<T>;
  props: Record<string, any>; // TODO: Change to real type once Props support is added
  children: SFFNode[];
  instance: T | null;
  el: HTMLElement | null;
}
