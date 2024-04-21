import { Component } from '~core/components/component';
import { ComponentClass } from '~core/components/types/ComponentClass';
import { ReducerFunction } from '~core/store/types/ReducerFunction';

export interface CreateAppOptions<
  RootComponent extends Component,
  State = unknown,
> {
  view: ComponentClass<RootComponent>;
  state?: State;
  reducers?: Record<string, ReducerFunction<State>>;
}
