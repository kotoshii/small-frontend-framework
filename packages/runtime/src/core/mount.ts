import { VDOMNodeType } from '~constants/vdom';
import { setAttributes } from '~core/attributes';
import { addEventListeners } from '~core/events';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import { VDOMNodeElement } from '~types/vdom/VDOMNodeElement';
import { VDOMNodeFragment } from '~types/vdom/VDOMNodeFragment';
import { VDOMNodeProps } from '~types/vdom/VDOMNodeProps';
import { VDOMNodeText } from '~types/vdom/VDOMNodeText';

export function mount(node: SFFVDOMNode, parentElement: HTMLElement) {
  switch (node.type) {
    case VDOMNodeType.ELEMENT: {
      createElementNode(node, parentElement);
      break;
    }
    case VDOMNodeType.FRAGMENT: {
      createFragmentNodes(node, parentElement);
      break;
    }
    case VDOMNodeType.TEXT: {
      createTextNode(node, parentElement);
      break;
    }
    default: {
      throw new Error(`Couldn't mount VDOM Node. Received: ${node}`);
    }
  }
}

function createElementNode(node: VDOMNodeElement, parentElement: HTMLElement) {
  const { tag, props, children } = node;

  const element = document.createElement(tag);

  addProps(element, props, node);
  children.forEach((child) => mount(child, element));

  node.el = element;
  parentElement.append(element);
}

function createFragmentNodes(
  node: VDOMNodeFragment,
  parentElement: HTMLElement,
) {
  node.children.forEach((child) => mount(child, parentElement));
  node.el = parentElement;
}

function createTextNode(node: VDOMNodeText, parentElement: HTMLElement) {
  const textNode = document.createTextNode(node.value);
  node.el = textNode;
  parentElement.append(textNode);
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
