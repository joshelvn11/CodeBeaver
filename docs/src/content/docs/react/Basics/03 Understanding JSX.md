---
title: Understanding JSX
description: A guide to JSX
---

JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to XML or HTML. It is used with React to describe what the UI should look like. JSX makes it easier to write and add HTML in React. Here’s a comprehensive guide to understanding JSX, with code snippets and examples to illustrate key concepts.

## 1. Basic Syntax

JSX allows you to write HTML tags directly within JavaScript code. Each JSX element is compiled into a `React.createElement()` function call.

**Example:**

```jsx
const element = <h1>Hello, world!</h1>;
```

This JSX code gets compiled to:

```javascript
const element = React.createElement("h1", null, "Hello, world!");
```

## 2. Embedding Expressions

You can embed any JavaScript expression in JSX by wrapping it in curly braces `{}`.

**Example:**

```jsx
const name = "John";
const element = <h1>Hello, {name}!</h1>;
```

**Explanation:** The value of the JavaScript variable `name` is embedded within the JSX.

## 3. Attributes in JSX

JSX uses camelCase for attribute names instead of the standard HTML attribute names.

**Example:**

```jsx
const element = <div tabIndex="0"></div>;
```

**Explanation:** `tabIndex` is the JSX equivalent of the HTML attribute `tabindex`.

## 4. Specifying Children with JSX

JSX can contain children, which are elements nested inside other elements.

**Example:**

```jsx
const element = (
  <div>
    <h1>Hello, world!</h1>
    <p>This is a paragraph.</p>
  </div>
);
```

**Explanation:** The `div` element has two children: an `h1` element and a `p` element.

## 5. JSX and JavaScript

You can use JavaScript inside JSX, including functions and arrays.

**Example:**

```jsx
function formatName(user) {
  return user.firstName + " " + user.lastName;
}

const user = {
  firstName: "Harper",
  lastName: "Perez",
};

const element = <h1>Hello, {formatName(user)}!</h1>;
```

**Explanation:** The `formatName` function is used to format the user's name inside the JSX.

## 6. Conditional Rendering

You can conditionally render elements in JSX using JavaScript logical operators.

**Example:**

```jsx
const isLoggedIn = true;
const element = (
  <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}</div>
);
```

**Explanation:** If `isLoggedIn` is `true`, the first `h1` is rendered; otherwise, the second `h1` is rendered.

## 7. Lists and Keys

When rendering a list of elements, each element should have a unique `key` attribute.

**Example:**

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));

const element = <ul>{listItems}</ul>;
```

**Explanation:** The `key` attribute helps React identify which items have changed, are added, or are removed.

## 8. Styling in JSX

You can add inline styles in JSX by using a JavaScript object with camelCase property names.

**Example:**

```jsx
const element = (
  <h1 style={{ color: "blue", backgroundColor: "lightgray" }}>Hello, world!</h1>
);
```

**Explanation:** The `style` attribute accepts a JavaScript object with CSS properties in camelCase.

## 9. Using Fragments

React Fragments allow you to group multiple elements without adding extra nodes to the DOM.

**Example:**

```jsx
const element = (
  <React.Fragment>
    <h1>Hello, world!</h1>
    <p>This is a paragraph.</p>
  </React.Fragment>
);
```

**Short Syntax:**

```jsx
const element = (
  <>
    <h1>Hello, world!</h1>
    <p>This is a paragraph.</p>
  </>
);
```

**Explanation:** Fragments are useful when rendering multiple elements without wrapping them in an extra `div`.

## 10. Comments in JSX

You can add comments in JSX using curly braces.

**Example:**

```jsx
const element = (
  <div>
    {/* This is a comment */}
    <h1>Hello, world!</h1>
  </div>
);
```

**Explanation:** The comment is wrapped in curly braces and placed inside the JSX.

## 11. JavaScript in JSX Attributes

You can use JavaScript expressions as attribute values in JSX.

**Example:**

```jsx
const user = {
  avatarUrl: "http://example.com/avatar.jpg",
};

const element = <img src={user.avatarUrl} alt="User avatar" />;
```

**Explanation:** The `src` attribute value is dynamically set using a JavaScript expression.

## 12. Rendering Elements

To render a JSX element into the DOM, use `ReactDOM.render`.

**Example:**

```jsx
import React from "react";
import ReactDOM from "react-dom";

const element = <h1>Hello, world!</h1>;
ReactDOM.render(element, document.getElementById("root"));
```

**Explanation:** The `element` is rendered into the DOM element with the id `root`.

## 13. JSX vs HTML Attributes

### 13.1 Naming Conventions

In JSX, attribute names are written in camelCase, while in HTML, they are written in lowercase.

**HTML Example**

```html
<div tabindex="0"></div>
```

**JSX Example**

```jsx
<div tabIndex="0"></div>
```

### 13.2 Boolean Attributes

In HTML, boolean attributes can be written without a value, and their mere presence means `true`. In JSX, you must explicitly set them to `true` or `false`.

**HTML Example**

```html
<input type="checkbox" checked />
```

**JSX Example**

```jsx
<input type="checkbox" checked={true} />
```

### 13.3 Class and Style

#### Class

In HTML, you use the `class` attribute to assign CSS classes. In JSX, you use `className` because `class` is a reserved keyword in JavaScript.

**HTML Example**

```html
<div class="container"></div>
```

**JSX Example**

```jsx
<div className="container"></div>
```

#### Style

In HTML, the `style` attribute is a string. In JSX, it is an object where the keys are camelCase versions of the CSS properties.

**HTML Example**

```html
<div style="background-color: red; color: white;"></div>
```

**JSX Example**

```jsx
<div style={{ backgroundColor: "red", color: "white" }}></div>
```

### 13.4 Event Handlers

Event handler attributes in HTML are written in lowercase, whereas in JSX, they are camelCase and accept a function.

**HTML Example**

```html
<button onclick="handleClick()">Click Me</button>
```

**JSX Example**

```jsx
<button onClick={handleClick}>Click Me</button>
```

### 13.5 Children

In HTML, you can include children directly within the tags. In JSX, you can do the same, but you can also include JavaScript expressions within curly braces.

**HTML Example**

```html
<div>
  <p>Hello, World!</p>
</div>
```

**JSX Example**

```jsx
<div>
  <p>Hello, World!</p>
</div>
```
