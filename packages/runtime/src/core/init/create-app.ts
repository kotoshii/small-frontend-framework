import { SffApp } from '~core/init/sff-app';
import { CreateAppOptions } from '~types/CreateAppOptions';

export function createApp(options: CreateAppOptions) {
  return new SffApp(options);
}
