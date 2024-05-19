---
title: Props
description: A guide to React Props
---

Props (short for "properties") are a fundamental concept in React. They allow you to pass data from a parent component to a child component, making your components dynamic and reusable. This guide will provide a comprehensive, beginner-friendly explanation of props, with code snippets and examples to help you understand how they work.

### 1. What Are Props?

Props are read-only inputs to components. They are used to pass data and event handlers down from parent components to child components. Props make it possible to create dynamic and reusable components.

### 2. Passing Props to Functional Components

#### Example:

```jsx
import React from "react";

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Greeting name="Charlie" />
    </div>
  );
}

export default App;
```

**Explanation:**

- The `Greeting` component is a functional component that accepts `props` as an argument.
- The `App` component passes the `name` prop to the `Greeting` component.
- Each `Greeting` component instance receives a different `name` prop value and renders a personalized greeting.

### 3. Passing Props to Class Components

#### Example:

```jsx
import React, { Component } from "react";

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Greeting name="Alice" />
        <Greeting name="Bob" />
        <Greeting name="Charlie" />
      </div>
    );
  }
}

export default App;
```

**Explanation:**

- The `Greeting` class component accesses props via `this.props`.
- The `App` class component passes the `name` prop to each `Greeting` component instance.

### 4. Default Props

You can define default prop values for your components using the `defaultProps` property. This is useful when you want to ensure a prop has a value even if it is not provided by the parent component.

#### Example:

```jsx
import React from "react";

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

Greeting.defaultProps = {
  name: "Guest",
};

function App() {
  return (
    <div>
      <Greeting />
      <Greeting name="Alice" />
    </div>
  );
}

export default App;
```

**Explanation:**

- If the `name` prop is not provided, the `Greeting` component will use the default value `'Guest'`.

### 5. Prop Types

Prop types are used to specify the expected data type for each prop. This helps catch bugs by ensuring that components receive the correct type of props.

#### Example:

```jsx
import React from "react";
import PropTypes from "prop-types";

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

function App() {
  return (
    <div>
      <Greeting name="Alice" />
      {/* <Greeting /> Uncommenting this line will cause a warning */}
    </div>
  );
}

export default App;
```

**Explanation:**

- The `Greeting` component expects a `name` prop of type `string`.
- If the `name` prop is not provided or is of the wrong type, React will log a warning in the console.

### 6. Passing Functions as Props

Props can also be used to pass functions to child components, allowing the child to communicate with the parent or to handle events.

#### Example:

```jsx
import React, { useState } from "react";

function Button(props) {
  return <button onClick={props.onClick}>Click me</button>;
}

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Button clicked {count} times</p>
      <Button onClick={handleClick} />
    </div>
  );
}

export default App;
```

**Explanation:**

- The `Button` component receives an `onClick` prop and uses it as an event handler.
- The `App` component defines the `handleClick` function and passes it to the `Button` component.
- When the button is clicked, the `handleClick` function increments the `count` state in the `App` component.

### 7. Passing Complex Data as Props

Props can be used to pass more complex data structures, such as objects and arrays, to components.

#### Example:

```jsx
import React from "react";

function UserProfile(props) {
  return (
    <div>
      <h2>{props.user.name}</h2>
      <p>Age: {props.user.age}</p>
      <p>Location: {props.user.location}</p>
    </div>
  );
}

function App() {
  const user = {
    name: "Alice",
    age: 25,
    location: "New York",
  };

  return (
    <div>
      <UserProfile user={user} />
    </div>
  );
}

export default App;
```

**Explanation:**

- The `UserProfile` component receives a `user` object as a prop.
- The `App` component defines a `user` object and passes it to the `UserProfile` component.

### 8. Children Props

The `children` prop is a special prop that allows you to pass nested elements directly into a component.

#### Example:

```jsx
import React from "react";

function Card(props) {
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <div className="content">{props.children}</div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Card title="Card 1">
        <p>This is the content of Card 1.</p>
      </Card>
      <Card title="Card 2">
        <p>This is the content of Card 2.</p>
      </Card>
    </div>
  );
}

export default App;
```

**Explanation:**

- The `Card` component renders its `title` prop and any nested elements passed as `props.children`.
- The `App` component uses the `Card` component and passes different nested content to each `Card` instance.

### Conclusion

Props are a powerful feature in React that allow you to pass data and functions between components, making your application dynamic and reusable. Understanding how to use props effectively is essential for building robust React applications. This guide provides a detailed overview of props, with examples to illustrate key concepts.
