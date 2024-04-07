import { VDOMNodeType } from '~constants/vdom';
import { _SFFElementTruthy, SFFElement } from '~types/vdom/SFFElement';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import {
  VDOMNodeElement,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~types/vdom/VDOMNode';
import { VDOMNodeProps } from '~types/vdom/VDOMNodeProps';
import { toArray } from '~utils/arrays';
import { removeFalsyElements } from '~utils/vdom';

function convertToVDOMNodes(elements: _SFFElementTruthy[]): SFFVDOMNode[] {
  return elements.map((element) => {
    if (
      typeof element === 'string' ||
      typeof element === 'boolean' ||
      typeof element === 'number'
    ) {
      return hString(element);
    }

    return element;
  });
}

function buildChildrenArray(children: SFFElement | SFFElement[]) {
  return convertToVDOMNodes(removeFalsyElements(toArray(children)));
}

export function extractChildren(vdom: SFFVDOMNode) {
  if (vdom.type === VDOMNodeType.TEXT || !vdom.children) {
    return [];
  }

  const children: SFFVDOMNode[] = [];

  for (const child of vdom.children) {
    if (child.type === VDOMNodeType.FRAGMENT) {
      children.push(...extractChildren(child));
    } else {
      children.push(child);
    }
  }

  return children;
}

function hElement(
  tag: string,
  props: VDOMNodeProps = {},
  children: SFFElement | SFFElement[] = [],
): VDOMNodeElement {
  return {
    tag,
    props,
    children: buildChildrenArray(children),
    type: VDOMNodeType.ELEMENT,
    el: null,
    listeners: {},
  };
}

function hString(value: string | boolean | number): VDOMNodeText {
  return {
    type: VDOMNodeType.TEXT,
    value: String(value),
    el: null,
  };
}

function hFragment(children: SFFElement | SFFElement[] = []): VDOMNodeFragment {
  return {
    type: VDOMNodeType.FRAGMENT,
    children: buildChildrenArray(children),
    el: null,
  };
}

export { hFragment as fragment, hElement as h };
