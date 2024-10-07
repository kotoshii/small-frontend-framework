import { Component } from '~core/components/component';
import { RouteNavigator } from '~core/router/route-navigator';
import { Store } from '~core/store/store';
import { SFFNode } from '~core/vdom/types/SFFNode';

type DefaultComponentProps<
  TGlobalState extends object = object,
  TReducersPayloadMap = Record<string, unknown>,
> = {
  children: SFFNode[];
  store: Store<TGlobalState, TReducersPayloadMap>;
  router: RouteNavigator;
};

type OptionalComponentProps = { key?: string | number };

export type PropsWithoutDefault<T extends Component> = Omit<
  T['props'],
  keyof DefaultComponentProps
>;

export type ComponentProps<
  TProps,
  TGlobalState extends object = object,
  TReducersPayloadMap = Record<string, unknown>,
> = TProps &
  DefaultComponentProps<TGlobalState, TReducersPayloadMap> &
  OptionalComponentProps;
