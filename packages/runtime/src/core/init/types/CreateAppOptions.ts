import { ReducerFunction } from '~core/store/types/ReducerFunction';

export interface CreateAppOptions<State = unknown> {
  state?: State;
  reducers?: Record<string, ReducerFunction<State>>;
}
