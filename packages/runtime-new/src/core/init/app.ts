import { Component } from '~core/components/component';
import { ComponentClass } from '~core/components/types/ComponentClass';
import { CreateAppOptions } from '~core/init/types/CreateAppOptions';
import { mount } from '~core/render/mount';
import { h } from '~core/vdom/h';
import { SFFElement } from '~core/vdom/types/SFFElement';

export class App<RootComponent extends Component> {
  private root: HTMLElement | null = null;
  private vnode: SFFElement | null = null;
  private readonly RootComponent: ComponentClass<RootComponent>;

  constructor(options: CreateAppOptions<RootComponent>) {
    this.RootComponent = options.view;
  }

  mount(root: HTMLElement) {
    this.root = root;
    this.vnode = h(this.RootComponent);

    mount(this.vnode, this.root);
  }
}
