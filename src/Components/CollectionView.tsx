import React from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { CatCell } from ".";
import { Cat } from "../types";
import { Colors, getSystemColor } from "../utils";

const CollectionView = ({
  onSelectItem,
  data,
}: {
  onSelectItem: (cat: Cat) => void;
  data: Cat[];
}) => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: getSystemColor(isDarkMode) }}>
      <View
        style={[
          styles.collectionView,
          {
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          },
        ]}>
        {data.map((cat, index) => (
          <CatCell onSelect={() => onSelectItem(cat)} key={index} cat={cat} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },

  collectionView: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 10,
  },

  actionMenu: {
    padding: 15,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

export { CollectionView };
