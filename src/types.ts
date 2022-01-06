// Objects
export type Cat = {
  id: number;
  name: string;
  dateOfBirth: string;
  alive: boolean;
  imagePath: string;
};

export type Image =
  | "angrycat"
  | "funnycat"
  | "buritocat"
  | "suprisedcat"
  | "toiletcat";

// State
export type InitialState = {
  app: AppState;
};

export type AppState = {
  isAddModalOpen: boolean;
};

// Actions
export type Action = { type: "TOGGLE_ADD_MODAL"; toState: boolean };
