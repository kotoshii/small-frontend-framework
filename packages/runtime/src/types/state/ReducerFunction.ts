export type ReducerFunction<TState = unknown, TPayload = unknown> = (
  state: TState,
  payload: TPayload,
) => TState;
