export type EventBusListener = (payload?: any) => Promise<void> | void;
