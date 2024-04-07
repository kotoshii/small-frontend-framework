import { SFFVDOMNodeWithChildren } from '~types/vdom/SFFVDOMNode';

export type ComponentFunction<TProps> = (
  props?: TProps,
) => SFFVDOMNodeWithChildren;
