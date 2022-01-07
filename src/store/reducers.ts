import { Action, CatScreenState, AppState } from "../types";

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "TOGGLE_ADD_MODAL":
      return { ...state, isAddModalOpen: action.toState };

    default:
      return state;
  }
};

export const catScreenReducer = (
  state: CatScreenState,
  action: Action
): CatScreenState => {
  switch (action.type) {
    case "TOGGLE_DATEPICKER":
      return {
        ...state,
        datePicker: { open: action.toState, type: action.datePickerType },
      };

    case "SAVE_DATE":
      return {
        ...state,
        dateOfBirth:
          action.datePickerType === "BIRTH" ? action.date : state.dateOfBirth,
        dateOfDeath:
          action.datePickerType === "DEATH" ? action.date : state.dateOfDeath,
        datePicker: { open: false, type: null },
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
