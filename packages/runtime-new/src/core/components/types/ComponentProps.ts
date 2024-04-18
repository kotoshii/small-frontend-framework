import { Component } from '~core/components/component';

type DefaultComponentProps = {};

export type PropsWithoutDefault<T extends Component> = Omit<
  T['props'],
  keyof DefaultComponentProps
>;

export type ComponentProps<T> = T & DefaultComponentProps;
