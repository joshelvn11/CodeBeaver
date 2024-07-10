---
title: Component Lifecycle
---

The component lifecycle in React refers to the series of events that happen from the creation of a component to its removal. Understanding these lifecycle methods allows you to hook into specific points of a component's existence to perform actions like fetching data, setting up subscriptions, or cleaning up resources.

## 1. Lifecycle Methods in Class Components

React class components have several lifecycle methods that you can override to run code at particular times in the lifecycle of a component. These methods are grouped into three main phases:

1. **Mounting**
2. **Updating**
3. **Unmounting**

### 1.1 Mounting

Mounting is the phase when a component is being created and inserted into the DOM.

#### 1.1.1 constructor()

- Called before the component is mounted.
- Used to initialize state and bind event handlers.

```jsx
constructor(props) {
  super(props);
  this.state = {
    data: null,
  };
}
```

#### 1.1.2 static getDerivedStateFromProps()

- Called right before rendering the element(s) in the DOM.
- Used to set the state based on the initial props.

```jsx
static getDerivedStateFromProps(props, state) {
  // Return new state or null
  return null;
}
```

#### 1.1.3 render()

- The only required method in a class component.
- Returns the JSX to be rendered in the DOM.

```jsx
render() {
  return <div>{this.state.data}</div>;
}
```

#### 1.1.4 componentDidMount()

The `componentDidMount()` lifecycle method in React is called once, immediately after a component is inserted into the DOM. It is part of the mounting phase of a component's lifecycle and is commonly used to perform side effects such as fetching data from an API, setting up subscriptions, or initializing third-party libraries.

```jsx
componentDidMount() {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => this.setState({ data }));
}
```

**Purpose**

- **Data Fetching:** Ideal for making AJAX calls to fetch data for the component.
- **Setting up Subscriptions:** Can be used to subscribe to events, such as WebSocket or event listeners.
- **DOM Manipulation:** Safe to perform DOM operations since the component has been mounted.
- **Timers and Intervals:** Set up timers or intervals.

**Usage Example**

```jsx
import React, { Component } from "react";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch(`https://api.example.com/users/${this.props.userId}`)
      .then((response) => response.json())
      .then((data) => this.setState({ user: data, loading: false }))
      .catch((error) => this.setState({ error, loading: false }));
  }

  render() {
    const { user, loading, error } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error loading user data</p>;
    }

    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.bio}</p>
      </div>
    );
  }
}

export default UserProfile;
```

### 1.2 Updating

Updating is the phase when a component is being re-rendered due to changes in props or state.

#### 1.2.1 static getDerivedStateFromProps()

- Called before rendering when new props or state are received.
- Can return an object to update state or null to update nothing.

#### 1.2.2 shouldComponentUpdate()

- Called before rendering when new props or state are received.
- Can return true or false to indicate whether the component should update.

```jsx
shouldComponentUpdate(nextProps, nextState) {
  return nextState.data !== this.state.data;
}
```

#### 1.2.3 render()

- Re-renders the component with the new state or props.

#### 1.2.4 getSnapshotBeforeUpdate()

- Called right before the DOM is updated.
- Can return a value to be passed as a parameter to `componentDidUpdate`.

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  return { scrollPosition: window.scrollY };
}
```

#### 1.2.5 componentDidUpdate()

The `componentDidUpdate()` lifecycle method in React is called immediately after a component has been updated. This method is not called for the initial render but is invoked after subsequent re-renders caused by changes in props or state. It is typically used to perform side effects after the DOM has been updated.

```jsx
componentDidUpdate(prevProps, prevState, snapshot) {
  if (snapshot) {
    window.scrollTo(0, snapshot.scrollPosition);
  }
}
```

**Purpose**

- **DOM Manipulation:** Perform operations on the DOM after it has been updated.
- **Network Requests:** Fetch new data when props or state change.
- **Compare Props/State:** Compare current props/state with previous ones to decide if certain actions need to be performed.
- **Synchronizing State:** Update component's internal state based on props changes.

**Usage Example**

```jsx
import React, { Component } from "react";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    // Initial data fetch
    this.fetchUserData(this.props.userId);
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the userId prop has changed
    if (this.props.userId !== prevProps.userId) {
      this.fetchUserData(this.props.userId);
    }
  }

  fetchUserData(userId) {
    fetch(`https://api.example.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => this.setState({ user: data }))
      .catch((error) => console.error("Error fetching user data:", error));
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        {user ? (
          <div>
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default UserProfile;
```

### 1.3 Unmounting

Unmounting is the phase when a component is being removed from the DOM.

#### 1.3.1 componentWillUnmount()

The `componentWillUnmount()` lifecycle method in React is invoked immediately before a component is unmounted and destroyed. This method is part of the unmounting phase of a component's lifecycle and is used for cleanup purposes. This is where you should cancel any network requests, remove event listeners, and clean up any subscriptions or timers created during the component's lifecycle.

```jsx
componentWillUnmount() {
  // Clean up
}
```

**Purpose**

- **Cleanup Subscriptions:** Unsubscribe from any subscriptions (e.g., WebSockets, event listeners).
- **Cancel Network Requests:** Abort any ongoing network requests to avoid memory leaks.
- **Clear Timers:** Clear any timers or intervals set up in componentDidMount or other lifecycle methods.
- **Other Cleanup Tasks:** Perform any other necessary cleanup to avoid resource leaks and ensure the component is properly destroyed.

**Usage Examples**

Clearing Timers:

```jsx
componentDidMount() {
  this.timerID = setInterval(this.tick, 1000);
}

componentWillUnmount() {
  clearInterval(this.timerID);
}
```

Unsubscribing from Subscriptions:

```jsx
componentDidMount() {
  this.subscription = someEventEmitter.subscribe(data => {
    this.setState({ data });
  });
}

componentWillUnmount() {
  this.subscription.unsubscribe();
}

```

Cancelling Network Requests:

```jsx
componentDidMount() {
  this.abortController = new AbortController();
  fetch('https://api.example.com/data', { signal: this.abortController.signal })
    .then(response => response.json())
    .then(data => this.setState({ data }))
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Fetch error:', error);
      }
    });
}

componentWillUnmount() {
  this.abortController.abort();
}
```

Removing Event Listeners:

```jsx
componentDidMount() {
  window.addEventListener('resize', this.handleResize);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.handleResize);
}

handleResize = () => {
  // Handle resize
};
```

## 2. Lifecycle Methods in Functional Components

Functional components use hooks to achieve similar lifecycle behavior.

#### Equivalent to `componentDidMount` and `componentDidUpdate`:

```jsx
import React, { useState, useEffect } from "react";

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []); // Empty dependency array ensures this runs only once (similar to componentDidMount)

  useEffect(() => {
    // This runs after every render, similar to componentDidUpdate
    // Perform side effects here
  });

  return <div>{data}</div>;
}
```

#### Equivalent to `componentWillUnmount`:

```jsx
import React, { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    // Setup code

    return () => {
      // Cleanup code, similar to componentWillUnmount
    };
  }, []); // Empty dependency array ensures this runs only once

  return <div>My Component</div>;
}
```
