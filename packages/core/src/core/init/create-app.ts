import { Component } from '~core/components/component';
import { ComponentClass } from '~core/components/types/ComponentClass';
import { App } from '~core/init/app';
import { CreateAppOptions } from '~core/init/types/CreateAppOptions';

export function createApp<
  RootComponent extends Component,
  State extends object = object,
>(view: ComponentClass<RootComponent>, options?: CreateAppOptions<State>) {
  return new App<RootComponent, State>(view, options);
}
