import { EventListenersMap } from '~core/vdom/types/EventListenersMap';

export function addEventListeners(
  listeners: EventListenersMap = {},
  el: HTMLElement,
) {
  const addedListeners: EventListenersMap = {};

  Object.entries(listeners).forEach(([eventName, handler]) => {
    el.addEventListener(eventName, handler);
    addedListeners[eventName] = handler;
  });

  return addedListeners;
}

export function removeEventListeners(
  listeners: EventListenersMap = {},
  el: HTMLElement,
) {
  Object.entries(listeners).forEach(([eventName, handler]) => {
    el.removeEventListener(eventName, handler);
  });
}
