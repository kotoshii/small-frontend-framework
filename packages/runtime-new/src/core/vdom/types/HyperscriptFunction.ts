import { Component } from '~core/components/component';
import { PropsWithoutDefault } from '~core/components/types/ComponentProps';
import {
  VDOMNodeComponent,
  VDOMNodeElement,
  VDOMNodeElementProps,
} from '~core/vdom/types/VDOMNode';

export type HyperscriptPropsType<T extends Component> = T extends Component
  ? PropsWithoutDefault<T>
  : VDOMNodeElementProps;

export type HyperscriptReturnType<T extends Component> = T extends Component
  ? VDOMNodeComponent<T>
  : VDOMNodeElement;
