import { Component } from '~core/components/component';

export type ComponentClass<T extends Component> = {
  new (props: T['props']): T;
};
