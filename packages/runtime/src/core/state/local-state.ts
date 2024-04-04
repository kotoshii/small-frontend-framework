import { VoidCallback } from '~types/VoidCallback';

const _CALL_INDEX_INITIAL_VALUE = -1;

export class LocalStateManager {
  private static _instance: LocalStateManager | null = null;

  private updateHandlers: VoidCallback[] = [];

  private _stateQueue: any[] = [];
  private _callIndex = _CALL_INDEX_INITIAL_VALUE;

  static create() {
    if (!this._instance) {
      this._instance = new LocalStateManager();
    }

    return this._instance;
  }

  static instance() {
    return this._instance;
  }

  setInitialState<T>(value: T) {
    this.incrementCallIndex();

    if (typeof this.getState(this._callIndex) === 'undefined') {
      this._stateQueue[this._callIndex] = value;
    }

    return this._callIndex;
  }

  getState<T>(index: number): T {
    return this._stateQueue[index];
  }

  createStateSetter<T>(index: number) {
    return (value: T) => {
      this._stateQueue[index] = value;
      this.render();
    };
  }

  onStateUpdate(handler: VoidCallback) {
    this.updateHandlers.push(handler);

    return () => {
      const index = this.updateHandlers.indexOf(handler);
      this.updateHandlers.splice(index, 1);
    };
  }

  resetCallIndex() {
    this._callIndex = _CALL_INDEX_INITIAL_VALUE;
  }

  private incrementCallIndex() {
    this._callIndex++;
  }

  private render() {
    this.updateHandlers.forEach((handler) => handler());
  }
}

export function state<T>(initialValue: T) {
  const manager = LocalStateManager.instance();

  if (!manager) {
    throw new Error('Cannot create local state before app initialization');
  }

  const index = manager.setInitialState<T>(initialValue);
  return [manager.getState<T>(index), manager.createStateSetter<T>(index)];
}
