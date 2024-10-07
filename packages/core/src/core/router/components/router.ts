import { Component } from '~core/components/component';
import { hFragment } from '~core/vdom/h';

export class Router extends Component {
  afterMount() {
    this.props.router.setRouterComponent(this);
  }

  beforeUnmount() {
    this.props.router.setRouterComponent(null);
  }

  render() {
    return hFragment(this.props.children);
  }
}
