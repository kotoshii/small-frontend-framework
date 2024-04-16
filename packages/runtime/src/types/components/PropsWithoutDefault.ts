import { Component } from '~core/components/component';
import { DefaultComponentProps } from '~types/components/DefaultComponentProps';

export type PropsWithoutDefault<T extends Component> = Omit<
  T['props'],
  keyof DefaultComponentProps
>;
