import { Action, CatScreenState, HomeScreenState } from "../types";

export const homeScreenReducer = (
  state: HomeScreenState,
  action: Action
): HomeScreenState => {
  switch (action.type) {
    case "STORE_CATS":
      return {
        ...state,
        cats: action.cats,
      };

    case "UPDATE_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.query,
      };

    case "FILTER_CATS":
      return {
        ...state,
        cats: state.cats.filter(cat => cat.name.includes(action.query)),
      };

    default:
      return state;
  }
};

export const catScreenReducer = (
  state: CatScreenState,
  action: Action
): CatScreenState => {
  switch (action.type) {
    case "TOGGLE_ADD_CAT_SCREEN":
      return {
        ...state,
        isAddOpen: action.toState,
      };

    case "TOGGLE_EDIT_CAT_SCREEN":
      const cat = action.selectedCat;
      //null check
      if (!cat) {
        return {
          ...state,
          isEditOpen: false,
        };
      }

      return {
        ...state,
        selectedCat: cat,
        name: cat.name,
        image: cat.imagePath,
        dateOfBirth: cat.dateOfBirth,
        dateOfDeath: cat.dateOfDeath,
        isEditOpen: action.toState,
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
      // all but death needs to be filled
      const isAddDisabled =
        state.name !== "" && state.image !== "" && state.dateOfBirth !== null;
      return {
        ...state,
        isAddDisabled: !isAddDisabled,
      };

    case "CHECK_IS_EDIT_DISABLED":
      // check if component states are equal to selectedcat
      const { dateOfDeath, selectedCat, name, image, dateOfBirth } = state;
      const isEditDisabled =
        name === selectedCat?.name &&
        image === selectedCat.imagePath &&
        dateOfBirth === selectedCat.dateOfBirth &&
        dateOfDeath === selectedCat.dateOfDeath;
      return {
        ...state,
        isEditDisabled: isEditDisabled,
      };

    case "RESET_CAT_SCREEN_STATE":
      return {
        ...state,
        name: "",
        image: "",
        dateOfBirth: "",
        dateOfDeath: "",
        isAddDisabled: true,
        isEditDisabled: true,
        selectedCat: null,
      };

    default:
      return state;
  }
};
