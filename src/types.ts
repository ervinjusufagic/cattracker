// Objects
export type Cat = {
  id: number;
  name: string;
  dateOfBirth: string | undefined;
  dateOfDeath: string | undefined;
  imagePath: string;
};

export type DatePickerKind = "BIRTH" | "DEATH" | null;

// State
export type InitialState = {
  app: AppState;
  catScreen: CatScreenState;
};

export type AppState = {
  isAddModalOpen: boolean;
};

export type CatScreenState = {
  name: string;
  image: string;
  dateOfBirth: Date | null;
  dateOfDeath: Date | null;
  datePicker: DatePickerState;
  isAddDisabled: boolean;
};

export type DatePickerState = {
  open: boolean;
  kind: DatePickerKind;
};

// Actions
export type AppAction = { type: "TOGGLE_ADD_MODAL"; toState: boolean };

export type CatScreenAction =
  | { type: "TOGGLE_DATEPICKER"; toState: boolean; kind: DatePickerKind }
  | { type: "SAVE_DATE"; date: Date; kind: DatePickerKind }
  | { type: "SELECT_CAT_IMAGE"; image: string }
  | { type: "SET_NAME"; name: string }
  | { type: "CHECK_IS_ADD_DISABLED" }
  | { type: "RESET_STATE" };

export type Action = AppAction | CatScreenAction;
