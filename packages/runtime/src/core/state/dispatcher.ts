import { InternalEvent } from '~constants/internal-event';
import { StateActionHandler } from '~types/state/StateActionHandler';
import { VoidCallback } from '~types/VoidCallback';
import { EventBus } from '~utils/event-bus';

export class Dispatcher {
  private static _instance: Dispatcher | null = null;

  private eventBus = EventBus.instance();
  private readonly subscriptions = new Map<string, StateActionHandler[]>();

  static create() {
    if (!this._instance) {
      this._instance = new Dispatcher();
    }

    return this._instance;
  }

  subscribe(action: string, handler: StateActionHandler): VoidCallback {
    if (!this.subscriptions.has(action)) {
      this.subscriptions.set(action, []);
    }

    const handlers = this.subscriptions.get(action)!;
    if (handlers.includes(handler)) {
      return () => {};
    }

    handlers.push(handler);

    return () => {
      const index = handlers.indexOf(handler);
      handlers.splice(index, 1);
    };
  }

  dispatch<T>(action: string, payload: T) {
    this.subscriptions.get(action)?.forEach((handler) => handler(payload));
    this.eventBus.emit(InternalEvent.RenderVDOM);
  }
}
