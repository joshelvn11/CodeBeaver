---
title: State
---

State is a fundamental concept in React that allows components to manage and respond to changes in data over time.

State is a powerful feature in React that allows components to manage dynamic data and respond to user interactions. Understanding how to use state in both class and functional components, update state based on previous state, and manage side effects with lifecycle methods and hooks is crucial for building interactive React applications.

## 1. What is State?

State is an object that holds data that can change over the lifetime of a component. Unlike props, which are read-only and passed down from parent to child, state is local to the component and can be updated within the component.

## 2. Using State in Class Components

### 2.1 Initialising State

In class components, state is initialized using a constructor method

```jsx
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button>Increment</button>
      </div>
    );
  }
}

export default Counter;
```

### 2.2 Updating State

To update the state, you use the `this.setState` method. This method schedules an update to the component's state object and tells React to re-render the component with the updated state.

As a parameter to the `setState` method a new state object is passed with that includes the properties of the state that need to be updated with their updated values.

```jsx
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = { count: 0 };
  }

  // Method to increment the count
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

#### 2.2.1 Updating State Based on Previous State

Below is the correct way to update state based on the previous state of the component.

```jsx
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  incrementTwice = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementTwice}>Increment Twice</button>
      </div>
    );
  }
}

export default Counter;
```

`prevState` or `prevCount`: The updater function receives the latest state (`prevState` or `prevCount`) at the time of the update, ensuring that each state change is based on the most recent state. Each `setState` or `setCount` call processes in the correct order with the correct state, ensuring consistent and expected state updates even when multiple updates are batched together.

Using the functional form of state updates is crucial when the new state depends on the previous state. It ensures that your state updates are accurate and reliable, especially in asynchronous and batched environments that React uses for performance optimization.

#### 2.2.2 Running Code After A State Update

To execute code immediately after the state has been updated, you should use a callback function as a second parameter in the `setState` method. This is necessary because `setState` operates asynchronously. If you attempt to execute code right after calling `setState` without a callback, it may access stale state values, not the updated ones.

```jsx
// Method to increment the count
increment = () => {
  this.setState({ count: this.state.count + 1 }, () => {
    // Code executed in the callback function
    console.log(this.state.count);
  });
};
```

## 3. Using State in Functional Components

### 3.1 Initializing State

In functional components, the `useState` hook is used to add state. Hooks are a new addition in React 16.8 that allow you to use state and other React features without writing a class.

#### Example:

```jsx
import React, { useState } from "react";

function Counter() {
  // Declare state variable
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

**Explanation:**

- The `useState` hook declares a state variable `count` and a function `setCount` to update it.
- The `useState` function takes the initial state as an argument (`0` in this case) and returns an array containing the current state and the function to update it.
- When the button is clicked, the `setCount` function updates the `count` state, causing the component to re-render with the new count.

### 3.2 Updating State

In React functional components, state is managed using the `useState` hook. The `useState` hook allows you to add state to functional components and provides a way to update this state.

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // Initializing state with a value of 0

  const increment = () => {
    setCount(count + 1); // Updating state
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
```

To update state, you call the state updater function returned by `useState` (in this case, `setCount`). You can pass either a new state value or a function that takes the previous state as an argument and returns the new state.

#### 3.2.2 Updating State Based on Previous State

Below is the correct way to update state based on the previous state of the component.

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const incrementTwice = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementTwice}>Increment Twice</button>
    </div>
  );
}

export default Counter;
```

### 3.3 Handling Multiple State Variables

You can manage multiple state variables by calling `useState` multiple times in a functional component.

#### Example:

```jsx
import React, { useState } from "react";

function UserInfo() {
  // Declare multiple state variables
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter your age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <p>
        Name: {name}, Age: {age}
      </p>
    </div>
  );
}

export default UserInfo;
```

**Explanation:**

- Two state variables `name` and `age` are declared using `useState`.
- Input fields are used to update the state variables via the `onChange` event handlers.
- The state variables are displayed in a paragraph element.

### 3.4 Initial State and Lazy Initialization

The initial state in `useState` can be set directly or lazily. Lazy initialization is useful when computing the initial state is expensive.

#### Example of Lazy Initialization:

```jsx
import React, { useState } from "react";

function computeInitialState() {
  // Simulate expensive computation
  return { count: 0 };
}

function Counter() {
  // Use lazy initialization for state
  const [state, setState] = useState(() => computeInitialState());

  const increment = () => {
    setState({ count: state.count + 1 });
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
```

**Explanation:**

- The `useState` hook is called with a function (`computeInitialState`) that returns the initial state. This function is executed only once, making it efficient for expensive computations.
