import { ImageSourcePropType } from "react-native";

const buritocat = require("./buritocat.jpeg");
const suprisedcat = require("./suprisedcat.jpeg");
const toiletcat = require("./toiletcat.jpeg");
const angrygraycat = require("./angrygraycat.jpeg");
const funnycat = require("./funnycat.jpeg");

export const imageMap: { [key: string]: ImageSourcePropType } = {
  buritocat: buritocat,
  suprisedcat: suprisedcat,
  toiletcat: toiletcat,
  angrygraycat: angrygraycat,
  funnycat: funnycat,
};
