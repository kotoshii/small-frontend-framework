import { ReducerFunction } from '~core/store/types/ReducerFunction';

export type ReducerPayload<
  State,
  Func extends ReducerFunction<State>,
> = Parameters<Func>[1];
