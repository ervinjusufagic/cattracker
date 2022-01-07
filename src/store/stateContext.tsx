import React, { createContext, useReducer } from "react";
import { Action, InitialState } from "../types";
import { catScreenReducer } from "./reducers";

const initialState: InitialState = {
  catScreen: {
    name: "",
    image: "",
    dateOfBirth: null,
    dateOfDeath: null,
    isAddDisabled: true,
    datePicker: {
      open: false,
      type: null,
    },
    isOpen: false,
    type: null,
  },
};

const StateContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ catScreen }: InitialState, action: Action) => ({
  catScreen: catScreenReducer(catScreen, action),
});

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
