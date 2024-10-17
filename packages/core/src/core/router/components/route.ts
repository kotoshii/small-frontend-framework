import { Component } from '~core/components/component';
import { hFragment } from '~core/vdom/h';

interface RouteProps {
  to: string;
}

/**
 * Describes a `Router`'s route.
 * Refer to the official docs for the usage details.
 * */
export class Route extends Component<RouteProps> {
  render() {
    const { to, children, router } = this.props;
    const currentPath = router.getCurrentPath();

    if (currentPath === to) {
      return hFragment(children);
    }

    return null;
  }
}
