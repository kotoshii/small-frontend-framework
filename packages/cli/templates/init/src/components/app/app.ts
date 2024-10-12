import './app.css';

import { Component, h } from '@sff-ui/core';

import { Counter } from '~components/counter/counter.ts';
import { Header } from '~components/header/header.ts';

export class App extends Component {
  render() {
    return h('div', {}, [h(Header), h(Counter)]);
  }
}
