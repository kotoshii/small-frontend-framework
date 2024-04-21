import { EmptyNode } from '~core/vdom/types/EmptyNode';
import { SFFNode } from '~core/vdom/types/SFFNode';

export type NonEmptyNode = Exclude<SFFNode, EmptyNode>;
