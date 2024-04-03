import { Dispatcher } from '~core/state/dispatcher';
import { StateActionHandler } from '~types/state/StateActionHandler';

export class GlobalState {
  private static _instance: GlobalState | null = null;
  private _state: any = null;

  constructor(state: unknown) {
    this._state = state;
  }

  static create(state: unknown) {
    if (!this._instance) {
      this._instance = new GlobalState(state);
    }

    return this._instance;
  }

  static instance() {
    return this._instance;
  }

  get() {
    return this._state;
  }

  set(state: unknown) {
    this._state = state;
  }
}

class Store {
  private static _instance: Store | null = null;
  private _globalState: GlobalState;
  private _dispatcher: Dispatcher;

  constructor() {
    const globalState = GlobalState.instance();
    const dispatcher = Dispatcher.instance();

    if (!globalState) {
      throw new Error('Cannot use store before initialization');
    }
    if (!dispatcher) {
      throw new Error('Cannot use dispatcher before initialization');
    }

    this._globalState = globalState;
    this._dispatcher = dispatcher;
  }

  static instance() {
    if (!this._instance) {
      this._instance = new Store();
    }

    return this._instance;
  }

  get data() {
    return this._globalState.get();
  }

  dispatch<T>(action: string, payload: T) {
    this._dispatcher.dispatch(action, payload);
  }

  subscribe(action: string, handler: StateActionHandler) {
    return this._dispatcher.subscribe(action, handler);
  }
}

export function getStore() {
  return Store.instance();
}
