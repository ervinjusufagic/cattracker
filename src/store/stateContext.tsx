import React, { createContext, useReducer } from "react";
import { Action, InitialState } from "../types";
import { catScreenReducer, appStateReducer } from "./reducers";

const initialState: InitialState = {
  app: {
    isAddModalOpen: false,
  },
  catScreen: {
    name: "",
    image: "",
    dateOfBirth: null,
    dateOfDeath: null,
    isAddDisabled: true,
    datePicker: {
      open: false,
      kind: null,
    },
  },
};

const StateContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ app, catScreen }: InitialState, action: Action) => ({
  app: appStateReducer(app, action),
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
