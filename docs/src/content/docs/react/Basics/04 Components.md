---
title: Components
description: A guide to React Components
---

React components are the foundational building blocks of a React application. They allow you to build reusable, self-contained pieces of the UI. This guide will cover everything you need to know about React components, including functional and class components, props, state, lifecycle methods, and event handling.

### 1. What is a Component?

A component in React is a JavaScript function or class that optionally accepts inputs (known as props) and returns a React element that describes how a section of the UI should appear.

### 2. Types of Components

There are two main types of components in React:

- **Functional Components**
- **Class Components**

### 3. Functional Components

Functional components are simple JavaScript functions that accept props (properties) as an argument and return React elements. They are also known as stateless components.

#### Example:

```jsx
import React from "react";

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Welcome;
```

**Explanation:** The `Welcome` component is a functional component that takes `props` and returns an `h1` element with a greeting message.

### 4. Class Components

Class components are more feature-rich than functional components. They can have their own state and lifecycle methods. Class components are created using ES6 classes.

#### Example:

```jsx
import React, { Component } from "react";

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default Welcome;
```

**Explanation:** The `Welcome` component is a class component that extends `React.Component`. It uses the `render` method to return an `h1` element with a greeting message.

### 5. Props

Props (short for properties) are read-only inputs passed to components. They allow you to pass data from a parent component to a child component.

#### Example:

```jsx
import React from "react";
import ReactDOM from "react-dom";

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

**Explanation:** The `App` component renders three `Welcome` components with different `name` props.

### 6. State

State is a built-in object that allows components to create and manage their own data. Unlike props, state is mutable and can be changed over time, usually in response to user actions.

#### Using State in Class Components:

```jsx
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```

**Explanation:** The `Counter` class component has a state object with a `count` property. The `increment` method updates the state using `setState`.

#### Using State in Functional Components with Hooks:

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

**Explanation:** The `Counter` functional component uses the `useState` hook to manage the state. `useState` returns an array with two elements: the current state and a function to update it.

### 7. Lifecycle Methods

Lifecycle methods are special methods in class components that allow you to run code at specific times in the component’s lifecycle (e.g., when the component mounts or unmounts).

#### Common Lifecycle Methods:

- `componentDidMount`: Called after the component is mounted (inserted into the DOM).
- `componentDidUpdate`: Called after the component updates.
- `componentWillUnmount`: Called before the component unmounts (removed from the DOM).

#### Example:

```jsx
import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock;
```

**Explanation:** The `Clock` component sets up a timer in `componentDidMount` and clears it in `componentWillUnmount`. The `tick` method updates the component’s state every second.

### 8. Handling Events

Handling events in React is similar to handling events in regular HTML. However, there are some syntactic differences.

#### Example:

```jsx
import React from "react";

function Toggle() {
  const [isToggleOn, setToggle] = React.useState(true);

  function handleClick() {
    setToggle(!isToggleOn);
  }

  return <button onClick={handleClick}>{isToggleOn ? "ON" : "OFF"}</button>;
}

export default Toggle;
```

**Explanation:** The `Toggle` component handles a button click event by toggling the state between `true` and `false`.

### 9. Composition

Composition is the practice of combining multiple components to create a more complex UI. This is one of React's most powerful features.

#### Example:

```jsx
import React from "react";

function Dialog(props) {
  return (
    <div className="dialog">
      <h1>{props.title}</h1>
      <p>{props.message}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Dialog title="Welcome" message="Thank you for visiting our site!" />
      <Dialog title="Goodbye" message="Hope to see you again!" />
    </div>
  );
}

export default App;
```

**Explanation:** The `App` component uses the `Dialog` component twice with different props to display different messages.

### 10. Using Fragments

React Fragments allow you to group multiple elements without adding extra nodes to the DOM.

#### Example:

```jsx
import React from "react";

function App() {
  return (
    <>
      <h1>Hello, world!</h1>
      <p>This is a paragraph.</p>
    </>
  );
}

export default App;
```

**Explanation:** Fragments are useful when you need to return multiple elements from a component without adding extra DOM nodes.

### Conclusion

React components are the fundamental building blocks of a React application. Understanding the different types of components, how to manage state and props, handle events, use lifecycle methods, and compose components is crucial for building efficient and scalable React applications. This guide provides a high-level overview to help you get started with React components, with examples to illustrate key concepts.
