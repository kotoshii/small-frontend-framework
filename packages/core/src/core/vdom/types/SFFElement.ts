import {
  VDOMNodeComponent,
  VDOMNodeElement,
  VDOMNodeFragment,
  VDOMNodeText,
} from '~core/vdom/types/VDOMNode';

/**
 * Represents a Virtual DOM node.
 * Can be one of: a generic node, returned from the `h()` function; a fragment node; a text node; a class component.
 * */
export type SFFElement =
  | VDOMNodeElement
  | VDOMNodeFragment
  | VDOMNodeText
  | VDOMNodeComponent;

export type WithExtractableChildren = VDOMNodeElement | VDOMNodeFragment;
