import { Component } from '~core/components/component';
import { SFFNode } from '~core/vdom/types/SFFNode';

type DefaultComponentProps = { children: SFFNode[] };

export type PropsWithoutDefault<T extends Component> = Omit<
  T['props'],
  keyof DefaultComponentProps
>;

export type ComponentProps<T> = T & DefaultComponentProps;
