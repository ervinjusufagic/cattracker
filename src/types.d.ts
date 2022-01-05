import { ImageSourcePropType } from "react-native";

// Objects
type Cat = {
  id: number;
  name: string;
  dateOfBirth: string;
  alive: boolean;
  imagePath: ImageSourcePropType;
};

// State
type InitialState = {
  app: AppState;
};

type AppState = {
  isAddModalOpen: boolean;
};

// Actions
type Action = { type: "TOGGLE_ADD_MODAL"; toState: boolean };
