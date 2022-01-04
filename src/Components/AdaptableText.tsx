import React from "react";
import { Text, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const AdaptableText = ({ children }: { children: string }) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Text style={{ color: isDarkMode ? Colors.white : Colors.black }}>
      {children}
    </Text>
  );
};

export { AdaptableText };
