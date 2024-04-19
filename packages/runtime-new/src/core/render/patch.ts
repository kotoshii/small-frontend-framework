import {
  arraysDiff,
  arraysDiffSequence,
  nodesEqual,
  objectsDiff,
} from '~core/reconciliation/comparison';
import { ArrayDiffOpType } from '~core/reconciliation/constants/ArrayDiffOpType';
import {
  removeAttribute,
  removeStyle,
  setAttribute,
  setStyle,
} from '~core/render/attributes';
import { mount } from '~core/render/mount';
import { unmount } from '~core/render/unmount';
import { VDOMNodeType } from '~core/vdom/constants/VDOMNodeType';
import { EventListenersMap } from '~core/vdom/types/EventListenersMap';
import {
  SFFElement,
  WithExtractableChildren,
} from '~core/vdom/types/SFFElement';
import { VDOMNodeElement, VDOMNodeText } from '~core/vdom/types/VDOMNode';
import { extractChildren } from '~core/vdom/utils/vnode';

export function patch(
  vnode1: SFFElement,
  vnode2: SFFElement,
  parentElement: HTMLElement,
) {
  if (!nodesEqual(vnode1, vnode2)) {
    const index = findIndexInParent(parentElement, vnode1.el!);
    unmount(vnode1);
    mount(vnode2, parentElement, index);

    return vnode2;
  }

  vnode2.el = vnode1.el;

  switch (vnode2.type) {
    case VDOMNodeType.TEXT: {
      patchTextNode(vnode1 as VDOMNodeText, vnode2);
      return vnode2;
    }
    case VDOMNodeType.ELEMENT: {
      patchElementNode(vnode1 as VDOMNodeElement, vnode2);
      break;
    }
    case VDOMNodeType.COMPONENT: {
      // patchComponent(vnode1 as VDOMNodeComponent, vnode2);
      return;
    }
  }

  patchChildren(vnode1 as WithExtractableChildren, vnode2);

  return vnode2;
}

function patchTextNode(vnode1: VDOMNodeText, vnode2: VDOMNodeText) {
  if (vnode1.value !== vnode2.value && vnode1.el) {
    vnode1.el.nodeValue = vnode2.value;
  }
}

function patchElementNode(vnode1: VDOMNodeElement, vnode2: VDOMNodeElement) {
  const el = vnode1.el;
  if (!el) return;

  const {
    class: oldClass,
    style: oldStyle,
    on: oldEvents,
    ...oldAttrs
  } = vnode1.props;
  const {
    class: newClass,
    style: newStyle,
    on: newEvents,
    ...newAttrs
  } = vnode2.props;
  const { listeners: oldListeners } = vnode1;

  patchAttrs(el, oldAttrs, newAttrs);
  patchClasses(el, oldClass, newClass);
  patchStyles(el, oldStyle, newStyle);

  vnode2.listeners = patchEvents(el, oldListeners, oldEvents, newEvents);
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
    const handler = newEvents[eventName];
    el.addEventListener(eventName, handler);
    addedListeners[eventName] = handler;
  }

  return addedListeners;
}

function patchChildren(
  vnode1: WithExtractableChildren,
  vnode2: WithExtractableChildren,
) {
  const oldChildren = extractChildren(vnode1);
  const newChildren = extractChildren(vnode2);
  const parentElement = vnode1.el;

  if (!parentElement) return;

  const diffSequence = arraysDiffSequence(oldChildren, newChildren, nodesEqual);

  for (const operation of diffSequence) {
    const { index, item } = operation;

    switch (operation.op) {
      case ArrayDiffOpType.ADD: {
        mount(item, parentElement, index);
        break;
      }

      case ArrayDiffOpType.REMOVE: {
        unmount(item);
        break;
      }

      case ArrayDiffOpType.MOVE: {
        parentElement.insertBefore(
          oldChildren[operation.originalIndex].el!,
          parentElement.childNodes[index],
        );
        patch(
          oldChildren[operation.originalIndex],
          newChildren[index],
          parentElement,
        );

        break;
      }

      case ArrayDiffOpType.NOOP: {
        patch(
          oldChildren[operation.originalIndex],
          newChildren[index],
          parentElement,
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

function toClassList(classes = ''): string[] {
  return Array.isArray(classes)
    ? classes.filter((str: string) => str !== '')
    : classes.split(/(\s+)/).filter((str) => str.trim() !== '');
}
