import React, { createContext, useReducer } from "react";
import { Action, InitialState } from "../types";
import { catScreenReducer, homeScreenReducer } from "./reducers";

const initialState: InitialState = {
  homeScreen: {
    searchQuery: "",
    cats: [],
  },
  catScreen: {
    name: "",
    image: "",
    dateOfBirth: "",
    dateOfDeath: "",
    isAddDisabled: true,
    isEditDisabled: true,
    isAddOpen: false,
    isEditOpen: false,
    selectedCat: null,
    datePicker: {
      open: false,
      type: null,
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

// Add multiple reducers for different screens
const mainReducer = (
  { homeScreen, catScreen }: InitialState,
  action: Action
) => ({
  homeScreen: homeScreenReducer(homeScreen, action),
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
