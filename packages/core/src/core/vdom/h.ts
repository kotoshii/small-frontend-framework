import { Component } from '~core/components/component';
import { ComponentClass } from '~core/components/types/ComponentClass';
import { PropsWithoutDefault } from '~core/components/types/ComponentProps';
import { VDOMNodeType } from '~core/vdom/constants/VDOMNodeType';
import {
  HyperscriptPropsType,
  HyperscriptReturnType,
  HyperscriptTagType,
} from '~core/vdom/types/HyperscriptFunction';
import { NonEmptyNode } from '~core/vdom/types/NonEmptyNode';
import { SFFElement } from '~core/vdom/types/SFFElement';
import { SFFNode } from '~core/vdom/types/SFFNode';
import {
  VDOMNodeComponent,
  VDOMNodeElement,
  VDOMNodeElementProps,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~core/vdom/types/VDOMNode';
import { isNodeEmpty } from '~core/vdom/utils/vnode';
import { MaybeArray } from '~types/MaybeArray';
import { toArray } from '~utils/misc';

const removeEmptyNodes = (nodes: SFFNode[]) =>
  nodes.filter((node) => !isNodeEmpty(node)) as NonEmptyNode[];

const toVDOMNodes = (nodes: NonEmptyNode[]): SFFElement[] =>
  nodes.map((node) => {
    if (typeof node === 'string' || typeof node === 'number') {
      return hString(node);
    }

    return node;
  });

const createChildrenArray = (children: MaybeArray<SFFNode>) =>
  toVDOMNodes(removeEmptyNodes(toArray<SFFNode>(children)));

/**
 * Main Hyperscript function. Used to describe the component structure in a declarative way.
 * Refer to the official docs for the usage details.
 * */
export function h<T extends Component | string = string>(
  tagOrComponent: HyperscriptTagType<T>,
  props?: HyperscriptPropsType<T>,
  children?: MaybeArray<SFFNode>,
): HyperscriptReturnType<T> {
  if (typeof tagOrComponent === 'string') {
    return hElement(
      tagOrComponent,
      props as VDOMNodeElementProps,
      children,
    ) as HyperscriptReturnType<T>;
  }

  return hComponent(
    tagOrComponent,
    props as PropsWithoutDefault<any>,
    children,
  ) as HyperscriptReturnType<T>;
}

export function hElement(
  tag: string,
  props: VDOMNodeElementProps = {},
  children: MaybeArray<SFFNode> = [],
): VDOMNodeElement {
  return {
    tag,
    props,
    children: createChildrenArray(children),
    type: VDOMNodeType.ELEMENT,
    el: null,
    listeners: {},
  };
}

export function hString(value: string | number): VDOMNodeText {
  return {
    type: VDOMNodeType.TEXT,
    value: String(value),
    el: null,
  };
}

/**
 * Hyperscript function to create the Fragment nodes, that won't be reflected in the real DOM.
 * The Fragment nodes can be used in cases when you need to bind together a group of other nodes but don't want the container
 * to appear in the real HTML structure in the browser.
 * */
export function hFragment(
  children: MaybeArray<SFFNode> = [],
): VDOMNodeFragment {
  return {
    type: VDOMNodeType.FRAGMENT,
    children: createChildrenArray(children),
    el: null,
  };
}

export function hComponent<T extends Component>(
  componentClass: ComponentClass<T>,
  props: PropsWithoutDefault<T> = {} as PropsWithoutDefault<T>,
  children: MaybeArray<SFFNode> = [],
): VDOMNodeComponent<T> {
  return {
    type: VDOMNodeType.COMPONENT,
    componentClass,
    props,
    children: toArray<SFFNode>(children),
    instance: null,
    el: null,
  };
}
