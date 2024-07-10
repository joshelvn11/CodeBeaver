---
title: Rendering Lists
---

Rendering lists in React involves iterating over an array of data and returning a JSX element for each item in the array. This is commonly done using the `map()` function, which creates a new array by applying a function to each element of the original array.

## 1. Basic Example

Here's a simple example of rendering a list of items in React:

```jsx
import React from "react";

function App() {
  const items = ["Apple", "Banana", "Cherry"];

  return (
    <div>
      <h1>Fruit List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

**Key Points**

1. **Using `map()`**: The `map()` function is used to iterate over the array and return a new array of JSX elements.
2. **Unique `key` Prop**: Each element in the list should have a unique `key` prop. The `key` helps React identify which items have changed, are added, or are removed. It improves performance and helps avoid bugs.

### 1.2 Why Use the `key` Prop?

The `key` prop is essential for helping React efficiently update the UI. React uses keys to determine which items in a list have changed, which can help avoid unnecessary re-renders and keep your application running smoothly.

### 1.3 Example with Unique Keys

For arrays of objects, it's common to use a unique identifier (like an ID) for the `key` prop.

```jsx
import React from "react";

function App() {
  const fruits = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
  ];

  return (
    <div>
      <h1>Fruit List</h1>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>{fruit.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

## 2. Rendering Components in a List

You can also render components for each item in the array. This is useful for more complex list items.

```jsx
import React from "react";

function FruitItem({ fruit }) {
  return <li>{fruit.name}</li>;
}

function App() {
  const fruits = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
  ];

  return (
    <div>
      <h1>Fruit List</h1>
      <ul>
        {fruits.map((fruit) => (
          <FruitItem key={fruit.id} fruit={fruit} />
        ))}
      </ul>
    </div>
  );
}

export default App;
```

### 2.1 Handling Lists with Dynamic Data

When dealing with dynamic data, you may fetch the list items from an API and store them in the state.

```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchedFruits = [
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
      { id: 3, name: "Cherry" },
    ];
    setFruits(fetchedFruits);
  }, []);

  return (
    <div>
      <h1>Fruit List</h1>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>{fruit.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

## 3. Conditional Rendering in Lists

You might want to conditionally render certain items in the list based on some criteria.

#### Example:

```jsx
import React from "react";

function App() {
  const fruits = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
  ];

  return (
    <div>
      <h1>Fruit List</h1>
      <ul>
        {fruits.map(
          (fruit) =>
            fruit.name !== "Banana" && <li key={fruit.id}>{fruit.name}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
```

## Summary

- **Using `map()`**: The `map()` function is used to iterate over arrays and return a new array of elements.
- **Unique `key` Prop**: Always provide a unique `key` prop for each element to help React identify changes.
- **Rendering Components**: You can render custom components for each item in the list for more complex structures.
- **Dynamic Data**: Handle dynamic lists by fetching data and storing it in the state.
- **Conditional Rendering**: Conditionally render list items based on criteria.

By understanding these techniques, you can effectively render lists in your React applications, making them dynamic and responsive to data changes.
