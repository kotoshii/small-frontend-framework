import { Component } from '~core/components/component';
import { RouteNavigator } from '~core/router/route-navigator';
import { Store } from '~core/store/store';
import { SFFNode } from '~core/vdom/types/SFFNode';

type DefaultComponentProps = {
  children: SFFNode[];
  store: Store;
  router: RouteNavigator;
};

type OptionalComponentProps = { key?: string | number };

export type PropsWithoutDefault<T extends Component> = Omit<
  T['props'],
  keyof DefaultComponentProps
>;

export type ComponentProps<T> = T &
  DefaultComponentProps &
  OptionalComponentProps;
