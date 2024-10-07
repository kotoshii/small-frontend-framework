export type EventBusListener = (payload?: unknown) => Promise<void> | void;
