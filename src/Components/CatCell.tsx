import React from "react";

import {
  ImageBackground,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { Cat } from "../types";
import { Colors } from "../utils";
import { AdaptableText } from "./AdaptableText";

const CatCell = ({ cat }: { cat: Cat }) => {
  const { name, dateOfBirth, imagePath } = cat;
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={styles.cell}>
      <ImageBackground style={styles.catImage} source={imagePath}>
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
