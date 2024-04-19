import { VDOMNodeType } from '~core/vdom/constants/VDOMNodeType';
import { EmptyNode } from '~core/vdom/types/EmptyNode';
import {
  SFFElement,
  WithExtractableChildren,
} from '~core/vdom/types/SFFElement';
import { SFFNode } from '~core/vdom/types/SFFNode';

export const isNodeEmpty = (node: SFFNode): node is EmptyNode =>
  typeof node === 'undefined' ||
  typeof node === 'boolean' ||
  node === null ||
  node === '' ||
  Number.isNaN(node);

export function extractChildren(vnode: WithExtractableChildren) {
  const children: SFFElement[] = [];

  for (const child of vnode.children) {
    if (child.type === VDOMNodeType.FRAGMENT) {
      children.push(...extractChildren(child));
    } else {
      children.push(child);
    }
  }

  return children;
}
