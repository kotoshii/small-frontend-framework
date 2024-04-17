import { VDOMNodeType } from '~core/vdom/constants/VDOMNodeType';
import { SFFElement } from '~core/vdom/types/SFFElement';
import { SFFNode } from '~core/vdom/types/SFFNode';
import {
  VDOMNodeElement,
  VDOMNodeElementProps,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~core/vdom/types/VDOMNode';
import { MaybeArray } from '~types/MaybeArray';
import { toArray } from '~utils/misc';

type NonEmptyNode = Exclude<SFFNode, null | undefined | boolean>;

const isNodeEmpty = (node: SFFNode) =>
  typeof node === 'undefined' ||
  typeof node === 'boolean' ||
  node === null ||
  node === '';

const removeEmptyNodes = (nodes: SFFNode[]) =>
  nodes.filter((node) => !isNodeEmpty(node)) as NonEmptyNode[];

const toVDOMNodes = (nodes: NonEmptyNode[]): SFFElement[] =>
  nodes.map((node) => {
    if (typeof node === 'string' || typeof node === 'number') {
      return hString(node);
    }

    return node;
  });

const createChildrenArray = (children: MaybeArray<SFFNode>) =>
  toVDOMNodes(removeEmptyNodes(toArray<SFFNode>(children)));

export function hElement(
  tag: string,
  props: VDOMNodeElementProps = {},
  children: MaybeArray<SFFNode> = [],
): VDOMNodeElement {
  return {
    tag,
    props,
    children: createChildrenArray(children),
    type: VDOMNodeType.ELEMENT,
    el: null,
    listeners: {},
  };
}

export function hString(value: string | number): VDOMNodeText {
  return {
    type: VDOMNodeType.TEXT,
    value: String(value),
    el: null,
  };
}

export function hFragment(
  children: MaybeArray<SFFNode> = [],
): VDOMNodeFragment {
  return {
    type: VDOMNodeType.FRAGMENT,
    children: createChildrenArray(children),
    el: null,
  };
}
