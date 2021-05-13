import { useState, useRef } from "react";

const useStateWithRef = data => {
  let [myState, _setMyState] = useState(data);
  let myStateRef = useRef(data);

  let setMyState = data => {
    myStateRef.current = data;

    _setMyState(data);
  };

  return [myState, setMyState, myStateRef];
};

export default useStateWithRef;