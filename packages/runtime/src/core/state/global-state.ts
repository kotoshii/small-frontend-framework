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

  get() {
    return this._state;
  }

  set(state: unknown) {
    this._state = state;
  }
}
