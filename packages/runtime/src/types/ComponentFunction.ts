import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';

export type ComponentFunction = (
  props?: Record<string, unknown>,
) => SFFVDOMNode;
