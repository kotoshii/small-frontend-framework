import { Component } from '~core/components/component';
import { h } from '~core/vdom/h';

interface LinkProps {
  to: string;
}

/**
 * Creates a link which then can be used with `Router`.
 * Refer to the official docs for the usage details.
 * */
export class Link extends Component<LinkProps> {
  handleClick = (e: Event) => {
    e.preventDefault();
    this.props.router.navigate(this.props.to);
  };

  render() {
    const { to, children } = this.props;
    return h('a', { href: to, on: { click: this.handleClick } }, children);
  }
}
