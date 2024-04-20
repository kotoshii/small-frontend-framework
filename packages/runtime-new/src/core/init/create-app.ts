import { Component } from '~core/components/component';
import { App } from '~core/init/app';
import { CreateAppOptions } from '~core/init/types/CreateAppOptions';

export function createApp<RootComponent extends Component>(
  options: CreateAppOptions<RootComponent>,
) {
  return new App(options);
}
