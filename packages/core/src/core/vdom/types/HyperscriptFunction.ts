import { Component } from '~core/components/component';
import { ComponentClass } from '~core/components/types/ComponentClass';
import { PropsWithoutDefault } from '~core/components/types/ComponentProps';
import {
  VDOMNodeComponent,
  VDOMNodeElement,
  VDOMNodeElementProps,
} from '~core/vdom/types/VDOMNode';

export type HyperscriptTagType<T extends Component | string> =
  T extends Component ? ComponentClass<T> : string;

export type HyperscriptPropsType<T extends Component | string> =
  T extends Component ? PropsWithoutDefault<T> : VDOMNodeElementProps;

export type HyperscriptReturnType<T extends Component | string> =
  T extends Component ? VDOMNodeComponent<T> : VDOMNodeElement;
