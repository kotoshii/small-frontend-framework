import { InternalEvent } from '~constants/internal-event';
import { Component } from '~core/components/component';
import { ComponentClass } from '~core/components/types/ComponentClass';
import { CreateAppOptions } from '~core/init/types/CreateAppOptions';
import { mount } from '~core/render/mount';
import { patch } from '~core/render/patch';
import { RouteNavigator } from '~core/router/route-navigator';
import { Dispatcher } from '~core/store/dispatcher';
import { GlobalState } from '~core/store/global-state';
import { Store } from '~core/store/store';
import { h } from '~core/vdom/h';
import { HyperscriptTagType } from '~core/vdom/types/HyperscriptFunction';
import { SFFElement } from '~core/vdom/types/SFFElement';
import { EventBus } from '~utils/event-bus/event-bus';

export class App<
  RootComponent extends Component,
  State extends object = object,
> {
  private root: HTMLElement | null | undefined = null;
  private vnode: SFFElement | null = null;
  private readonly RootComponent: ComponentClass<RootComponent>;

  constructor(
    view: ComponentClass<RootComponent>,
    options?: CreateAppOptions<State>,
  ) {
    this.RootComponent = view;

    EventBus.create().on(InternalEvent.RenderVDOM, this.render.bind(this));
    GlobalState.create<State>(options?.state);
    Dispatcher.create<State>(options?.reducers);
    Store.create();
    RouteNavigator.create();
  }

  mount(root?: HTMLElement | null) {
    this.root = root;
    this.render();
  }

  render() {
    if (!this.root)
      throw new Error('Cannot render app without root element provided');

    if (!this.vnode) {
      this.vnode = this.createRootComponent();
      mount(this.vnode, this.root);
      return;
    }

    patch(this.vnode, this.createRootComponent(), this.root);
  }

  private createRootComponent() {
    return h(this.RootComponent as HyperscriptTagType<RootComponent>);
  }
}
