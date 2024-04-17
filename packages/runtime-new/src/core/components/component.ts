import { SFFNode } from '~core/vdom/types/SFFNode';

export abstract class Component {
  abstract render(): SFFNode;
}
