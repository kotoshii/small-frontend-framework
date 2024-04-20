import { Component } from '~core/components/component';
import { ComponentClass } from '~core/components/types/ComponentClass';
import { PropsWithoutDefault } from '~core/components/types/ComponentProps';
import { setAttributes } from '~core/render/attributes';
import { addEventListeners } from '~core/render/events';
import { NodeIndex } from '~core/render/types/NodeIndex';
import { VDOMNodeType } from '~core/vdom/constants/VDOMNodeType';
import { SFFElement } from '~core/vdom/types/SFFElement';
import { SFFNode } from '~core/vdom/types/SFFNode';
import {
  VDOMNodeComponent,
  VDOMNodeElement,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~core/vdom/types/VDOMNode';

export function mount(
  vnode: SFFElement,
  parentElement: HTMLElement,
  index?: NodeIndex,
) {
  switch (vnode.type) {
    case VDOMNodeType.ELEMENT: {
      mountElementNode(vnode, parentElement, index);
      break;
    }
    case VDOMNodeType.FRAGMENT: {
      mountFragmentNode(vnode, parentElement, index);
      break;
    }
    case VDOMNodeType.TEXT: {
      mountTextNode(vnode, parentElement, index);
      break;
    }
    case VDOMNodeType.COMPONENT: {
      mountComponentNode(vnode, parentElement, index);
      break;
    }
    default: {
      throw new Error(`Couldn't mount VDOM Node. Received: ${vnode}`);
    }
  }
}

const createComponentInstance = <T extends Component>(
  cls: ComponentClass<T>,
  props: PropsWithoutDefault<T>,
  children: SFFNode[],
) => new cls({ children, ...props });

function insert(
  el: HTMLElement | Text,
  parentElement: HTMLElement,
  index: NodeIndex,
) {
  if (index === null || typeof index === 'undefined') {
    parentElement.append(el);
    return;
  }

  if (index! >= parentElement.childNodes.length) {
    parentElement.append(el);
  } else {
    parentElement.insertBefore(el, parentElement.childNodes[index]);
  }
}

function mountElementNode(
  node: VDOMNodeElement,
  parentElement: HTMLElement,
  index: NodeIndex,
) {
  const {
    tag,
    props: { on: events, ...attrs },
    children,
  } = node;

  const element = document.createElement(tag);

  node.el = element;
  node.listeners = addEventListeners(events, element);
  setAttributes(element, attrs);

  children.forEach((child) => mount(child, element));

  insert(element, parentElement, index);
}

function mountFragmentNode(
  node: VDOMNodeFragment,
  parentElement: HTMLElement,
  index: NodeIndex,
) {
  node.el = parentElement;
  node.children.forEach((child) => mount(child, parentElement, index));
}

function mountTextNode(
  node: VDOMNodeText,
  parentElement: HTMLElement,
  index: NodeIndex,
) {
  const textNode = document.createTextNode(node.value);
  node.el = textNode;

  insert(textNode, parentElement, index);
}

function mountComponentNode(
  node: VDOMNodeComponent,
  parentElement: HTMLElement,
  index: NodeIndex,
) {
  const { componentClass, props, children } = node;
  const instance = createComponentInstance(componentClass, props, children);

  instance.mount(parentElement, index);

  node.instance = instance;
  node.el = instance.firstElement;
}
