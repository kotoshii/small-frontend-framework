import { ComponentProps } from '~core/components/types/ComponentProps';
import { mount } from '~core/render/mount';
import { patch } from '~core/render/patch';
import { NodeIndex } from '~core/render/types/NodeIndex';
import { unmount } from '~core/render/unmount';
import { VDOMNodeType } from '~core/vdom/constants/VDOMNodeType';
import { hString } from '~core/vdom/h';
import { SFFElement } from '~core/vdom/types/SFFElement';
import { SFFNode } from '~core/vdom/types/SFFNode';
import { extractChildren, isNodeEmpty } from '~core/vdom/utils/vnode';

export const mountSymbol = Symbol('mount');
export const unmountSymbol = Symbol('unmount');
export const patchSymbol = Symbol('patch');
export const updatePropsSymbol = Symbol('updateProps');

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface Component {
  afterMount(): Promise<void> | void;
  afterUpdate(): Promise<void> | void;
  beforeUnmount(): Promise<void> | void;
}

/**
 * Class used to defined components. Please refer to the docs in the official repository for the usage details.
 * */
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export abstract class Component<
  TProps = unknown,
  TGlobalState extends object = object,
  TReducersPayloadMap = Record<string, unknown>,
  TState extends object = object,
> {
  private isMounted = false;
  private vnode: SFFElement | null = null;
  private parentElement: HTMLElement | null = null;
  private _memoized = false;

  props: ComponentProps<TProps, TGlobalState, TReducersPayloadMap>;
  state: TState = {} as TState;

  constructor(
    props: ComponentProps<TProps, TGlobalState, TReducersPayloadMap>,
  ) {
    this.props = props;
  }

  abstract render(): SFFNode;

  protected setState(state: Partial<TState>) {
    if (!this.state) return;
    this.state = { ...this.state, ...state };
    this[patchSymbol]();
  }

  /**
   * Call this method in constructor!
   * Enables props comparison before updating the component so that it's updated only if props differ. Works like React's memo() function.
   * Comparison is done using `fast-deep-equal` package.
   * */
  protected useMemo() {
    this._memoized = true;
  }

  [mountSymbol](parentElement: HTMLElement, index: NodeIndex) {
    if (this.isMounted) throw new Error('Component is already mounted');

    this.parentElement = parentElement;

    const vnode = this.render();

    if (isNodeEmpty(vnode)) {
      this.isMounted = true;
      void this._afterMount();
      return;
    }

    if (typeof vnode === 'string' || typeof vnode === 'number') {
      this.vnode = hString(vnode);
    } else {
      this.vnode = vnode;
    }

    mount(this.vnode, this.parentElement, index);

    this.isMounted = true;
    void this._afterMount();
  }

  [unmountSymbol]() {
    if (!this.isMounted)
      throw new Error('Cannot unmount component that is not mounted');

    if (this.vnode) {
      void this._beforeUnmount();
      unmount(this.vnode);
      this.vnode = null;
    }

    this.isMounted = false;
  }

  [patchSymbol]() {
    if (!this.isMounted)
      throw new Error('Cannot patch component that is not mounted');

    let vnode = this.render();

    if (isNodeEmpty(vnode)) {
      if (this.vnode) {
        unmount(this.vnode);
        this.vnode = null;
      }
      void this._afterUpdate();

      return;
    }

    if (typeof vnode === 'string' || typeof vnode === 'number') {
      vnode = hString(vnode);
    }

    if (isNodeEmpty(this.vnode)) {
      this.vnode = vnode;
      mount(this.vnode, this.parentElement!);
      void this._afterUpdate();

      return;
    }

    this.vnode = patch(this.vnode, vnode, this.parentElement!);
    void this._afterUpdate();
  }

  [updatePropsSymbol](props: TProps) {
    this.props = { ...this.props, ...props };
  }

  private get elements() {
    if (!this.vnode) {
      return [];
    }

    if (this.vnode.type === VDOMNodeType.FRAGMENT) {
      return extractChildren(this.vnode).flatMap((child) => {
        if (child.type === VDOMNodeType.COMPONENT) {
          return child.instance.elements;
        }

        return [child.el];
      });
    }

    if (this.vnode.type === VDOMNodeType.COMPONENT) {
      return [this.vnode.instance.elements];
    }

    return [this.vnode.el];
  }

  private get firstElement() {
    return this.elements[0] || null;
  }

  private get memoized() {
    return this._memoized;
  }

  private _afterMount() {
    this.afterMount && this.afterMount();
  }

  private _afterUpdate() {
    this.afterUpdate && this.afterUpdate();
  }

  private _beforeUnmount() {
    this.beforeUnmount && this.beforeUnmount();
  }
}
