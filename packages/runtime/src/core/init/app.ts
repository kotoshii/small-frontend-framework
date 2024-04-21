import { InternalEvent } from '~constants/internal-event';
import { Component } from '~core/components/component';
import { ComponentClass } from '~core/components/types/ComponentClass';
import { CreateAppOptions } from '~core/init/types/CreateAppOptions';
import { mount } from '~core/render/mount';
import { patch } from '~core/render/patch';
import { Dispatcher } from '~core/store/dispatcher';
import { GlobalState } from '~core/store/global-state';
import { Store } from '~core/store/store';
import { h } from '~core/vdom/h';
import { SFFElement } from '~core/vdom/types/SFFElement';
import { EventBus } from '~utils/event-bus/event-bus';

export class App<RootComponent extends Component, State = unknown> {
  private root: HTMLElement | null = null;
  private vnode: SFFElement | null = null;
  private readonly RootComponent: ComponentClass<RootComponent>;

  constructor(
    view: ComponentClass<RootComponent>,
    options?: CreateAppOptions<State>,
  ) {
    this.RootComponent = view;

    const eventBus = EventBus.create();
    eventBus.on(InternalEvent.RenderVDOM, this.render.bind(this));

    const globalState = GlobalState.create(options?.state || {});
    const dispatcher = Dispatcher.create();

    Store.create(globalState, dispatcher);

    if (options?.reducers) {
      for (const actionName in options.reducers) {
        const reducer = options.reducers[actionName];
        dispatcher.subscribe(actionName, (payload) => {
          globalState.set(reducer(globalState.get(), payload));
        });
      }
    }
  }

  mount(root: HTMLElement) {
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
    return h(this.RootComponent);
  }
}
