# Small Frontend Framework Core

This package contains the core functionality provided by the SFF library as well as its detailed overview.

- [`createApp()` function](#createapp-function)
- [Main building blocks or HyperScript](#main-building-blocks-or-_hyperscript_)
- [Components](#components)
  - [Component's props](#components-props)
  - [Component's local state](#components-local-state)
  - [Component's lifecycle](#components-lifecycle)
- [Global state](#global-state)
- [Router](#router)
- [Styles](#styles)


## Core features
### `createApp()` function
Once you initialized your first SFF app, after navigating to `src/main.ts` file you'll see the following line:
```js
createApp(App).mount(document.getElementById('app'));
```
This is the entry point of your app.
\
The `createApp()` function can take two parameters:
the `RootComponent` (called `App` in our example) and the optional config object,
where you can describe your global state management rules.
\
For more info on the global state management refer to [this section](#global-state).
\
`createApp()` returns the `App` instance (don't mix up with the root component's name!) that exposes a single method -
`mount()`.
You can use this method to, well, _mount_ your app into the real DOM in your browser.
The `mount()` method accepts a single parameter — the DOM node to mount your components into.

### Main building blocks or _HyperScript_
The SFF uses a special set of functions to describe the components structure — the HypeScript functions.
HyperScript, in this case, means that these functions create Virtual DOM nodes.
A list of the available functions is pretty short and simple as it contains only two of them:
- `h()`
- `fragment()`

`h()` accepts either a class component or a string as its first parameter.
If a string is provided then `h()` tries to create a corresponding HTML element from it.
For example, `h("div")` will create a `div` container.
The second parameter — optional components props / HTML elements attributes. The third one —
optional array of children.
You can also pass a single node instead of an array.
\
`fragment()` is even simpler as it accepts a single parameter — an array of nodes / a single node.
It serves as a container that can bind together multiple nodes without reflecting it
(i.e., w/o creating an HTML element) in the real DOM.

See the usage examples of these functions in the [Components section](#components) of this doc.

### Components
To create your own components, you have to use the `Component` class.

```typescript
import { Component } from "@sff-ui/core";

export class MyComponent extends Component {}
```

The component above is not very useful as it doesn't _render_ anything.
So let's add the `render()` to it.
This method is special since it contains the components' structure — what will be created in the browser's DOM.
Moreover, you are required to implement it to define a component.

```typescript
import { Component, h, fragment } from "@sff-ui/core";

export class MyComponent extends Component {
  handleClick = () => console.log("Clicked!");
  
  render() {
    return fragment([
      h("div", {}, "Hello, World!"),
      h("button", { on: { click: this.handleClick } }, "Click me!")
    ]);
  }
}

createApp(MyComponent).mount(document.getElementById('app'));
```

In the example above, we created a component that renders a "Hello, World!" message along with a button,
that, when clicked, logs "Clicked!" to the console.

#### Component's props
Every component can receive a set of external values from the parent components - `props`.
To define the names and types of the available `props` you need
to pass a generic parameter into the `Component` class like this:

```typescript
import { Component } from "@sff-ui/core";

interface MyComponentProps {
  foo: string;
  bar: number;
}

export class MyComponent extends Component<MyComponentProps> {
  render() { return null; }
}
```

After that,
you will be able to use these values inside your component via built-in `props` object
as well as pass them from the parent components:

```typescript
import { Component } from "@sff-ui/core";

interface MyComponentProps {
  foo: string;
  bar: number;
}

export class MyComponent extends Component<MyComponentProps> {
  render() {
    return h("div", {}, `${this.props.foo} ${this.props.bar}`);
  }
}

export class App extends Component {
  render() {
    return h(MyComponent, { foo: 'foo', bar: 42 })
  }
}

createApp(App).mount(document.getElementById('app'));
```

#### Component's local state
Every component has its own local state.
By default, it's set to an empty object (`{}`) and is accessible through `this.state` property.
To change the state, you can use a built-in method `setState()`, which accepts a new state object.
You can also define a type of your state by overriding the derived state property.
```typescript
import { Component, h, fragment } from "@sff-ui/core";

interface CounterState {
  count: number;
}

export class Counter extends Component {
  state: CounterState = { count: 0 };
  
  inc = () => this.setState({ count: this.state.count + 1 });
  dec = () => this.setState({ count: this.state.count - 1 });
  
  render() {
    return fragment([
      h("button", { on: { click: this.dec } }, "-"),
      h("div", {}, this.state.count),
      h("button", { on: { click: this.inc } }, "+"),
    ]);
  }
}

createApp(Counter).mount(document.getElementById('app'));
```

Above, we implemented a simple Counter app using component's local state.

#### Component's lifecycle
Each component has a set of built-in methods that are fired on the certain phases of the component's life.
These methods are called _lifecycle methods_.
SFF provides three of them:
- `afterMount()`
- `afterUpdate()`
- `beforeUnmount()`

`afterMount()` is called only once right after the component has been mounted into the browser's DOM.
It's an ideal place to set your event listeners and do network requests.
\
`afterUpdate()` is called everytime when:
- parent component is updated (re-rendered)
- local state changes
- component's props change

To avoid unnecessary re-renders on parent component's updates, you can use `useMemo()` method.
\
<ins>Note: be sure to call it inside a constructor to avoid unexpected results!</ins>
```typescript
import { Component } from "@sff-ui/core";

export class MyComponent extends Component<MyComponentProps> {
  constructor() {
    super();
    this.useMemo();
  }

  render() {
    return null;
  }
}
```
`beforeUnmount()` is called right before the component is going to be removed from the DOM.
It's an ideal place to unsubscribe from the event listeners you've set up in `afterMount()`.

### Global state
To add global state to your app, you need to pass the corresponding configuration into `createApp()` function.

```typescript
interface GlobalState {
  foo: string;
  bar: number;
}

createApp<App, GlobalState>(App, {
  state: { foo: 'foo', bar: 42 },
  reducers: {
    setFoo: (state, payload: string) => ({ ...state, foo: payload }),
    setBar: (state, payload: number) => ({ ...state, bar: payload }),
  },
});

createApp(App).mount(document.getElementById('app'));
```

Then, inside a component you can `dispatch()` your actions via `this.props.store` property.
The global store data is accessible via `this.props.store.data`.

```typescript
import { Component } from "@sff-ui/core";

export class MyComponent extends Component {
  afterMount() {
    this.props.store.dispatch('setFoo', 'foo2');
    this.props.store.dispatch('setBar', 99);
  }
  
  afterUpdate() {
    const { foo, bar } = this.props.store.data;
    console.log(foo, bar);
  }
  
  render() {
    return null;
  }
}
```

### Router
Example of `Router` usage.

```typescript
import { Link, h, createApp } from "@sff-ui/core";

class Navbar extends Component {
  render() {
    return h('div', {}, [
      h(Link, { to: '/' }, 'Homepage'),
      h(Link, { to: '/about' }, 'About'),
      h(Link, { to: '/contact-us' }, 'Contact us'),
    ])
  }
}

class Footer extends Component {
  render() {
    return null;
  }
}

class Homepage extends Component {
  render() {
    return null;
  }
}

class About extends Component {
  render() {
    return null;
  }
}

class ContactUs extends Component {
  render() {
    return null;
  }
}

export class App extends Component {
  render() {
    return h(Router, {}, [
      h(Navbar),
      h(Route, {to: '/'}, h(Homepage)),
      h(Route, {to: '/about'}, h(About)),
      h(Route, {to: '/contact-us'}, h(ContactUs)),
      h(Footer),
    ]);
  }
}

createApp(App).mount(document.getElementById('app'));
```

### Styles
To apply styles to your components, just import CSS file at the top of your component source file.

```css
/* style.css */

.content {
    display: flex;
    height: 100%;
    background-color: red;
}
```

```typescript
import "./style.css";
import { h } from "@sff-ui/core";

class Homepage extends Component {
  render() {
    return h('div', { className: 'content' });
  }
}
```