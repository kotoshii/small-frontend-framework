import { mountDOM } from '~core/dom/mount-dom';
import { textNode } from '~core/h';
import { DefaultComponentProps } from '~types/components/DefaultComponentProps';
import { SFFElement } from '~types/vdom/SFFElement';

export abstract class Component<
  TProps = DefaultComponentProps,
  TState = unknown,
> {
  private isMounted = false;
  private vdom: SFFElement | null = null;
  private hostElement: HTMLElement | null = null;

  readonly props: DefaultComponentProps<TProps>;
  state?: TState;

  protected constructor(props: TProps) {
    this.props = props as DefaultComponentProps<TProps>;
  }

  protected setState(state: Partial<TState>) {
    if (!this.state) return;
    this.state = { ...this.state, ...state };
  }

  unmount() {
    if (!this.isMounted) {
      throw new Error('Component is not mounted');
    }
  }

  mount(hostElement: HTMLElement, index?: number) {
    if (this.isMounted) {
      throw new Error('Component is already mounted');
    }

    const vdom = this.render();

    if (
      vdom === null ||
      vdom === undefined ||
      vdom === '' ||
      typeof vdom === 'boolean'
    )
      return;

    this.vdom = vdom;
    this.hostElement = hostElement;

    if (typeof vdom === 'string' || typeof vdom === 'number') {
      mountDOM(textNode(vdom), hostElement, index);
    } else {
      mountDOM(vdom, hostElement, index);
    }

    this.isMounted = true;
  }

  afterMount() {}
  afterUpdate() {}
  beforeUnmount() {}

  abstract render(): SFFElement;

  private patchComponent() {}
}
