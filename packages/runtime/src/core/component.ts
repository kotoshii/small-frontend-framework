import { InternalEvent } from '~constants/internal-event';
import { SFFVDOMNodeWithChildren } from '~types/vdom/SFFVDOMNode';
import { EventBus } from '~utils/event-bus';

export abstract class Component<TProps = unknown, TState = unknown> {
  private eventBus = EventBus.instance();

  public props: TProps;

  protected constructor(props: TProps) {
    this.props = props;
  }

  abstract state: TState;

  abstract afterMount(): void;
  abstract afterUpdate(): void;
  abstract beforeUnmount(): void;

  abstract render(): SFFVDOMNodeWithChildren;

  protected setState(state: Partial<TState>) {
    if (!this.state) return;
    this.state = { ...this.state, ...state };
    this.eventBus.emit(InternalEvent.RenderVDOM);
  }
}
