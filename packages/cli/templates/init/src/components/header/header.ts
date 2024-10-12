import './header.css';

import { Component, h } from '@sff-ui/core';

export class Header extends Component {
  render() {
    return h('div', {}, [
      h('h1', {}, 'SFF - Small Frontend Framework'),
      h('div', { className: 'header__links-wrapper' }, [
        h(
          'a',
          { href: 'https://github.com/kotoshii/small-frontend-framework' },
          'GitHub',
        ),
        h('a', { href: 'https://www.npmjs.com/package/@sff-ui/core' }, 'NPM'),
        h(
          'a',
          { href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          'YouTube',
        ),
      ]),
    ]);
  }
}
