import { mount } from '~core/render/mount';
import { NodeIndex } from '~core/render/types/NodeIndex';
import { hString } from '~core/vdom/h';
import { SFFNode } from '~core/vdom/types/SFFNode';
import { isNodeEmpty } from '~core/vdom/utils/vnode';

export abstract class Component {
  private isMounted = false;

  mount(parentElement: HTMLElement, index: NodeIndex) {
    if (this.isMounted) throw new Error('Component is already mounted');

    const vnode = this.render();

    if (isNodeEmpty(vnode)) {
      this.isMounted = true;
      return;
    }

    if (typeof vnode === 'string' || typeof vnode === 'number') {
      mount(hString(vnode), parentElement, index);
    } else {
      mount(vnode, parentElement, index);
    }

    this.isMounted = true;
  }

  abstract render(): SFFNode;
}
