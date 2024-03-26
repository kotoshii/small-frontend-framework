import { StateActionHandler } from '~types/state/StateActionHandler';
import { VoidCallback } from '~types/VoidCallback';

export class Dispatcher {
  private static _instance: Dispatcher | null = null;

  private readonly subscriptions = new Map<string, StateActionHandler[]>();
  private updateHandlers: VoidCallback[] = [];

  static create() {
    if (!this._instance) {
      this._instance = new Dispatcher();
    }

    return this._instance;
  }

  static instance() {
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

  onStateUpdate(handler: VoidCallback) {
    this.updateHandlers.push(handler);

    return () => {
      const index = this.updateHandlers.indexOf(handler);
      this.updateHandlers.splice(index, 1);
    };
  }

  dispatch<T>(action: string, payload: T) {
    this.subscriptions.get(action)?.forEach((handler) => handler(payload));
    this.updateHandlers.forEach((handler) => handler());
  }
}
