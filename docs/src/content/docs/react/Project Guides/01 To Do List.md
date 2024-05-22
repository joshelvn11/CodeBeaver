---
title: Introduction
description: An introduction to React
---

## Step 1: Setup and Basic Components

### 1.1 Set Up Development Environment

**Install Node.js and npm:**

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server or outside of a browser environment. This is essential for developing server-side applications or running build tools like those used in React applications.

npm stands for Node Package Manager, which is included when you install Node.js. It manages dependencies for an application and also allows you to install third-party libraries from the npm registry.

To install Node.js and npm, follow these steps:

1. Visit [the official Node.js website](https://nodejs.org/).
2. Download the installer for your operating system (Windows, macOS, or Linux). It's recommended to download the LTS (Long Term Support) version for better stability.
3. Run the downloaded installer, following the on-screen instructions to install both Node.js and npm on your system.
4. After installation, you can verify the installation by opening your terminal or command prompt and running the commands `node -v` and `npm -v`. This will display the currently installed versions of Node.js and npm, respectively.

**Create a New React Project:**

Create React App is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration.

To create a new React project named `todo-list-app`, follow these steps:

1. Open your terminal or command prompt.
2. Run the command `npx create-react-app todo-list-app`. Here, `npx` is a package runner tool that comes with npm 5.2 and higher, which lets you use packages from the npm registry without installing them globally.
3. Navigate into your project directory by running `cd todo-list-app`.
4. Start the development server by running `npm start`. This command runs the app in development mode, opens your default web browser, and navigates to `http://localhost:3000` where you can see your new React application running.

The `npx create-react-app todo-list-app` command sets up a new project with a sensible default configuration, including a live development server, a build script to bundle JS, CSS, and images for production, a test runner, and configurations for linting and setup for further development.

### 1.2 Create Basic Components

**Overview of React Components:**

- A React component is a reusable piece of UI.
- Components can be functional (function-based) or class-based. We'll use functional components.
- Components can receive "props" (short for properties) which are inputs from parent components.

**1.2.1 Create the App Component:**

- The `App` component is the root component of your application.
- Open `src/App.js`. This file is created by Create React App and serves as the main component.
- Replace the contents of `App.js` with the following code:

```jsx
import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <Header />
      <ToDoForm setTodos={setTodos} />
      <ToDoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
```

- We import `useState` from React to manage state.
- `Header`, `ToDoList`, and `ToDoForm` are components that we will create.
- `todos` is an array that holds the list of tasks.
- `setTodos` is a function to update the `todos` state.
  **1.2.2 Create the Header Component:**

- Create a new folder named `components` inside the `src` folder.
- Inside the `components` folder, create a file named `Header.js`.

Add the following code to `Header.js`:

```jsx
import React from "react";

function Header() {
  return (
    <header>
      <h1>To-Do List</h1>
    </header>
  );
}

export default Header;
```

- This is a simple functional component that returns a header with a title.

**1.2.3 Create the ToDoList Component:**

- Inside the `components` folder, create a file named `ToDoList.js`.

Add the following code to `ToDoList.js`:

```jsx
import React from "react";
import ToDoItem from "./ToDoItem";

function ToDoList({ todos, setTodos }) {
  return (
    <div>
      {todos.map((todo, index) => (
        <ToDoItem key={index} todo={todo} setTodos={setTodos} todos={todos} />
      ))}
    </div>
  );
}

export default ToDoList;
```

- This component receives `todos` and `setTodos` as props.
- It maps over the `todos` array and renders a `ToDoItem` for each task.

**1.2.4 Create the ToDoItem Component:**

- Inside the `components` folder, create a file named `ToDoItem.js`.

Add the following code to `ToDoItem.js`:

```jsx
import React from "react";

function ToDoItem({ todo, setTodos, todos }) {
  const handleDelete = () => {
    const updatedTodos = todos.filter((t) => t !== todo);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <span>{todo}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ToDoItem;
```

- This component receives `todo`, `setTodos`, and `todos` as props.
- It renders a task and a delete button.
- The `handleDelete` function removes the task from the `todos` array and updates the state.

**1.2.5 Create the ToDoForm Component:**

- Inside the `components` folder, create a file named `ToDoForm.js`.

Add the following code to `ToDoForm.js`:

```jsx
import React, { useState } from "react";

function ToDoForm({ setTodos }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((prevTodos) => [...prevTodos, task]);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default ToDoForm;
```

- This component has its own state `task` to manage the input field.
- On form submission, it updates the `todos` state in the `App` component and clears the input field.

#### 1.3 Apply Basic Styling

**1.3.1 Add Basic CSS:**

- Open `src/App.css` and add the following styles:

```css
.App {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  background: #282c34;
  padding: 20px;
  color: white;
}

input {
  padding: 10px;
  width: 80%;
  margin-right: 10px;
}

button {
  padding: 10px;
}

form {
  margin-bottom: 20px;
}

div {
  margin: 10px 0;
}

span {
  margin-right: 10px;
}
```

- These styles center the app, style the header, and add basic styling to the input and buttons.

#### Summary

- We set up a new React project using Create React App.
- We created the basic structure of the app with components: `App`, `Header`, `ToDoList`, `ToDoItem`, and `ToDoForm`.
- We applied basic styling to the app.

Now that we have the basic structure in place, we can move on to the next steps, where we'll implement state management, event handling, and other functionalities. Let me know if you have any questions or need further clarification on any part!
