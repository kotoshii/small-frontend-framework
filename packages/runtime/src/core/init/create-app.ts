import { SffApp } from '~core/init/sff-app';
import { CreateAppOptions } from '~types/init/CreateAppOptions';

export function createApp(options: CreateAppOptions) {
  return new SffApp(options);
}
