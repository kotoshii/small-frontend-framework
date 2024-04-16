import { Component } from '~core/components/component';
import { ComponentClass } from '~types/components/ComponentClass';
import { PropsWithoutDefault } from '~types/components/PropsWithoutDefault';
import { SFFElement } from '~types/vdom/SFFElement';
import { VDOMNodeComponent, VDOMNodeElement } from '~types/vdom/VDOMNode';
import { VDOMNodeProps } from '~types/vdom/VDOMNodeProps';

export type HyperscriptTagType<T extends Component | string = string> =
  T extends Component ? ComponentClass<T> : string;

export type HyperscriptPropsType<T extends Component | string = string> =
  T extends Component ? PropsWithoutDefault<T> : VDOMNodeProps;

export type HyperscriptReturnType<T extends Component | string = string> =
  T extends Component ? VDOMNodeComponent<T> : VDOMNodeElement;

export type HyperscriptFunction = <T extends Component | string = string>(
  tagOrComponent: HyperscriptTagType<T>,
  props?: HyperscriptPropsType<T>,
  children?: SFFElement | SFFElement[],
) => HyperscriptReturnType<T>;
