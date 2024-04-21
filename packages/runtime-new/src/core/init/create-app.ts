import { Component } from '~core/components/component';
import { App } from '~core/init/app';
import { CreateAppOptions } from '~core/init/types/CreateAppOptions';

export function createApp<RootComponent extends Component, State = unknown>(
  options: CreateAppOptions<RootComponent, State>,
) {
  return new App(options);
}
