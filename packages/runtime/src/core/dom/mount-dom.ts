import { VDOMNodeType } from '~constants/vdom';
import { setAttributes } from '~core/dom/attributes';
import { addEventListeners } from '~core/dom/events';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import {
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
    default: {
      throw new Error(`Couldn't mount VDOM Node. Received: ${node}`);
    }
  }
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

function addProps(
  el: HTMLElement,
  props: VDOMNodeProps,
  node: VDOMNodeElement,
) {
  const { on: events, ...attrs } = props;
  node.listeners = addEventListeners(events, el);
  setAttributes(el, attrs);
}
