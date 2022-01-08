// Types
export type Cat = {
  id: number;
  name: string;
  dateOfBirth: string;
  dateOfDeath: string;
  imagePath: string;
};

export type DatePickerType = "BIRTH" | "DEATH" | null;

// State
export type InitialState = {
  catScreen: CatScreenState;
};

export type CatScreenState = {
  name: string;
  image: string;
  dateOfBirth: string;
  dateOfDeath: string;
  datePicker: DatePickerState;
  isAddDisabled: boolean;
  isEditDisabled: boolean;
  isAddOpen: boolean;
  isEditOpen: boolean;
  selectedCat: Cat | null;
};

export type DatePickerState = {
  open: boolean;
  type: DatePickerType;
};

// Actions

export type AddCatAction =
  | { type: "CHECK_IS_ADD_DISABLED" }
  | { type: "TOGGLE_ADD_CAT_SCREEN"; toState: boolean };

export type EditCatAction =
  | { type: "CHECK_IS_EDIT_DISABLED" }
  | { type: "TOGGLE_EDIT_CAT_SCREEN"; toState: boolean; selectedCat?: Cat };

export type CatScreenAction =
  | {
      type: "TOGGLE_DATEPICKER";
      toState: boolean;
      datePickerType: DatePickerType;
    }
  | { type: "SAVE_DATE"; date: string; datePickerType: DatePickerType }
  | { type: "SELECT_CAT_IMAGE"; image: string }
  | { type: "SET_NAME"; name: string }
  | { type: "RESET_CAT_SCREEN_STATE" };

export type Action = CatScreenAction | AddCatAction | EditCatAction;
