/*
 * TODO:
 *   1. Class component full support
 *   2. Lifecycle methods
 *   3. Optimizations: re-render custom components only if props and state has changed (optional)
 *   4. Router
 *   5. Improve typings
 *
 * */

import { hElement, hFragment } from '~core/vdom/h';

const vnode = hFragment([
  hElement('h1', { style: { fontSize: '100px' } }, ['Hello!!!']),
  hElement('p', {}, ['Some description text lalalaala!!!']),
  hElement('div', {}, [
    hElement('button', { on: { click: () => {} } }, ['Click me!']),
  ]),
]);

console.dir(vnode, { depth: null });
