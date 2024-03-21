import { VDOMNodeType } from '~constants/vdom';
import { _SFFElementTruthy, SFFElement } from '~types/SFFElement';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import { VDOMNodeElement } from '~types/vdom/VDOMNodeElement';
import { VDOMNodeFragment } from '~types/vdom/VDOMNodeFragment';
import { VDOMNodeProps } from '~types/vdom/VDOMNodeProps';
import { VDOMNodeText } from '~types/vdom/VDOMNodeText';
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
