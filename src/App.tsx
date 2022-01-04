import React from "react";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import { BuritoCat } from "./Assets";
import { Colors } from "./utils";
import { Cat } from "./types";
import { CatCell } from "./Components";

const testCat: Cat = {
  name: "burito",
  dateOfBith: "2021-12-13",
  alive: true,
  imagePath: BuritoCat,
};

let cats: Cat[] = [testCat, testCat, testCat, testCat];

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle, styles.scrollView]}>
        <View
          style={[
            styles.appContainer,
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            },
          ]}>
          <View style={styles.cellContainer}>
            {cats.map((cat, index) => (
              <CatCell
                key={index}
                name={cat.name}
                dateOfBith={cat.dateOfBith}
                alive={cat.alive}
                imagePath={cat.imagePath}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    paddingVertical: 10,
  },

  scrollView: {
    height: "100%",
  },

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

  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
