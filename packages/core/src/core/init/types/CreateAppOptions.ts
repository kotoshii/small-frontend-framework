import { ReducersMap } from '~core/store/types/ReducersMap';

export interface CreateAppOptions<State extends object> {
  state?: State;
  reducers?: ReducersMap<State>;
}
