---
title: Forms
---

Handling forms in React involves managing the state of form inputs and handling form submission. React provides a controlled way to manage form elements, ensuring that the form's data is synchronized with the component's state.

**Controlled vs. Uncontrolled Components**

- **Controlled Components**: Form elements whose value is controlled by the component's state.
- **Uncontrolled Components**: Form elements that maintain their own state, with the form data handled by the DOM.

## 1. Controlled Components

In controlled components, form data is handled by the component's state. Every state mutation will have an associated handler function.

Here's a basic example of a controlled component:

```jsx
import React, { Component } from "react";

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NameForm;
```

### 1.1 Handling Multiple Inputs

When you need to handle multiple controlled input elements, you can add a `name` attribute to each element and let the handler function choose what to do based on the value of `event.target.name`.

**Example**

```jsx
import React, { Component } from "react";

class ReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}

export default ReservationForm;
```

### 1.2 Handling Form Submission

To handle form submission, you typically define an event handler for the `onSubmit` event of the form element. This handler will call `preventDefault()` to prevent the default form submission behavior and then perform whatever action you need (e.g., updating state, making API calls).

**Example**

```jsx
handleSubmit(event) {
  alert('A form was submitted: ' + this.state.value);
  event.preventDefault();
}
```

## 2. Uncontrolled Components

In uncontrolled components, form data is handled by the DOM itself. To access the form values, you can use refs.

**Example**

```jsx
import React, { Component } from "react";

class UncontrolledForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("A name was submitted: " + this.input.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => (this.input = input)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default UncontrolledForm;
```

### 1.1 Using Hooks with Forms

With React hooks, managing forms becomes more concise. You can use the `useState` hook to manage the form state.

**Example**

```jsx
import React, { useState } from "react";

function HookForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Name: ${name}, Email: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default HookForm;
```

## Summary

- **Controlled Components**: Manage form data using the component's state. This approach ensures that form elements' values are controlled by React.
- **Uncontrolled Components**: Use the DOM to handle form data. You can access form values using refs.
- **Form Submission**: Handle form submission using the `onSubmit` event, calling `preventDefault()` to prevent the default action.
- **Multiple Inputs**: Handle multiple inputs by adding a `name` attribute and using a single handler function that updates the state based on the input's name.

Understanding these concepts allows you to effectively manage forms in your React applications, making them more dynamic and responsive to user interactions.
