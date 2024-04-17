import { InternalEvent } from '~constants/internal-event';
import { Component } from '~core/components/component';
import { mountDOM } from '~core/dom/mount-dom';
import { patchDOM } from '~core/dom/patch-dom';
import { unmountDOM } from '~core/dom/unmount-dom';
import { h } from '~core/h';
import { Dispatcher } from '~core/state/dispatcher';
import { GlobalState } from '~core/state/global-state';
import { Store } from '~core/state/store';
import { ComponentClass } from '~types/components/ComponentClass';
import { HyperscriptTagType } from '~types/HyperscriptFunction';
import { CreateAppOptions } from '~types/init/CreateAppOptions';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import { VoidCallback } from '~types/VoidCallback';
import { EventBus } from '~utils/event-bus';

export class SffApp<State, RootComponent extends Component> {
  private root: HTMLElement | null = null;
  private vdom: SFFVDOMNode | null = null;
  private readonly subscriptions: VoidCallback[] = [];
  private readonly rootComponent: ComponentClass<RootComponent>;

  constructor(options: CreateAppOptions<State, RootComponent>) {
    const eventBus = EventBus.create();
    const globalState = GlobalState.create(options.state);
    const dispatcher = Dispatcher.create();
    Store.create(globalState, dispatcher);

    eventBus.on(InternalEvent.RenderVDOM, this.render.bind(this));

    for (const actionName in options.reducers) {
      const reducer = options.reducers[actionName];
      const subscription = dispatcher.subscribe(actionName, (payload) => {
        globalState.set(reducer(globalState.get(), payload));
      });
      this.subscriptions.push(subscription);
    }

    this.rootComponent = options.view;
  }

  mount(root: HTMLElement) {
    this.root = root;
    this.render();
  }

  unmount() {
    if (!this.vdom) {
      throw new Error("Cannot unmount app that wasn't mounted.");
    }
    unmountDOM(this.vdom);
    this.vdom = null;
    this.subscriptions.forEach((unsubscribe) => unsubscribe());
  }

  private render() {
    if (!this.root) {
      throw new Error('Cannot render app without root element provided');
    }

    this.vdom = this.generateVDOM();
    mountDOM(this.vdom, this.root);
  }

  // private render() {
  //   if (!this.root) {
  //     throw new Error('Cannot render app without root element provided');
  //   }
  //
  //   if (this.vdom) {
  //     this.vdom = patchDOM(this.vdom, this.generateVDOM(), this.root);
  //   } else {
  //     this.vdom = this.generateVDOM();
  //     mountDOM(this.vdom, this.root);
  //   }
  // }
  //
  private generateVDOM() {
    return h(this.rootComponent as HyperscriptTagType<RootComponent>);
  }
}
