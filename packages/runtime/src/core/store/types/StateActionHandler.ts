export type StateActionHandler<TPayload = unknown> = (
  payload: TPayload,
) => void;
