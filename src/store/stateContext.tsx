import React, { createContext, useReducer } from "react";
import { Action, InitialState } from "../types";
import { appStateReducer } from "./reducers";

const initialState: InitialState = {
  app: {
    isAddModalOpen: false,
  },
};

const StateContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ app }: InitialState, action: Action) => ({
  app: appStateReducer(app, action),
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
