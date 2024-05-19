---
title: State
---

State is a fundamental concept in React that allows components to manage and respond to changes in data over time. This guide provides a comprehensive, beginner-friendly explanation of state, with code snippets and examples to help you understand how it works.

### 1. What is State?

State is an object that holds data that can change over the lifetime of a component. Unlike props, which are read-only and passed down from parent to child, state is local to the component and can be updated within the component.

### 2. Using State in Class Components

In class components, state is initialized in the constructor and updated using the `setState` method.

#### Example:

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

**Explanation:**

- The `Counter` class component initializes state with `count: 0` in the constructor.
- The `increment` method updates the state using `setState`.
- When the button is clicked, the `increment` method is called, updating the `count` state and causing the component to re-render with the new count.

### 3. Using State in Functional Components with Hooks

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

### 4. Handling Multiple State Variables

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

### 5. Initial State and Lazy Initialization

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

### 6. Updating State Based on Previous State

When updating state based on the previous state, use the functional form of `setState` in class components or the updater function in `useState` for functional components.

#### Example with Class Components:

```jsx
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
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

**Explanation:**

- The `increment` method uses the functional form of `setState` to ensure it correctly updates the state based on the previous state.

#### Example with Functional Components:

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
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

**Explanation:**

- The `increment` function uses the updater function in `setCount` to ensure it correctly updates the state based on the previous state.

### 7. State and Lifecycle in Class Components

State is often used with lifecycle methods in class components to perform actions when a component mounts, updates, or unmounts.

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

  tick = () => {
    this.setState({ date: new Date() });
  };

  render() {
    return (
      <div>
        <h1>Current time: {this.state.date.toLocaleTimeString()}</h1>
      </div>
    );
  }
}

export default Clock;
```

**Explanation:**

- The `Clock` component sets up a timer in `componentDidMount` and clears it in `componentWillUnmount`.
- The `tick` method updates the `date` state every second, causing the component to re-render with the updated time.

### 8. State in Functional Components with `useEffect`

The `useEffect` hook lets you perform side effects in functional components, similar to lifecycle methods in class components.

#### Example:

```jsx
import React, { useState, useEffect } from "react";

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setDate(new Date()), 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
      <h1>Current time: {date.toLocaleTimeString()}</h1>
    </div>
  );
}

export default Clock;
```

**Explanation:**

- The `useEffect` hook sets up the timer when the component mounts and cleans it up when the component unmounts.
- The `setDate` function updates the `date` state every second, causing the component to re-render with the updated time.

### Conclusion

State is a powerful feature in React that allows components to manage dynamic data and respond to user interactions. Understanding how to use state in both class and functional components, update state based on previous state, and manage side effects with lifecycle methods and hooks is crucial for building interactive React applications. This guide provides a detailed overview of state, with examples to illustrate key concepts.
