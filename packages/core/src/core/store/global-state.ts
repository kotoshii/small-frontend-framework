export class GlobalState<State extends object = object> {
  private static _instance: GlobalState | null = null;
  private _state: State;

  private constructor(state?: State) {
    this._state = state || ({} as State);
  }

  static create<State extends object>(state?: State) {
    if (this._instance) {
      throw new Error(
        'Attempt to create another GlobalState instance per app. This behavior is abnormal, please check your code.',
      );
    }

    this._instance = new GlobalState(state);

    return this._instance as GlobalState<State>;
  }

  static instance<State extends object = object>() {
    if (!this._instance) {
      throw new Error('Cannot use GlobalState before app initialization');
    }

    return this._instance as GlobalState<State>;
  }

  get() {
    return this._state;
  }

  set(state: State) {
    this._state = state;
  }
}
