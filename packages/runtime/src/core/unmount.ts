import { VDOMNodeType } from '~constants/vdom';
import { removeEventListeners } from '~core/events';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import {
  VDOMNodeElement,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~types/vdom/VDOMNode';

export function unmount(node: SFFVDOMNode) {
  switch (node.type) {
    case VDOMNodeType.TEXT: {
      removeTextNode(node);
      break;
    }
    case VDOMNodeType.ELEMENT: {
      removeElementNode(node);
      break;
    }
    case VDOMNodeType.FRAGMENT: {
      removeFragmentNodes(node);
      break;
    }
    default: {
      throw new Error(`Couldn't unmount VDOM Node. Received: ${node}`);
    }
  }
}

function removeElementNode(node: VDOMNodeElement) {
  const { el, children, listeners } = node;

  if (el) {
    removeEventListeners(listeners, el);
    node.listeners = {};

    el.remove();
    // node.el = null;
  }

  children.forEach(unmount);
}

function removeFragmentNodes(node: VDOMNodeFragment) {
  node.children.forEach(unmount);
}

function removeTextNode(node: VDOMNodeText) {
  if (node.el) {
    node.el?.remove();
    node.el = null;
  }
}
