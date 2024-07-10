---
title: Closures
description: Closures
---

Closures in JavaScript are a fundamental concept that allow you to access a function’s scope even after the function has finished executing. This can be a bit tricky to understand initially, so let's break it down with an example and an explanation of how closures work.

### What is a Closure?

A closure is a combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created.

### How Closures Work

In JavaScript, functions are not just code—they're also objects. When you define a function, JavaScript forms a closure around that function, encapsulating its scope. This means that the function remembers and can access its lexical scope even when it is executing outside its original scope.

### Example of a Closure

Here’s a simple example to illustrate how closures work:

```javascript
function createGreeting(greeting) {
  return function (name) {
    console.log(greeting + ", " + name);
  };
}

const sayHello = createGreeting("Hello");
sayHello("Alice"); // Output: Hello, Alice
```

In this example:

1. The `createGreeting` function takes a `greeting` parameter and returns a new function.
2. This returned function takes a `name` parameter and logs a greeting message to the console.
3. When we call `createGreeting('Hello')`, we are actually creating a function that remembers the value of `greeting` as 'Hello'.
4. The `sayHello` variable holds this new function. Even though the `createGreeting` function’s execution context is finished, the returned function still has access to the `greeting` variable through the closure.
5. When `sayHello('Alice')` is called, it still has access to `greeting` from the outer function.

### Why Closures Matter

Closures are powerful because they:

- Allow you to emulate private variables.
- Enable factory functions that can create multiple instances of private states.
- Maintain state in asynchronous programming without using global variables.
- Can be used in event handlers, callbacks, or any situation where you need to preserve state across asynchronous operations.

Closures are a key part of functional programming in JavaScript and understanding them can help you write more efficient and expressive code.
