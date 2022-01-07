import { Action, CatScreenState } from "../types";

export const catScreenReducer = (
  state: CatScreenState,
  action: Action
): CatScreenState => {
  switch (action.type) {
    case "TOGGLE_CATSCREEN":
      //if cat exists, we are in edit, populate cat data
      const catInPayload = action.cat;

      if (catInPayload) {
        let birth = catInPayload.dateOfBirth
          ? new Date(catInPayload.dateOfBirth)
          : null;
        let death = catInPayload.dateOfDeath
          ? new Date(catInPayload.dateOfDeath)
          : null;

        return {
          ...state,
          name: catInPayload.name,
          image: catInPayload.imagePath,
          dateOfBirth: birth,
          dateOfDeath: death,
          isOpen: action.toState,
          type: "EDIT",
        };
      }

      return {
        ...state,
        isOpen: action.toState,
        type: action.toState ? "ADD" : null, // reset if its closing
      };

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

    case "RESET_CATSCREEN_STATE":
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
