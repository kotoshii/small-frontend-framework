import { ComponentFunction } from '~types/ComponentFunction';
import { ReducerFunction } from '~types/state/ReducerFunction';

export interface CreateAppOptions<TState = unknown> {
  state?: TState;
  reducers?: Record<string, ReducerFunction<TState>>;
  view: ComponentFunction;
}
