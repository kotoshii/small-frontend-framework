import { EventBusListener } from '~types/event-bus/EventBusListener';

export class EventBus {
  private static _instance: EventBus | null = null;
  private readonly listeners: Record<string, EventBusListener[]> = {};

  static create() {
    if (!this._instance) {
      this._instance = new EventBus();
    }

    return this._instance;
  }

  static instance() {
    if (!this._instance) {
      throw new Error('Cannot use event bus before app initialization');
    }

    return this._instance;
  }

  on(eventName: string, listener: EventBusListener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  emit(eventName: string, payload?: any) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(payload));
    }
  }
}
