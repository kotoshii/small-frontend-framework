import { ArrayDiffOpType } from '~constants/reconciliation';
import { VDOMNodeType } from '~constants/vdom';
import {
  removeAttribute,
  removeStyle,
  setAttribute,
  setStyle,
} from '~core/dom/attributes';
import { addEventListener } from '~core/dom/events';
import { mountDOM } from '~core/dom/mount-dom';
import { unmountDOM } from '~core/dom/unmount-dom';
import { extractChildren } from '~core/h';
import { EventListenersMap } from '~types/vdom/EventListenersMap';
import { SFFVDOMNode, SFFVDOMNodeWithChildren } from '~types/vdom/SFFVDOMNode';
import {
  VDOMNodeComponent,
  VDOMNodeElement,
  VDOMNodeText,
} from '~types/vdom/VDOMNode';
import {
  arraysDiff,
  arraysDiffSequence,
  nodesEqual,
  objectsDiff,
} from '~utils/reconciliation/comparison';

export function patchDOM(
  oldVdom: SFFVDOMNode,
  newVdom: SFFVDOMNode,
  parentEl: HTMLElement,
) {
  if (!nodesEqual(oldVdom, newVdom)) {
    const index = findIndexInParent(parentEl, oldVdom.el!);
    unmountDOM(oldVdom);
    mountDOM(newVdom, parentEl, index);

    return newVdom;
  }

  newVdom.el = oldVdom.el;

  switch (newVdom.type) {
    case VDOMNodeType.TEXT: {
      patchText(oldVdom as VDOMNodeText, newVdom);
      return newVdom;
    }
    case VDOMNodeType.ELEMENT: {
      patchElement(oldVdom as VDOMNodeElement, newVdom);
      break;
    }
    case VDOMNodeType.COMPONENT: {
      patchComponent(oldVdom as VDOMNodeComponent, newVdom);
      break;
    }
  }

  patchChildren(oldVdom as SFFVDOMNodeWithChildren, newVdom);

  return newVdom;
}

function patchText(oldVdom: VDOMNodeText, newVdom: VDOMNodeText) {
  if (oldVdom.value !== newVdom.value) {
    oldVdom.el!.nodeValue = newVdom.value;
  }
}

function patchElement(oldVdom: VDOMNodeElement, newVdom: VDOMNodeElement) {
  const el = oldVdom.el!;
  const {
    class: oldClass,
    style: oldStyle,
    on: oldEvents,
    ...oldAttrs
  } = oldVdom.props;
  const {
    class: newClass,
    style: newStyle,
    on: newEvents,
    ...newAttrs
  } = newVdom.props;
  const { listeners: oldListeners } = oldVdom;

  patchAttrs(el, oldAttrs, newAttrs);
  patchClasses(el, oldClass, newClass);
  patchStyles(el, oldStyle, newStyle);

  newVdom.listeners = patchEvents(el, oldListeners, oldEvents, newEvents);
}

function patchComponent(
  oldVdom: VDOMNodeComponent,
  newVdom: VDOMNodeComponent,
) {
  newVdom.instance.state = oldVdom.instance.state;
}

function patchAttrs(
  el: HTMLElement,
  oldAttrs: Record<string, any>,
  newAttrs: Record<string, any>,
) {
  const { added, removed, updated } = objectsDiff(oldAttrs, newAttrs);

  for (const attr of removed) {
    removeAttribute(el, attr);
  }

  for (const attr of added.concat(updated)) {
    setAttribute(el, attr, newAttrs[attr]);
  }
}

function patchClasses(el: HTMLElement, oldClass: string, newClass: string) {
  const oldClasses = toClassList(oldClass);
  const newClasses = toClassList(newClass);

  const { added, removed } = arraysDiff(oldClasses, newClasses);

  if (removed.length > 0) {
    el.classList.remove(...removed);
  }
  if (added.length > 0) {
    el.classList.add(...added);
  }
}

function patchStyles(
  el: HTMLElement,
  oldStyle: Record<string, string | null> = {},
  newStyle: Record<string, string | null> = {},
) {
  const { added, removed, updated } = objectsDiff(oldStyle, newStyle);

  for (const style of removed) {
    removeStyle(el, style);
  }

  for (const style of added.concat(updated)) {
    setStyle(el, style, newStyle[style]);
  }
}

function patchEvents(
  el: HTMLElement,
  oldListeners: EventListenersMap = {},
  oldEvents: EventListenersMap = {},
  newEvents: EventListenersMap = {},
) {
  const { removed, added, updated } = objectsDiff(oldEvents, newEvents);

  for (const eventName of removed.concat(updated)) {
    el.removeEventListener(eventName, oldListeners[eventName]);
  }

  const addedListeners: EventListenersMap = {};

  for (const eventName of added.concat(updated)) {
    addedListeners[eventName] = addEventListener(
      eventName,
      newEvents[eventName],
      el,
    );
  }

  return addedListeners;
}

function patchChildren(
  oldVdom: SFFVDOMNodeWithChildren,
  newVdom: SFFVDOMNodeWithChildren,
) {
  const oldChildren = extractChildren(oldVdom);
  const newChildren = extractChildren(newVdom);
  const parentEl = oldVdom.el;

  const diffSequence = arraysDiffSequence(oldChildren, newChildren, nodesEqual);

  for (const operation of diffSequence) {
    const { index, item } = operation;

    switch (operation.op) {
      case ArrayDiffOpType.ADD: {
        mountDOM(item, parentEl!, index);
        break;
      }

      case ArrayDiffOpType.REMOVE: {
        unmountDOM(item);
        break;
      }

      case ArrayDiffOpType.MOVE: {
        parentEl!.insertBefore(
          oldChildren[operation.originalIndex].el!,
          parentEl!.childNodes[index],
        );
        patchDOM(
          oldChildren[operation.originalIndex],
          newChildren[index],
          parentEl!,
        );

        break;
      }

      case ArrayDiffOpType.NOOP: {
        patchDOM(
          oldChildren[operation.originalIndex],
          newChildren[index],
          parentEl!,
        );
        break;
      }
    }
  }
}

function findIndexInParent(parentEl: HTMLElement, el: Node) {
  const index = Array.from(parentEl.childNodes).indexOf(el as ChildNode);

  if (index < 0) {
    return null;
  }

  return index;
}

function toClassList(classes = '') {
  return Array.isArray(classes)
    ? classes.filter((str: string) => str !== '')
    : classes.split(/(\s+)/).filter((str) => str.trim() !== '');
}
