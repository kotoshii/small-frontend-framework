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

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface Component {
  afterMount(): Promise<void>;
  afterUpdate(): Promise<void>;
  beforeUnmount(): Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export abstract class Component<TProps = unknown, TState = unknown> {
  private isMounted = false;
  private vnode: SFFElement | null = null;
  private parentElement: HTMLElement | null = null;

  props: ComponentProps<TProps>;
  state?: TState;

  constructor(props: ComponentProps<TProps>) {
    this.props = props;
  }

  abstract render(): SFFNode;

  protected setState(state: Partial<TState>) {
    if (!this.state) return;
    this.state = { ...this.state, ...state };
    this.patch();
  }

  mount(parentElement: HTMLElement, index: NodeIndex) {
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

  unmount() {
    if (!this.isMounted)
      throw new Error('Cannot unmount component that is not mounted');

    if (this.vnode) {
      void this._beforeUnmount();
      unmount(this.vnode);
    }

    this.isMounted = false;
  }

  patch() {
    if (!this.isMounted)
      throw new Error('Cannot patch component that is not mounted');

    let vnode = this.render();

    if (isNodeEmpty(vnode)) {
      this.unmount();
      this.vnode = null;
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

  updateProps(props: TProps) {
    this.props = { ...this.props, ...props };
  }

  get elements() {
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

  get firstElement() {
    return this.elements[0] || null;
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
