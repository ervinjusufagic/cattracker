import React from "react";

import { StyleSheet, useColorScheme, View } from "react-native";
import { AdaptableText } from "../components";
import { getSystemColor } from "../utils";

const UserInformationScreen = ({ text }: { text: string }) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      style={[{ backgroundColor: getSystemColor(isDarkMode) }, styles.view]}>
      <AdaptableText>{text}</AdaptableText>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { UserInformationScreen };
