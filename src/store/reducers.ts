import { Action, AddModalState, AppState } from "../types";

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "TOGGLE_ADD_MODAL":
      return { ...state, isAddModalOpen: action.toState };

    default:
      return state;
  }
};

export const addModalReducer = (
  state: AddModalState,
  action: Action
): AddModalState => {
  switch (action.type) {
    case "TOGGLE_DATEPICKER":
      return {
        ...state,
        datePicker: { open: action.toState, kind: action.kind },
      };

    case "SAVE_DATE":
      return {
        ...state,
        dateOfBirth: action.kind === "BIRTH" ? action.date : state.dateOfBirth,
        dateOfDeath: action.kind === "DEATH" ? action.date : state.dateOfDeath,
        datePicker: { open: false, kind: null },
      };

    case "SELECT_CAT_IMAGE":
      return {
        ...state,
        image: action.image,
      };

    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };

    case "CHECK_IS_ADD_DISABLED":
      const { name, image, dateOfBirth } = state;

      const isDisabled = name !== "" && image !== "" && dateOfBirth !== null;

      return {
        ...state,
        isAddDisabled: !isDisabled,
      };

    case "RESET_STATE":
      return {
        ...state,
        name: "",
        dateOfBirth: null,
        dateOfDeath: null,
        isAddDisabled: true,
        image: "",
      };

    default:
      return state;
  }
};
