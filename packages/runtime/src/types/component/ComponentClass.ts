import { Component } from '~core/component';

export interface ComponentClass<T extends Component> {
  new (props?: T['props']): T;
}
