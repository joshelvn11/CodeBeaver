---
title: Development Environment
description: A guide to Setting Up the Development Environment for React
---

Setting up a React development environment involves several steps, including installing Node.js, creating a new React project with Create React App, and configuring your code editor. Here’s a detailed, beginner-friendly guide to help you through this process.

### 1. Install Node.js and npm

Node.js is a JavaScript runtime that allows you to run JavaScript on your local machine. npm (Node Package Manager) is a package manager that comes with Node.js and is used to install JavaScript libraries and tools.

#### Steps to Install Node.js and npm

1. **Download Node.js:**

   - Visit the [Node.js website](https://nodejs.org/).
   - Download the LTS (Long Term Support) version for your operating system (Windows, macOS, or Linux).

2. **Install Node.js:**

   - Run the installer and follow the prompts. This will install both Node.js and npm.

3. **Verify the Installation:**
   - Open a terminal or command prompt.
   - Run the following commands to check if Node.js and npm were installed correctly:
     ```sh
     node -v
     npm -v
     ```
   - You should see the version numbers of Node.js and npm.

### 2. Create a New React Project

Create React App is a command-line tool that sets up a new React project with a sensible default configuration. It handles all the boilerplate code and configuration needed to start a React project.

#### Steps to Create a New React Project

1. **Open a Terminal or Command Prompt:**

   - Navigate to the directory where you want to create your new React project.

2. **Run Create React App:**

   - Execute the following command to create a new React project:
     ```sh
     npx create-react-app my-react-app
     ```
   - `npx` is a package runner tool that comes with npm 5.2+ and higher. It helps to execute packages without the need for a global install.
   - Replace `my-react-app` with your desired project name.

3. **Navigate to the Project Directory:**

   - Once the project is created, navigate into the project directory:
     ```sh
     cd my-react-app
     ```

4. **Start the Development Server:**
   - Run the following command to start the development server:
     ```sh
     npm start
     ```
   - This command will open your new React app in the browser at `http://localhost:3000`.

### 3. Project Structure

The default project structure created by Create React App looks like this:

```
my-react-app
├── node_modules
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── ...
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── ...
├── .gitignore
├── package.json
└── README.md
```

- **public:** Contains static files such as `index.html`, where your React app is mounted.
- **src:** Contains your React components, styles, and tests.
- **node_modules:** Contains all the project dependencies.
- **package.json:** Lists the project's dependencies and scripts.

### 4. Code Editor Setup

Choosing the right code editor can enhance your productivity. Visual Studio Code (VS Code) is a popular choice among React developers.

#### Steps to Set Up Visual Studio Code

1. **Download and Install VS Code:**

   - Visit the [Visual Studio Code website](https://code.visualstudio.com/).
   - Download and install the version for your operating system.

2. **Open Your React Project in VS Code:**

   - Open VS Code.
   - Use the `File` menu to navigate to your project directory and open it.

3. **Install Extensions:**
   - Install helpful extensions to improve your React development experience:
     - **ESLint:** For identifying and fixing linting issues.
     - **Prettier:** For code formatting.
     - **Reactjs code snippets:** For code snippets.
     - **Simple React Snippets:** For additional React code snippets.

### 5. Write Your First Component

Now that your development environment is set up, let's write a simple React component.

#### Steps to Write a React Component

1. **Open `src/App.js`:**

   - This is the main component file that is rendered by default.

2. **Replace the Code in `src/App.js`:**

   ```jsx
   import React from "react";
   import "./App.css";

   function App() {
     return (
       <div className="App">
         <header className="App-header">
           <h1>Hello, React!</h1>
           <p>Welcome to your first React app.</p>
         </header>
       </div>
     );
   }

   export default App;
   ```

3. **Save the File:**
   - Save the changes and check your browser. You should see the updated content: "Hello, React! Welcome to your first React app."

### 6. Adding CSS

Let's add some styles to our component.

#### Steps to Add CSS

1. **Open `src/App.css`:**

   - This file contains styles for the `App` component.

2. **Replace the Code in `src/App.css`:**

   ```css
   .App {
     text-align: center;
   }

   .App-header {
     background-color: #282c34;
     min-height: 100vh;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     font-size: calc(10px + 2vmin);
     color: white;
   }

   .App-link {
     color: #61dafb;
   }
   ```

3. **Save the File:**
   - Save the changes and check your browser. You should see the styles applied to the `App` component.

### 7. Understanding npm Scripts

npm scripts are commands that can be run from the terminal to perform various tasks, such as starting the development server, running tests, and building the application for production.

#### Common npm Scripts

- **Start the Development Server:**

  ```sh
  npm start
  ```

- **Run Tests:**

  ```sh
  npm test
  ```

- **Build the Application for Production:**

  ```sh
  npm run build
  ```

- **Eject the Configuration:**
  ```sh
  npm run eject
  ```
  _Note: Ejecting is a one-way operation that gives you full control over the configuration files. It is not recommended for beginners._

### 8. Using Git for Version Control

Using version control helps you track changes in your project and collaborate with others.

#### Steps to Set Up Git

1. **Initialize a Git Repository:**

   ```sh
   git init
   ```

2. **Add Files to the Repository:**

   ```sh
   git add .
   ```

3. **Commit Changes:**

   ```sh
   git commit -m "Initial commit"
   ```

4. **Create a Repository on GitHub:**

   - Follow the instructions on [GitHub](https://github.com/) to create a new repository.

5. **Push Your Code to GitHub:**
   ```sh
   git remote add origin <your-repo-url>
   git push -u origin master
   ```

### Conclusion

By following these steps, you have set up a React development environment, created a new React project, written your first component, added styles, and learned about npm scripts and version control. This setup will serve as a strong foundation for building and scaling your React applications. As you become more familiar with React, you can explore advanced topics and tools to enhance your development workflow.
