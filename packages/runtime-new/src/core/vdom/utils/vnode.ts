import { EmptyNode } from '~core/vdom/types/EmptyNode';
import { SFFNode } from '~core/vdom/types/SFFNode';

export const isNodeEmpty = (node: SFFNode): node is EmptyNode =>
  typeof node === 'undefined' ||
  typeof node === 'boolean' ||
  node === null ||
  node === '' ||
  Number.isNaN(node);
