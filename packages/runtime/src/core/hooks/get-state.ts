import { GlobalState } from '~core/state/global-state';

export function getState() {
  const instance = GlobalState.instance();

  if (!instance) {
    throw new Error('Cannot use getState() hook before app initialization');
  }

  return instance.get();
}
