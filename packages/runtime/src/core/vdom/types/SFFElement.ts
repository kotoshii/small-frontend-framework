import {
  VDOMNodeComponent,
  VDOMNodeElement,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~core/vdom/types/VDOMNode';

export type SFFElement =
  | VDOMNodeElement
  | VDOMNodeFragment
  | VDOMNodeText
  | VDOMNodeComponent;

export type WithExtractableChildren = VDOMNodeElement | VDOMNodeFragment;
