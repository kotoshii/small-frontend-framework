import { Dispatcher } from '~core/state/dispatcher';
import { GlobalState } from '~core/state/global-state';
import { StateActionHandler } from '~types/state/StateActionHandler';

export class Store {
  private static _instance: Store | null = null;
  private _globalState: GlobalState;
  private _dispatcher: Dispatcher;

  constructor(globalState: GlobalState, dispatcher: Dispatcher) {
    this._globalState = globalState;
    this._dispatcher = dispatcher;
  }

  static create(globalState: GlobalState, dispatcher: Dispatcher) {
    if (!this._instance) {
      this._instance = new Store(globalState, dispatcher);
    }

    return this._instance;
  }

  static instance() {
    if (!this._instance) {
      throw new Error('Cannot use global store before app initialization');
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
