/*
 * TODO:
 *   1. Class component full support
 *   2. Lifecycle methods
 *   3. Optimizations: re-render custom components only if props and state has changed (optional)
 *   4. Router
 *   5. Improve typings
 *
 * */

import { Component } from '~core/components/component';
import { mount } from '~core/render/mount';
import { hComponent, hElement, hFragment } from '~core/vdom/h';

export { hElement, hFragment, mount };

class Header extends Component {
  render() {
    return hElement('div', {}, [
      hElement('p', {}, ['Home']),
      hElement('p', {}, ['News']),
      hElement('p', {}, ['About']),
    ]);
  }
}

class App extends Component {
  render() {
    return hElement('div', {}, hComponent(Header, { foo: 1 }, ['Test child']));
  }
}

const vnode = hComponent(App, {}, [
  hFragment(['ffffff']),
  hElement('h1', { style: { fontSize: '100px' } }, ['Hello!!!']),
  hElement('p', {}, ['Some description text lalalaala!!!']),
  hElement('div', {}, [
    hElement('button', { on: { click: () => {} } }, ['Click me!']),
  ]),
  null,
  'string',
  123,
]);

console.dir(vnode, { depth: null });
