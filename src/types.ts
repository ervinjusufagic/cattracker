import { ImageSourcePropType } from "react-native";

export type Cat = {
  id: number;
  name: string;
  dateOfBirth: string;
  alive: boolean;
  imagePath: ImageSourcePropType;
};
