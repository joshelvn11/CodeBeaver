---
title: Hooks
---

Hooks are a feature in React that allow you to use state and other React features in functional components, which were traditionally stateless. Introduced in React 16.8, hooks provide a more direct API to the React concepts you already know, like state, lifecycle, context, and refs. Below is a detailed explanation of the most commonly used hooks:

## 1. Basic Hooks

### 1.1 useState

`useState` is a hook that lets you add state to functional components. Before hooks, state was only available in class components. With `useState`, you can now use state within functional components, making them more powerful and versatile.

#### 1.1.1 Basic Usage

To use `useState`, you need to import it from React and call it within your functional component. Here's a step-by-step breakdown:

**Import `useState`**

```jsx
import React, { useState } from "react";
```

**Initialize State**

- Call `useState` with the initial state value.
- `useState` returns an array with two elements:
  1.  The current state value.
  2.  A function to update the state value.
- You can use array destructuring to assign these values to variables.

```jsx
const [state, setState] = useState(initialState);
```

**Using State in Your Component**

- Use the state variable to read the current state.
- Call the updater function to update the state.

**Example**

```jsx
function Counter() {
  // Declare a state variable named 'count' and a function to update it
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

#### 1.1.2 Managing Multiple State Variables

You can call `useState` multiple times to manage multiple state variables:

```jsx
function UserForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  return (
    <form>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </label>
    </form>
  );
}
```

#### 1.1.3 Initial State with a Function

If the initial state computation is expensive, you can pass a function to `useState`. This function will only run once during the initial render:

```jsx
function ExpensiveComponent() {
  const [value, setValue] = useState(() => {
    // Expensive computation
    const initialValue = computeExpensiveValue();
    return initialValue;
  });

  return <div>{value}</div>;
}
```

#### 1.1.4 Updating State

**Simple Update**

Updating state with a new value:

```jsx
const [count, setCount] = useState(0);
setCount(5); // Sets count to 5
```

**Functional Update**

When the new state depends on the previous state, use a functional update to avoid bugs:

```jsx
setCount((prevCount) => prevCount + 1);
```

#### 1.1.5 Common Pitfalls

**Merging State**

Unlike class components, `useState` does not automatically merge state updates. If you have an object in state and only want to update one property, you need to spread the previous state manually:

```jsx
const [user, setUser] = useState({ name: "John", age: 30 });

// Incorrect: This would replace the entire user object
// setUser({ age: 31 });

// Correct: Spread the previous state
setUser((prevUser) => ({ ...prevUser, age: 31 }));
```

**State Initialization**

The initial state value is only used during the first render. Subsequent renders ignore it unless you use a function to compute the initial state.

#### 1.1.6 Example

Here's a full example of a counter component using `useState`:

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
```

In this example:

- `useState(0)` initializes `count` to `0`.
- `setCount(count + 1)` increments the count.
- `setCount(count - 1)` decrements the count.

### 1.2 useEffect

The `useEffect` hook is one of the most powerful and commonly used hooks in React. It allows you to perform side effects in functional components. These side effects can include data fetching, subscriptions, or manually changing the DOM, which are operations you cannot perform during rendering. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React class components, but unified into a single API.

#### 1.2.1 Basic Usage

To use `useEffect`, you import it from React and call it within your functional component. Here's a simple example:

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This code runs after every render
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

**Effect Function**

The first argument to `useEffect` is a function that contains the side-effect logic. This function runs after the component renders.

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
});
```

**Dependencies Array**

The second argument to `useEffect` is an optional array of dependencies. This array determines when the effect function should be re-run. If any value in the dependencies array changes, the effect function runs again.

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

- **No Dependencies**: If you omit the dependencies array, the effect runs after every render.
- **Empty Dependencies Array**: If you pass an empty array (`[]`), the effect runs only once after the initial render, similar to `componentDidMount`.
- **Specific Dependencies**: If you provide specific values, the effect runs only when those values change.

**Cleanup Function**

If the effect returns a function, React runs it when the component unmounts or before the effect runs again on subsequent renders. This is useful for cleanup tasks like removing event listeners or cancelling subscriptions.

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => clearInterval(timer); // Cleanup the interval on unmount
}, []);
```

#### 1.2.2 Examples

**Data Fetching**

```jsx
import React, { useState, useEffect } from "react";

function DataFetchingComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []); // Empty array means this effect runs only once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

**Subscriptions**

```jsx
import React, { useState, useEffect } from "react";

function SubscriptionComponent() {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    const subscription = subscribeToFriendStatus(handleStatusChange);

    // Cleanup subscription on unmount
    return () => {
      unsubscribeFromFriendStatus(subscription);
    };
  }, []); // Run only once when the component mounts

  if (isOnline === null) {
    return "Loading...";
  }

  return isOnline ? "Online" : "Offline";
}
```

#### 1.2.3 Common Pitfalls and Best Practices

**Dependencies Array**

Always include all state variables and props that the effect uses. This ensures that the effect has up-to-date values.
If you miss a dependency, it might lead to bugs where the effect does not react to state or prop changes.

```jsx
useEffect(() => {
  console.log(count); // This will always log the latest count
}, [count]); // 'count' is included in the dependencies array
```

**Multiple Effects**

You can use multiple `useEffect` hooks to separate different concerns. This makes the code cleaner and easier to manage.

```jsx
useEffect(() => {
  // Effect for updating document title
  document.title = `You clicked ${count} times`;
}, [count]);

useEffect(() => {
  // Effect for subscribing to a service
  const subscription = subscribeToService();
  return () => {
    // Cleanup subscription on unmount
    unsubscribeFromService(subscription);
  };
}, []); // Empty array means this effect runs only once
```

**Conditional Effects**

Instead of placing conditions inside the effect function, consider placing conditions around the entire `useEffect` call.

```jsx
if (shouldRunEffect) {
  useEffect(() => {
    // Effect logic here
  }, [dependencies]);
}
```

## 1.3 useContext

- **Purpose**: Accesses the value of a context without the need for a Consumer component.
- **Usage**:

  ```jsx
  import React, { useContext } from "react";

  const ThemeContext = React.createContext("light");

  function ThemedButton() {
    const theme = useContext(ThemeContext); // Accesses the current theme context value.
    return <button className={theme}>I am styled by theme context!</button>;
  }
  ```

- **Explanation**: `useContext` takes a context object and returns the current context value for that context.

### Additional Hooks

4. **useReducer**

   - **Purpose**: Manages more complex state logic compared to `useState`.
   - **Usage**:

     ```jsx
     import React, { useReducer } from "react";

     const initialState = { count: 0 };

     function reducer(state, action) {
       switch (action.type) {
         case "increment":
           return { count: state.count + 1 };
         case "decrement":
           return { count: state.count - 1 };
         default:
           throw new Error();
       }
     }

     function Counter() {
       const [state, dispatch] = useReducer(reducer, initialState); // Uses the reducer to manage state.
       return (
         <div>
           <p>Count: {state.count}</p>
           <button onClick={() => dispatch({ type: "increment" })}>+</button>
           <button onClick={() => dispatch({ type: "decrement" })}>-</button>
         </div>
       );
     }
     ```

   - **Explanation**: `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

5. **useCallback**

   - **Purpose**: Memoizes a function to prevent its re-creation on every render.
   - **Usage**:

     ```jsx
     import React, { useCallback, useState } from "react";

     function Example() {
       const [count, setCount] = useState(0);

       const increment = useCallback(() => {
         setCount((c) => c + 1);
       }, []); // Dependencies: [] means this function is only created once.

       return <button onClick={increment}>Increment</button>;
     }
     ```

   - **Explanation**: `useCallback` returns a memoized version of the callback function that only changes if one of the dependencies has changed.

6. **useMemo**

   - **Purpose**: Memoizes a computed value to optimize performance.
   - **Usage**:

     ```jsx
     import React, { useMemo, useState } from "react";

     function Example() {
       const [count, setCount] = useState(0);

       const expensiveComputation = useMemo(() => {
         return count * 2; // A heavy computation based on count.
       }, [count]); // Only re-compute if count changes.

       return (
         <div>
           <p>Computed Value: {expensiveComputation}</p>
           <button onClick={() => setCount(count + 1)}>Increment</button>
         </div>
       );
     }
     ```

   - **Explanation**: `useMemo` returns a memoized value that only re-computes when one of the dependencies changes.

### Custom Hooks

- **Purpose**: Extract reusable logic that needs to be shared between components.
- **Usage**:

  ```jsx
  import { useState, useEffect } from "react";

  function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }, [url]);

    return { data, loading };
  }

  function Example() {
    const { data, loading } = useFetch("https://api.example.com/data");

    if (loading) {
      return <div>Loading...</div>;
    }

    return <div>Data: {JSON.stringify(data)}</div>;
  }
  ```

- **Explanation**: Custom hooks allow you to encapsulate and reuse stateful logic, making your code more modular and readable.

### Rules of Hooks

1. **Only Call Hooks at the Top Level**: Don’t call Hooks inside loops, conditions, or nested functions. Always use them at the top level of your React function to ensure that hooks are called in the same order each time a component renders.
2. **Only Call Hooks from React Functions**: Call hooks only from within React functional components or custom hooks. Do not call them from regular JavaScript functions.

### Conclusion

Hooks provide a powerful way to use React features in functional components, making your code cleaner and more manageable. By understanding and utilizing hooks effectively, you can build robust, reusable components and manage state and side effects efficiently.
