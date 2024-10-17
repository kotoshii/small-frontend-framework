import { Component } from '~core/components/component';
import { hFragment } from '~core/vdom/h';

/**
 * Used as an entry point to configure routing in the app.
 * Refer to the official docs for the usage details.
 * */
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
