import { EventListenersMap } from '~types/EventListenersMap';

export interface VDOMNodeProps {
  on?: EventListenersMap;
  [index: string]: any;
}
