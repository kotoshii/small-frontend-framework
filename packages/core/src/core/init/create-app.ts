import { Component } from '~core/components/component';
import { ComponentClass } from '~core/components/types/ComponentClass';
import { App } from '~core/init/app';
import { CreateAppOptions } from '~core/init/types/CreateAppOptions';

/**
 * Serves as an entry point of the app.
 * Creates and returns the App instance
 * which then can be used to mount the component hierarchy into the DOM via its `mount()`
 * method.
 * Refer to the official docs for the usage details.
 * */
export function createApp<
  RootComponent extends Component,
  State extends object = object,
>(view: ComponentClass<RootComponent>, options?: CreateAppOptions<State>) {
  return new App<RootComponent, State>(view, options);
}
