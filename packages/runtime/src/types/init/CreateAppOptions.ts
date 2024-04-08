import { ComponentClass } from '~types/component/ComponentClass';
import { ReducerFunction } from '~types/state/ReducerFunction';

export interface CreateAppOptions<TState = unknown> {
  state?: TState;
  reducers?: Record<string, ReducerFunction<TState>>;
  view: ComponentClass<any>;
}
