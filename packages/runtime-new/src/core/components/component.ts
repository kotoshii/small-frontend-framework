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

export abstract class Component<TProps = unknown> {
  private isMounted = false;
  private vnode: SFFElement | null = null;
  private parentElement: HTMLElement | null = null;

  readonly props: ComponentProps<TProps>;

  constructor(props: ComponentProps<TProps>) {
    this.props = props;
  }

  mount(parentElement: HTMLElement, index: NodeIndex) {
    if (this.isMounted) throw new Error('Component is already mounted');

    this.parentElement = parentElement;

    const vnode = this.render();

    if (isNodeEmpty(vnode)) {
      return;
    }

    if (typeof vnode === 'string' || typeof vnode === 'number') {
      this.vnode = hString(vnode);
    } else {
      this.vnode = vnode;
    }

    mount(this.vnode, this.parentElement, index);

    this.isMounted = true;
  }

  unmount() {
    if (!this.isMounted)
      throw new Error('Cannot unmount component that is not mounted');

    if (this.vnode) {
      unmount(this.vnode);
      this.vnode = null;
    }

    this.isMounted = false;
  }

  patch() {
    let vnode = this.render();

    if (isNodeEmpty(vnode)) {
      this.unmount();
      return;
    }

    if (typeof vnode === 'string' || typeof vnode === 'number') {
      vnode = hString(vnode);
    }

    if (isNodeEmpty(this.vnode)) {
      this.vnode = vnode;
      mount(this.vnode, this.parentElement!);
      this.isMounted = true;

      return;
    }

    this.vnode = patch(this.vnode, vnode, this.parentElement!);
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

  abstract render(): SFFNode;
}
