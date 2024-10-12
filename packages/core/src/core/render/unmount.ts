import { unmountSymbol } from '~core/components/component';
import { removeEventListeners } from '~core/render/events';
import { VDOMNodeType } from '~core/vdom/constants/VDOMNodeType';
import { SFFElement } from '~core/vdom/types/SFFElement';
import {
  VDOMNodeComponent,
  VDOMNodeElement,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~core/vdom/types/VDOMNode';

export function unmount(vnode: SFFElement) {
  switch (vnode.type) {
    case VDOMNodeType.ELEMENT: {
      unmountElementNode(vnode);
      break;
    }
    case VDOMNodeType.FRAGMENT: {
      unmountFragmentNode(vnode);
      break;
    }
    case VDOMNodeType.TEXT: {
      unmountTextNode(vnode);
      break;
    }
    case VDOMNodeType.COMPONENT: {
      unmountComponentNode(vnode);
      break;
    }
    default: {
      throw new Error(`Couldn't unmount VDOM Node. Received: ${vnode}`);
    }
  }
}

function unmountElementNode(node: VDOMNodeElement) {
  const { el, children, listeners } = node;

  children.forEach(unmount);

  if (el) {
    removeEventListeners(listeners, el);
    node.listeners = {};

    el.remove();
    node.el = null;
  }
}

function unmountFragmentNode(node: VDOMNodeFragment) {
  node.children.forEach(unmount);
}

function unmountTextNode(node: VDOMNodeText) {
  if (node.el) {
    node.el?.remove();
    node.el = null;
  }
}

function unmountComponentNode(node: VDOMNodeComponent) {
  node.instance[unmountSymbol]();
  node.instance = null;
}
