import { Component } from '~core/components/component';
import { Store } from '~core/store/store';
import { SFFNode } from '~core/vdom/types/SFFNode';

type DefaultComponentProps = { children: SFFNode[]; store: Store };

type OptionalComponentProps = { key?: string | number };

export type PropsWithoutDefault<T extends Component> = Omit<
  T['props'],
  keyof DefaultComponentProps
>;

export type ComponentProps<T> = T &
  DefaultComponentProps &
  OptionalComponentProps;
