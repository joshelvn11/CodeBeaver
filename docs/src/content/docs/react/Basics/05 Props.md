---
title: Properties
description: A guide to React Props
---

Props (short for "properties") are a fundamental concept in React that enable components to be dynamic and reusable. They are used to pass data from parent components to child components. This guide provides a comprehensive, beginner-friendly explanation of props, with code snippets and examples to illustrate key concepts.

## 1. What Are Props?

Props are read-only attributes used to pass data and event handlers from a parent component to a child component. Props make it possible to create dynamic and reusable components, as they allow each instance of a component to be customized.

## 2. Key Characteristics of Props

1. **Read-Only**: Props cannot be modified by the receiving component. They are immutable.
2. **Data Flow**: Props follow a unidirectional data flow, meaning data is passed from parent to child components.
3. **Customization**: Props allow components to be customized with different values for each instance.

## 3. Basic Usage of Props

Props are passed to a component as attributes, and the component accesses them via the `props` object.

### 3.1 Passing and Using Props

**Parent Component (App):**

```jsx
import React from "react";
import ReactDOM from "react-dom";
import Greeting from "./Greeting";

function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Greeting name="Charlie" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

**Child Component (Greeting):**

```jsx
import React from "react";

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Greeting;
```

**Explanation**

The `App` component renders three instances of the `Greeting` component, each with a different `name` prop.
The `Greeting` component receives `props` as an argument and uses `props.name` to display a personalized greeting.

### 3.2 Default Props

Default props are used to provide default values for props in case they are not supplied by the parent component. This is useful to ensure that a component always has valid props.

```jsx
import React from "react";

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

Greeting.defaultProps = {
  name: "Guest",
};

export default Greeting;
```

**Explanation**

If the `name` prop is not provided, the `Greeting` component will use the default value `'Guest'`.

### 3.3 Prop Types

Prop types are used to enforce type checking on the props that a component receives. This helps catch bugs by ensuring that components receive the correct type of props.

```jsx
import React from "react";
import PropTypes from "prop-types";

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
```

**Explanation**

The `Greeting` component expects a `name` prop of type `string`.
If the `name` prop is not provided or is of the wrong type, React will log a warning in the console.

### 3.3 Passing Functions as Props

Props can also be used to pass functions from parent to child components. This allows the parent component to control the behavior of the child component.

**Parent Component (App):**

```jsx
import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

function App() {
  function handleClick() {
    alert("Button clicked!");
  }

  return (
    <div>
      <Button onClick={handleClick} label="Click Me" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

**Child Component (Button):**

```jsx
import React from "react";

function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}

export default Button;
```

**Explanation**

The `App` component defines a `handleClick` function and passes it to the `Button` component via the `onClick` prop.
The `Button` component receives the `onClick` prop and uses it as an event handler for the `button` element.

### 3.4 Passing Complex Data as Props

Props can be used to pass more complex data structures, such as objects and arrays, to components.

**Parent Component (App):**

```jsx
import React from "react";
import ReactDOM from "react-dom";
import UserProfile from "./UserProfile";

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

ReactDOM.render(<App />, document.getElementById("root"));
```

**Child Component (UserProfile):**

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

export default UserProfile;
```

**Explanation:**

- The `App` component defines a `user` object and passes it to the `UserProfile` component via the `user` prop.
- The `UserProfile` component receives the `user` object and uses its properties to display user information.

### 3.5 Using Children Props

The `children` prop is a special prop that allows you to pass nested elements directly into a component. This is useful for creating reusable container components.

**Parent Component (App):**

```jsx
import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";

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

ReactDOM.render(<App />, document.getElementById("root"));
```

**Child Component (Card):**

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

export default Card;
```

**Explanation**

The `App` component uses the `Card` component and passes different nested content to each `Card` instance via the `children` prop.
The `Card` component renders its `title` prop and any nested elements passed as `props.children`.
