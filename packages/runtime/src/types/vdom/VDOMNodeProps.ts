import { EventListenersMap } from '~types/vdom/EventListenersMap';

export interface VDOMNodeProps {
  on?: EventListenersMap;
  [index: string]: any;
}
