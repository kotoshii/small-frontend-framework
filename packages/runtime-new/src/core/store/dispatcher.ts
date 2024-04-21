import { InternalEvent } from '~constants/internal-event';
import { StateActionHandler } from '~core/store/types/StateActionHandler';
import { VoidCallback } from '~types/VoidCallback';
import { EventBus } from '~utils/event-bus/event-bus';

export class Dispatcher {
  private static _instance: Dispatcher | null = null;

  private eventBus = EventBus.instance();
  private readonly actionHandlers = new Map<string, StateActionHandler[]>();

  static create() {
    if (this._instance) {
      throw new Error(
        'Attempt to create another Dispatcher instance per app. This behavior is abnormal, please check your code.',
      );
    }

    this._instance = new Dispatcher();

    return this._instance;
  }

  subscribe(action: string, handler: StateActionHandler): VoidCallback {
    if (!this.actionHandlers.has(action)) {
      this.actionHandlers.set(action, []);
    }

    const handlers = this.actionHandlers.get(action)!;
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
    this.actionHandlers.get(action)?.forEach((handler) => handler(payload));
    this.eventBus.emit(InternalEvent.RenderVDOM);
  }
}
