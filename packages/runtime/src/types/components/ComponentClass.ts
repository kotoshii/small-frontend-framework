import { Component } from '~core/components/component';

export interface ComponentClass<T extends Component> {
  new (props: T['props']): T;
}
