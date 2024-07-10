---
title: Components
description: A guide to React Components
---

## 1. What is a React Component?

React components are the fundamental building blocks of any React application. They allow developers to break down complex UIs into simpler, reusable, and isolated pieces.

A React component is a self-contained piece of code that defines a part of a user interface. Think of components as Lego blocks; you can build complex structures by combining these small, reusable pieces.

## 2. Why Use Components?

1. **Reusability**: Components can be reused across different parts of an application, reducing the amount of code you have to write and maintain.
2. **Isolation**: Each component operates independently. Changes in one component don't directly affect others, making the application easier to debug and develop.
3. **Composition**: Components can be combined to build complex UIs. A component can include other components as part of its output.

## 3. Component Basics

Every React component has two main parts:

1. **Component Logic**: This part contains the JavaScript code that defines the component’s behavior and data.
2. **Component View**: This part contains the JSX code that defines what the UI should look like.

Here’s a basic example of a React component:

```jsx
import React from "react";

function Greeting() {
  return <h1>Hello, world!</h1>;
}

export default Greeting;
```

**Explanation:**

- `import React from 'react';`: This line imports the React library, which is necessary for creating React components.
- `function Greeting() { ... }`: This defines a functional component named `Greeting`.
- `return <h1>Hello, world!</h1>;`: This specifies the UI that the component renders, which is an `h1` element with the text "Hello, world!".
- `export default Greeting;`: This exports the `Greeting` component so it can be used in other parts of the application.

### 3.1 Types of Components

There are two main types of React components:

1. **Functional Components**: These are simpler and are written as JavaScript functions. They receive data through props and return JSX.
2. **Class Components**: These are more feature-rich and are written as ES6 classes. They can manage their own state and have access to lifecycle methods.

### 3.2 Rendering Components

To render a component, you use the `ReactDOM.render` method. This method takes two arguments:

1. The component to render.
2. The DOM element where the component should be rendered.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

**Explanation:**

- `App` is the root component of the application.
- `ReactDOM.render` renders the `App` component into the DOM element with the id `root`.

### 3.3 Writing & Storing Components

Components are written in .js or .jsx files (or .ts / .tsx for TypeScript) within the `src` directory. It's common to organize components into subdirectories like src/components to keep the codebase manageable.

Components are named using Pascal Case e.g `MyComponent.js`

### 3.4 Using Components

Components can be used by importing them and including them in the JSX of another component.

```jsx
import React from "react";
// Import the component
import Greeting from "./Greeting";

function App() {
  return (
    // Include the component tag
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}

export default App;
```

## 4. Functional Components

Functional components are a fundamental aspect of React, and they provide a straightforward way to define components as functions. They are simpler and often easier to write and understand compared to class components, especially with the introduction of hooks in React 16.8.

### 4.1 What is a Functional Component?

A functional component in React is a plain JavaScript function that accepts props as an argument and returns a React element, which is typically described using JSX.

### 4.2 Characteristics of Functional Components

1. **Simplicity**: Functional components are simpler and shorter than class components. They are essentially JavaScript functions that take props and return JSX.
2. **No `this` keyword**: Unlike class components, functional components do not use the `this` keyword.
3. **Hooks**: Functional components can use hooks to manage state and side effects, making them as powerful as class components.

### 4.3 Defining a Functional Component

A functional component is defined as a JavaScript function. Here’s the basic syntax:

```jsx
import React from "react";

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Greeting;
```

**Explanation**

- `import React from 'react';`: This line imports the React library, which is necessary for creating React components.
- `function Greeting(props) { ... }`: This defines a functional component named `Greeting` that takes `props` as an argument.
- `return <h1>Hello, {props.name}!</h1>;`: This specifies the UI that the component renders, which is an `h1` element with a greeting message.
- `export default Greeting;`: This exports the `Greeting` component so it can be used in other parts of the application.

## 5. Class Components

Class components were the primary way to define components in React before the introduction of hooks in React 16.8. They are still widely used and provide a powerful way to manage state, lifecycle methods, and more complex logic within components. This guide provides a comprehensive, beginner-friendly explanation of class components.

### 5.1 What is a Class Component?

A class component in React is defined using an ES6 class that extends `React.Component`. Class components can hold and manage their own state, and they can define lifecycle methods to run code at specific times during the component's lifecycle.

### 5.2 Characteristics of Class Components

1. **State Management**: Class components can hold and manage their own state.
2. **Lifecycle Methods**: They provide lifecycle methods that allow you to run code at different stages of the component’s lifecycle.
3. **`this` Keyword**: Class components use the `this` keyword to access props, state, and methods.

### 5.3 Defining a Class Component

A class component is defined as an ES6 class that extends `React.Component`. Here’s the basic syntax:

```jsx
import React, { Component } from "react";

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default Greeting;
```

**Explanation:**

- `import React, { Component } from 'react';`: This line imports the React library and the `Component` class.
- `class Greeting extends Component { ... }`: This defines a class component named `Greeting` that extends `React.Component`.
- `render() { ... }`: Every class component must have a `render` method that returns JSX to describe the UI.
- `export default Greeting;`: This exports the `Greeting` component so it can be used in other parts of the application.

### 5.4 Conditional Rendering

Class components can conditionally render elements using JavaScript conditional statements inside the `render` method.

#### Example:

```jsx
import React, { Component } from "react";

class Greeting extends Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    return (
      <div>
        {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
      </div>
    );
  }
}

export default Greeting;
```

**Explanation:**

- The `Greeting` component checks the `isLoggedIn` prop and conditionally renders a message based on its value.

## 6. Functional vs Class Components

### 6.1 Overview

**Functional Components**

- **Definition**: Simple JavaScript functions that return JSX. They use hooks like `useState` and `useEffect` for state management and side effects.
- **Advantages**:
  - **Simplicity**: Easier to read and write, with less boilerplate.
  - **Performance**: Generally more performant due to optimizations by React.
  - **Hooks**: Enable powerful features like state and lifecycle management without classes.
- **Usage**: Preferred for most cases due to their simplicity and the power of hooks.

**Class Components**

- **Definition**: ES6 classes that extend `React.Component` and include a `render` method to return JSX. They manage state using `this.state` and lifecycle methods.
- **Advantages**:
  - **Lifecycle Methods**: Provides more granular control over component lifecycle (e.g., `componentDidMount`, `componentDidUpdate`).
  - **Legacy Code**: Necessary for working with legacy React codebases that haven’t migrated to hooks.
- **Usage**: Used when you need to leverage specific lifecycle methods not easily replicated with hooks, or when maintaining older codebases.

### 6.2 When to Use Each

**Functional Components**

- When building new components and applications.
- When you want simpler, cleaner, and more maintainable code.
- When leveraging hooks for state and lifecycle management.

**Class Components**

- When working on existing codebases that predominantly use class components.
- When specific lifecycle methods are required that you find challenging to implement with hooks.
- When needing advanced lifecycle control that’s more straightforward with classes (though rare with modern React).

Functional components are generally recommended for most use cases due to their simplicity and the power of hooks, while class components are useful for legacy code or specific scenarios requiring fine-grained lifecycle management.
