import { VDOMNodeElement } from '~types/vdom/VDOMNodeElement';
import { VDOMNodeFragment } from '~types/vdom/VDOMNodeFragment';
import { VDOMNodeText } from '~types/vdom/VDOMNodeText';

// SFF Virtual DOM Node
export type SFFVDOMNode = VDOMNodeElement | VDOMNodeText | VDOMNodeFragment;
