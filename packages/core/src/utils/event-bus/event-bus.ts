import { EventBusListener } from '~utils/event-bus/types/EventBusListener';

export class EventBus {
  private static _instance: EventBus | null = null;
  private readonly listeners: Record<string, EventBusListener[]> = {};

  static create() {
    if (this._instance) {
      throw new Error(
        'Attempt to create another EventBus instance per app. This behavior is abnormal, please check your code.',
      );
    }

    this._instance = new EventBus();

    return this._instance;
  }

  static instance() {
    if (!this._instance) {
      throw new Error('Cannot use EventBus before app initialization');
    }

    return this._instance;
  }

  on(eventName: string, listener: EventBusListener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  emit(eventName: string, payload?: unknown) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(payload));
    }
  }
}
