import {
  VDOMNodeComponent,
  VDOMNodeElement,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~types/vdom/VDOMNode';

// SFF Virtual DOM Node
export type SFFVDOMNode =
  | VDOMNodeElement
  | VDOMNodeText
  | VDOMNodeFragment
  | VDOMNodeComponent;

export type SFFVDOMNodeWithChildren =
  | VDOMNodeElement
  | VDOMNodeFragment
  | VDOMNodeComponent;
