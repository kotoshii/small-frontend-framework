import {
  VDOMNodeElement,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~types/vdom/VDOMNode';

// SFF Virtual DOM Node
export type SFFVDOMNode = VDOMNodeElement | VDOMNodeText | VDOMNodeFragment;
