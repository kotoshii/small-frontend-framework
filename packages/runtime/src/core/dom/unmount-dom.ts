import { VDOMNodeType } from '~constants/vdom';
import { removeEventListeners } from '~core/dom/events';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import {
  VDOMNodeElement,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~types/vdom/VDOMNode';

export function unmountDOM(node: SFFVDOMNode) {
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

    // TODO: Check for possible memory leak - if element is removed from DOM before children are unmounted,
    //  what will happen to their event listeners?
    el.remove();
    // node.el = null;
  }

  children.forEach(unmountDOM);
}

function removeFragmentNodes(node: VDOMNodeFragment) {
  node.children.forEach(unmountDOM);
}

function removeTextNode(node: VDOMNodeText) {
  if (node.el) {
    node.el?.remove();
    node.el = null;
  }
}
