import React from "react";
import { Text, TextStyle, useColorScheme } from "react-native";
import { getSystemColor } from "../utils";

const AdaptableText = ({
  children,
  style,
}: {
  children: string;
  style?: TextStyle;
}) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Text style={[style, { color: getSystemColor(!isDarkMode) }]}>
      {children}
    </Text>
  );
};

export { AdaptableText };
