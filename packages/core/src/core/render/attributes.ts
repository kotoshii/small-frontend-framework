import { MaybeArray } from '~types/MaybeArray';
import { toArray } from '~utils/misc';

export function setAttributes(el: HTMLElement, attrs: Record<string, any>) {
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

function setClass(el: HTMLElement, className: MaybeArray<string>) {
  el.className = '';
  el.classList.add(...toArray(className));
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
    // Some elements have attributes attached directly: e.g. - value in  HTMLInputElement

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    el[name] = value;
  }
}

export function removeAttribute(el: HTMLElement, name: string) {
  if (name in el) {
    // Some elements have attributes attached directly: e.g. - value in HTMLInputElement

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    el[name] = null;
  }
  el.removeAttribute(name);
}
