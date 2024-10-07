import { InternalEvent } from '~constants/internal-event';
import { GlobalState } from '~core/store/global-state';
import { ReducerPayload } from '~core/store/types/ReducerPayload';
import { ReducersMap } from '~core/store/types/ReducersMap';
import { StateActionHandler } from '~core/store/types/StateActionHandler';
import { VoidCallback } from '~types/VoidCallback';
import { EventBus } from '~utils/event-bus/event-bus';

export class Dispatcher<State extends object = object> {
  private static _instance: Dispatcher | null = null;

  private eventBus = EventBus.instance();
  private globalState = GlobalState.instance<State>();

  private readonly actionHandlers = new Map<string, StateActionHandler[]>();

  private constructor(reducers?: ReducersMap<State>) {
    if (reducers) {
      for (const actionName in reducers) {
        const reducer = reducers[actionName];
        this.subscribe(
          actionName,
          (payload: ReducerPayload<State, typeof reducer>) => {
            this.globalState.set(reducer(this.globalState.get(), payload));
          },
        );
      }
    }
  }

  static create<State extends object = object>(reducers?: ReducersMap<State>) {
    if (this._instance) {
      throw new Error(
        'Attempt to create another Dispatcher instance per app. This behavior is abnormal, please check your code.',
      );
    }

    this._instance = new Dispatcher<State>(reducers);

    return this._instance as Dispatcher<State>;
  }

  static instance<State extends object = object>() {
    if (!this._instance) {
      throw new Error('Cannot use Dispatcher before app initialization');
    }

    return this._instance as Dispatcher<State>;
  }

  subscribe<Payload>(
    action: string,
    handler: StateActionHandler<Payload>,
  ): VoidCallback {
    if (!this.actionHandlers.has(action)) {
      this.actionHandlers.set(action, []);
    }

    const handlers = this.actionHandlers.get(
      action,
    ) as StateActionHandler<Payload>[];
    if (handlers.includes(handler)) {
      return () => {};
    }

    handlers.push(handler);

    return () => {
      const index = handlers.indexOf(handler);
      handlers.splice(index, 1);
    };
  }

  dispatch<Payload>(action: string, payload: Payload) {
    if (this.actionHandlers.has(action)) {
      this.actionHandlers.get(action)?.forEach((handler) => handler(payload));
      this.eventBus.emit(InternalEvent.RenderVDOM);
      return;
    }

    console.warn(`Tried to dispatch non-existing action \`${action}\`.`);
  }
}
