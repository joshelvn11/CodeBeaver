---
title: Conditional Rendering
---

Conditional rendering in React allows you to render different components or elements based on certain conditions. It's similar to conditionals in JavaScript, but applied within the JSX syntax.

## 1. Using `if` Statements

You can use `if` statements to conditionally render components. This is useful when you need more complex logic.

```jsx
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <h1>Welcome back!</h1>;
    } else {
      return <h1>Please sign in.</h1>;
    }
  }
}

export default App;
```

## 2. Using Ternary Operators

Ternary operators are a concise way to perform conditional rendering. This is useful for simple conditions.

```jsx
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div>
        {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
      </div>
    );
  }
}

export default App;
```

## 3. Using Logical `&&` Operator

The logical `&&` operator can be used when you want to render something only if the condition is true.

```jsx
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
  }

  render() {
    const { isLoggedIn } = this.state;

    return <div>{isLoggedIn && <h1>Welcome back!</h1>}</div>;
  }
}

export default App;
```

## 4. Using `switch` Statements

For multiple conditions, you can use a `switch` statement to decide which component to render.

```jsx
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home", // can be 'home', 'about', 'contact'
    };
  }

  render() {
    const { page } = this.state;
    let content;

    switch (page) {
      case "home":
        content = <h1>Home Page</h1>;
        break;
      case "about":
        content = <h1>About Page</h1>;
        break;
      case "contact":
        content = <h1>Contact Page</h1>;
        break;
      default:
        content = <h1>Not Found</h1>;
    }

    return <div>{content}</div>;
  }
}

export default App;
```

## 5. Conditional Rendering in Functional Components

In functional components, you can use the same techniques for conditional rendering. Here's an example using hooks.

```jsx
import React, { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        Toggle Login State
      </button>
    </div>
  );
}

export default App;
```

## Summary

- **`if` Statements**: Good for complex conditions.
- **Ternary Operators**: Useful for simple, concise conditional rendering.
- **Logical `&&` Operator**: Render a component only if a condition is true.
- **`switch` Statements**: Handle multiple conditions in a clean way.

By using these techniques, you can control which components or elements are rendered based on the application's state or props, making your React application dynamic and responsive.
