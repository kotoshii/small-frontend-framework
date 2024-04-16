import { VDOMNodeType } from '~constants/vdom';
import { Component } from '~core/components/component';
import { setAttributes } from '~core/dom/attributes';
import { addEventListeners } from '~core/dom/events';
import { Store } from '~core/state/store';
import { ComponentClass } from '~types/components/ComponentClass';
import { PropsWithoutDefault } from '~types/components/PropsWithoutDefault';
import { SFFElement } from '~types/vdom/SFFElement';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import {
  VDOMNodeComponent,
  VDOMNodeElement,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~types/vdom/VDOMNode';
import { VDOMNodeProps } from '~types/vdom/VDOMNodeProps';

type NodeIndex = number | null | undefined;

export function mountDOM(
  node: SFFVDOMNode,
  parentElement: HTMLElement,
  index?: NodeIndex,
) {
  switch (node.type) {
    case VDOMNodeType.ELEMENT: {
      createElementNode(node, parentElement, index);
      break;
    }
    case VDOMNodeType.FRAGMENT: {
      createFragmentNodes(node, parentElement, index);
      break;
    }
    case VDOMNodeType.TEXT: {
      createTextNode(node, parentElement, index);
      break;
    }
    case VDOMNodeType.COMPONENT: {
      createComponentNode(node, parentElement, index);
      break;
    }
    default: {
      throw new Error(`Couldn't mount VDOM Node. Received: ${node}`);
    }
  }
}

function createComponentInstance<T extends Component>(
  cls: ComponentClass<T>,
  props: PropsWithoutDefault<T> = {} as PropsWithoutDefault<T>,
  children: SFFElement[] = [],
) {
  return new cls({ store: Store.instance(), children, ...props });
}

function insert(
  el: HTMLElement | Text,
  parentElement: HTMLElement,
  index: NodeIndex,
) {
  if (index === null || typeof index === 'undefined') {
    parentElement.append(el);
    return;
  }

  if (index >= parentElement.childNodes.length) {
    parentElement.append(el);
  } else {
    parentElement.insertBefore(el, parentElement.childNodes[index]);
  }
}

function createElementNode(
  node: VDOMNodeElement,
  parentElement: HTMLElement,
  index: NodeIndex,
) {
  const { tag, props, children } = node;

  const element = document.createElement(tag);

  addProps(element, props, node);
  children.forEach((child) => mountDOM(child, element));

  node.el = element;
  insert(element, parentElement, index);
}

function createFragmentNodes(
  node: VDOMNodeFragment,
  parentElement: HTMLElement,
  index: NodeIndex,
) {
  node.children.forEach((child) => {
    const _index =
      index !== null && typeof index !== 'undefined' ? index + 1 : null;
    mountDOM(child, parentElement, _index);
  });
  node.el = parentElement;
}

function createTextNode(
  node: VDOMNodeText,
  parentElement: HTMLElement,
  index: NodeIndex,
) {
  const textNode = document.createTextNode(node.value);
  node.el = textNode;
  insert(textNode, parentElement, index);
}

function createComponentNode(
  node: VDOMNodeComponent,
  parentElement: HTMLElement,
  index: NodeIndex,
) {
  const instance = createComponentInstance(
    node.componentClass,
    node.props,
    node.children,
  );

  node.el = parentElement;
  node.instance = instance;

  const vdom = instance.render();

  mountDOM(vdom, parentElement, index);
}

function addProps(
  el: HTMLElement,
  props: VDOMNodeProps,
  node: VDOMNodeElement,
) {
  const { on: events, ...attrs } = props;
  node.listeners = addEventListeners(events, el);
  setAttributes(el, attrs);
}
