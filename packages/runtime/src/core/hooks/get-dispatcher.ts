import { Dispatcher } from '~core/state/dispatcher';

export function getDispatcher() {
  const instance = Dispatcher.instance();

  if (!instance) {
    throw new Error(
      'Cannot use getDispatcher() hook before app initialization',
    );
  }

  return instance;
}
