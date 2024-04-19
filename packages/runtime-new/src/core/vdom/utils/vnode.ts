import { VDOMNodeType } from '~core/vdom/constants/VDOMNodeType';
import { EmptyNode } from '~core/vdom/types/EmptyNode';
import { SFFElement } from '~core/vdom/types/SFFElement';
import { SFFNode } from '~core/vdom/types/SFFNode';
import { VDOMNodeComponent } from '~core/vdom/types/VDOMNode';

export const isNodeEmpty = (node: SFFNode): node is EmptyNode =>
  typeof node === 'undefined' ||
  typeof node === 'boolean' ||
  node === null ||
  node === '' ||
  Number.isNaN(node);

/**
 * Cannot accept VDOMNodeComponent because its children are not converted to VNodes
 * */
export function extractChildren(vnode: Exclude<SFFElement, VDOMNodeComponent>) {
  if (vnode.type === VDOMNodeType.TEXT) {
    return [];
  }

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
