import { InternalEvent } from '~constants/internal-event';
import { mountDOM } from '~core/dom/mount-dom';
import { patchDOM } from '~core/dom/patch-dom';
import { unmountDOM } from '~core/dom/unmount-dom';
import { Dispatcher } from '~core/state/dispatcher';
import { GlobalState } from '~core/state/global-state';
import { ComponentFunction } from '~types/ComponentFunction';
import { CreateAppOptions } from '~types/init/CreateAppOptions';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import { VoidCallback } from '~types/VoidCallback';
import { EventBus } from '~utils/event-bus';

export class SffApp {
  private root: HTMLElement | null = null;
  private vdom: SFFVDOMNode | null = null;
  private subscriptions: VoidCallback[] = [];
  private readonly view: ComponentFunction<never>;

  private localStateManager: LocalStateManager;

  constructor(options: CreateAppOptions) {
    const eventBus = EventBus.instance();
    eventBus.on(InternalEvent.RenderVDOM, this.render.bind(this));

    const globalState = GlobalState.create(options.state);
    const dispatcher = Dispatcher.create();

    for (const actionName in options.reducers) {
      const reducer = options.reducers[actionName];
      const subscription = dispatcher.subscribe(actionName, (payload) => {
        globalState.set(reducer(globalState.get(), payload));
      });
      this.subscriptions.push(subscription);
    }

    this.view = options.view;
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

    if (this.vdom) {
      this.vdom = patchDOM(this.vdom, this.view(), this.root);
    } else {
      this.vdom = this.view();
      mountDOM(this.vdom, this.root);
    }
  }
}
