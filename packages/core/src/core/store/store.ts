import { Dispatcher } from '~core/store/dispatcher';
import { GlobalState } from '~core/store/global-state';
import { StateActionHandler } from '~core/store/types/StateActionHandler';

type ReducersPayloadMapWithUnknownActions<PayloadMap> = PayloadMap &
  Record<string, unknown>;

export class Store<
  State extends object = object,
  ReducersPayloadMap = Record<string, unknown>,
> {
  private static _instance: Store | null = null;

  private globalState = GlobalState.instance<State>();
  private dispatcher = Dispatcher.instance<State>();

  static create<State extends object = object>() {
    if (this._instance) {
      throw new Error(
        'Attempt to create another Store instance per app. This behavior is abnormal, please check your code.',
      );
    }

    this._instance = new Store<State>();

    return this._instance as Store<State>;
  }

  static instance<State extends object = object>() {
    if (!this._instance) {
      throw new Error('Cannot use Store before app initialization');
    }

    return this._instance as Store<State>;
  }

  get data() {
    return this.globalState.get();
  }

  dispatch<
    Action extends
      keyof ReducersPayloadMapWithUnknownActions<ReducersPayloadMap>,
  >(
    action: Action | string,
    payload: ReducersPayloadMapWithUnknownActions<ReducersPayloadMap>[Action],
  ) {
    this.dispatcher.dispatch(action as string, payload);
  }

  subscribe<
    Action extends
      keyof ReducersPayloadMapWithUnknownActions<ReducersPayloadMap>,
  >(
    action: Action | string,
    handler: StateActionHandler<
      ReducersPayloadMapWithUnknownActions<ReducersPayloadMap>[Action]
    >,
  ) {
    return this.dispatcher.subscribe(action as string, handler);
  }
}
