# Documentation

## 📗 Index

- [useWindowSize](#-useWindowSize)
- [useStateWithRef](#-useStateWithRef)
- [useLocalStorage](#-useLocalStorage)
- [useOutsideAlerter](#-useOutsideAlerter)
- [useDelayedUnset](#-useDelayedUnset)

</br>

## 📐 useWindowSize

Returns an array with the width and height values of the current browser window, updates on change.

### Usage

```jsx
import React from "react";
import { useWindowSize } from "j-hooks";

const DemoComponent = () => {
  const [width, height] = useWindowSize();

  return (
    <div>
      <p>Width: {width}</p>
      <p>Height: {height}</p>
    </div>
  );
};
```

### Return value

`[width,height]`

1. `width` (_Number_) : Pixel width of current browser window
2. `height` (_Number_) : Pixel height of current browser window

</br>

## 📚 useStateWithRef

Saves the given value in React state and as a ref value, returns modified setState function that changes state _and_ ref.
Especially useful for comparing values in event listeners that cannot track changes in React state (but can in ref.current).

### Usage

```jsx
import React, { useEffect } from "react";
import { useStateWithRef } from "j-hooks";

const DemoComponent = () => {
  const websocketClient = useRef(null);
  const [myUserId, setMyUserId, myUserIdRef] = useStateWithRef("12345");

  /*
  The event listener below is set up on mount, meaning it will always interpret the state value of myUserId
  to be "12345". We may want to use myUserId elsewhere as a state, so replacing it entirely with a ref won't work.
  useStateWithRef returns the normal react state, with a modified setState function that will change the value of
  myUserIdRef.current as well as the original myUserId. 
  */

  useEffect(() => {
    websocketClient.current = new WebSocket(WS_ENDPOINT);

    websocketClient.current.onmessage = (event) => {
      if (event.data.userId === myUserIdRef.current) {
        console.log("User has received a message");
      }
    };
  }, []);

  return null;
};
```

### Parameters

1. `data` (_any_) : Initial value of the state/ref.

### Return value

`[myState,setMyState,myStateRef]`

1. `myState` (_any_) : The created state.
2. `setMyState` (_function_) : Modifed setState function to change myState and myStateRef.current
3. `myStateRef` (_ref_) : Ref to track state value

</br>

## 💾 useLocalStorage

Works just like useState, but uses a key to save and update value in localStorage as well.

### Usage

```jsx
import React from "react";
import { useLocalStorage } from "j-hooks";

const DemoComponent = () => {
  const [username, setUserName] = useLocalStorage("username", "Jeremy");
  /*
   If value with key "username" already exists in localStorage, useLocalStorage will return
   that value in the username state. If no value exists in localStorage at that key,
   the value of the state will be "Jeremy", and a new value will be created in localStorage 
   with the key "username"
  */

  return <span>My name is {username}!</span>;
};
```

### Parameters

1. `localStorageKey` (_String_) : Key in localStorage
2. `defaultValue` (_String_) : Value to be saved if no value is found already with key in localStorage

### Return value

`[value, setValue]`

1. `value` (_any_) : The created state.
2. `setValue` (_function_) : Function to change the state value.

</br>

## 🔔 useOutsideAlerter

Calls a function whenever a user clicks outside of the given ref, or presses escape.
Mostly used for improving UX around modals, dropdowns, and any other "floating" components that need to be closed easily.

### Usage

```jsx
import React from "react";
import { useOutsideAlerter } from "j-hooks";

const DemoComponent = () => {
  const [componentShowing, setComponentShowing] = useState(true);
  let compRef = useRef(null);

  useOutsideAlerter(compRef, () => setModalOpen(false));

  /*
  The built-in useState hook can be used to conditionally render a component with a ref attached.
  useOutsideAlerter can then be used to automatically change that state when a click is made outside
  of the ref'ed component, or escape is pressed while it is visible.
  */

  return (
    <>
      <button onClick={() => setComponentShowing(true)}>Show Component</button>
      {componentShowing && <div ref={compRef}>Component</div>}
    </>
  );
};
```

### Parameters

1. `ref` (_ref_) : Created value from React.useRef, used to track click/key events
2. `func` (_function_) : Function that is called on outside click or escape press

</br>

## ⏰ useDelayedUnset

Sets the given state to false x milliseconds after being set to true.
Useful for temporarily showing/highlighting UI elements.

### Usage

```jsx
import React from "react";
import { useDelayedUnset } from "j-hooks";

const DemoComponent = () => {
  const [componentShowing, setComponentShowing] = useDelayedUnset(1000);

  /*
  The useDelayedUnset hook can be used to conditionally render a component for a short period of time.
  */

  return (
    <>
      <button onClick={() => setComponentShowing(true)}>Show Component</button>
      {componentShowing && <div>Component</div>}
    </>
  );
};
```

### Parameters

1. `delay` (_Number_) : Delay time in milliseconds

</br>
