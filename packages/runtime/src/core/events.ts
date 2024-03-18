import { EventListenersMap } from '~types/EventListenersMap';

function addEventListener(
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  el: HTMLElement,
) {
  el.addEventListener(eventName, handler);
  return handler;
}

export function addEventListeners(
  listeners: EventListenersMap = {},
  el: HTMLElement,
) {
  const addedListeners: EventListenersMap = {};

  Object.entries(listeners).forEach(([eventName, handler]) => {
    addedListeners[eventName] = addEventListener(eventName, handler, el);
  });

  return addedListeners;
}
