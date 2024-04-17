import { Component } from '~core/components/component';
import { SffApp } from '~core/init/sff-app';
import { CreateAppOptions } from '~types/init/CreateAppOptions';

export function createApp<State, RootComponent extends Component>(
  options: CreateAppOptions<State, RootComponent>,
) {
  return new SffApp(options);
}
