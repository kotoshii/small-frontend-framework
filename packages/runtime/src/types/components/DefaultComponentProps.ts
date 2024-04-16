import { Store } from '~core/state/store';
import { SFFElement } from '~types/vdom/SFFElement';

type _DefaultComponentProps = {
  store: Store;
  children: SFFElement[];
};

export type DefaultComponentProps<T = unknown> = T & _DefaultComponentProps;
