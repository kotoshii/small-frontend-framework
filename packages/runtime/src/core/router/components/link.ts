import { Component } from '~core/components/component';
import { h } from '~core/vdom/h';

interface LinkProps {
  to: string;
}

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
