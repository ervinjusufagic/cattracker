import React from "react";

import {
  ImageBackground,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { imageMap } from "../images";
import { Cat } from "../types";
import { Colors } from "../utils";
import { AdaptableText } from "./AdaptableText";

const CatCell = ({ cat }: { cat: Cat }) => {
  const isDarkMode = useColorScheme() === "dark";

  const { name, dateOfBirth, imagePath } = cat;
  const image = imageMap[imagePath];

  return (
    <View style={styles.cell}>
      <ImageBackground style={styles.catImage} source={image}>
        <View style={styles.catInfo}>
          <LinearGradient
            style={styles.linearGradient}
            colors={["transparent", isDarkMode ? Colors.black : Colors.white]}>
            <AdaptableText>{name}</AdaptableText>
            <AdaptableText>{dateOfBirth}</AdaptableText>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cellContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  cell: {
    height: 180,
    flexBasis: "45%",
    overflow: "hidden",
    margin: 5,
  },

  catImage: {
    flex: 1,
  },

  catInfo: {
    flex: 1,
    justifyContent: "flex-end",
  },

  linearGradient: {
    flex: 0.5,
    alignItems: "flex-end",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});

export { CatCell };
