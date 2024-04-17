import { Component } from '~core/components/component';
import { ComponentClass } from '~types/components/ComponentClass';
import { ReducerFunction } from '~types/state/ReducerFunction';

export interface CreateAppOptions<State, RootComponent extends Component> {
  state?: State;
  reducers?: Record<string, ReducerFunction<State>>;
  view: ComponentClass<RootComponent>;
}
