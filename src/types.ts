// Types
export type Cat = {
  id: number;
  name: string;
  dateOfBirth: string | undefined;
  dateOfDeath: string | undefined;
  imagePath: string;
};

export type DatePickerType = "BIRTH" | "DEATH" | null;

export type CatScreenType = "ADD" | "EDIT" | null;

// State
export type InitialState = {
  catScreen: CatScreenState;
};

export type CatScreenState = {
  name: string;
  image: string;
  dateOfBirth: Date | null;
  dateOfDeath: Date | null;
  datePicker: DatePickerState;
  isAddDisabled: boolean;
  isOpen: boolean;
  type: CatScreenType;
};

export type DatePickerState = {
  open: boolean;
  type: DatePickerType;
};

// Actions

export type CatScreenAction =
  | {
      type: "TOGGLE_DATEPICKER";
      toState: boolean;
      datePickerType: DatePickerType;
    }
  | { type: "SAVE_DATE"; date: Date; datePickerType: DatePickerType }
  | { type: "SELECT_CAT_IMAGE"; image: string }
  | { type: "SET_NAME"; name: string }
  | { type: "CHECK_IS_ADD_DISABLED" }
  | { type: "RESET_STATE" }
  | { type: "TOGGLE_CATSCREEN"; toState: boolean };

export type Action = CatScreenAction;
