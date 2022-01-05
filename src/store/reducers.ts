import { Action, AppState } from "../types";

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "TOGGLE_ADD_MODAL":
      return { ...state, isAddModalOpen: action.toState };

    default:
      return state;
  }
};
