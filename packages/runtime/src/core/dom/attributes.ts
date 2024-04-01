import { VDOMNodeProps } from '~types/vdom/VDOMNodeProps';

export function setAttributes(el: HTMLElement, attrs: VDOMNodeProps) {
  const { class: className, style, ...otherAttrs } = attrs;

  if (className) {
    setClass(el, className);
  }

  if (style) {
    Object.entries(style).forEach(([prop, value]) =>
      setStyle(el, prop, value as string | null),
    );
  }

  Object.entries(otherAttrs).forEach(([name, value]) =>
    setAttribute(el, name, value),
  );
}

export function setClass(el: HTMLElement, className: string | string[]) {
  el.className = '';

  if (Array.isArray(className)) {
    el.classList.add(...className);
  } else {
    el.className = className;
  }
}

export function setStyle(el: HTMLElement, name: string, value: string | null) {
  const important = value?.includes('!important') ? 'important' : '';
  el.style.setProperty(name, value, important);
}

export function removeStyle(el: HTMLElement, name: string) {
  el.style.removeProperty(name);
}

export function setAttribute(
  el: HTMLElement,
  name: string,
  value: string | null,
) {
  if (value == null) {
    removeAttribute(el, name);
  } else if (name.startsWith('data-')) {
    el.setAttribute(name, value);
  } else if (name in el) {
    // Some elements have attributes attached directly: e.g. - HTMLInputElement

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    el[name] = value;
  }
}

export function removeAttribute(el: HTMLElement, name: string) {
  if (name in el) {
    // Some elements have attributes attached directly: e.g. - HTMLInputElement

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    el[name] = null;
  }
  el.removeAttribute(name);
}
