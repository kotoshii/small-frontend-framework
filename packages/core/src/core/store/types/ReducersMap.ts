import { ReducerFunction } from '~core/store/types/ReducerFunction';

export type ReducersMap<State> = {
  [p: string]: ReducerFunction<State>;
};
