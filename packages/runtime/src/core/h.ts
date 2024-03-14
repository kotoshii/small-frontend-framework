import { VDOMNodeType } from '~constants/vdom';
import { _SFFElementTruthy, SFFElement } from '~types/SFFElement';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import { VDOMNodeElement } from '~types/vdom/VDOMNodeElement';
import { VDOMNodeFragment } from '~types/vdom/VDOMNodeFragment';
import { VDOMNodeProps } from '~types/vdom/VDOMNodeProps';
import { VDOMNodeText } from '~types/vdom/VDOMNodeText';
import { childrenArray, removeFalsyElements } from '~utils/vdom';

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
  return convertToVDOMNodes(removeFalsyElements(childrenArray(children)));
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
  };
}

function hString(value: string | boolean | number): VDOMNodeText {
  return {
    type: VDOMNodeType.TEXT,
    value: String(value),
  };
}

function hFragment(children: SFFElement | SFFElement[] = []): VDOMNodeFragment {
  return {
    type: VDOMNodeType.FRAGMENT,
    children: buildChildrenArray(children),
  };
}

export { hElement as h, hFragment };
