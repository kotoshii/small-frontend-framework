import { Component } from '~core/components/component';
import { SFFNode } from '~core/vdom/types/SFFNode';

type DefaultComponentProps = { children: SFFNode[] };

type OptionalComponentProps = { key?: string | number };

export type PropsWithoutDefault<T extends Component> = Omit<
  T['props'],
  keyof DefaultComponentProps
>;

export type ComponentProps<T> = T &
  DefaultComponentProps &
  OptionalComponentProps;
