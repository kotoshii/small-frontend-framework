import './counter.css';

import { Component, h } from '@sff-ui/core';

interface CounterState {
  count: number;
}

export class Counter extends Component {
  state: CounterState = { count: 0 };

  inc = () => {
    this.setState({ count: this.state.count + 1 });
  };

  dec = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return h('div', { className: 'counter-wrapper' }, [
      h(
        'button',
        { on: { click: this.dec }, className: 'counter-button' },
        '-',
      ),
      h('span', { className: 'counter-value' }, this.state.count),
      h(
        'button',
        { on: { click: this.inc }, className: 'counter-button' },
        '+',
      ),
    ]);
  }
}
