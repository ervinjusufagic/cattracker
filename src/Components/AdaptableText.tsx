import React from "react";
import { Text, TextStyle, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const AdaptableText = ({
  children,
  style,
}: {
  children: string;
  style?: TextStyle;
}) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Text style={[style, { color: isDarkMode ? Colors.white : Colors.black }]}>
      {children}
    </Text>
  );
};

export { AdaptableText };
