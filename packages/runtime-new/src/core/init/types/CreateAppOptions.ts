import { Component } from '~core/components/component';
import { ComponentClass } from '~core/components/types/ComponentClass';

export interface CreateAppOptions<RootComponent extends Component> {
  view: ComponentClass<RootComponent>;
}
