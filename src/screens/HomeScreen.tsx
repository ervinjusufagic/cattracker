import React, { useContext } from "react";

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import { useQuery } from "react-query";

import { StateContext } from "../store/stateContext";
import { fetchAllCats } from "../service/api";
import { Colors, getSystemColor } from "../utils";
import { Cat } from "../types";
import { CatCell } from "../components";
import { CatScreen, InformationScreen } from ".";

const HomeScreen = () => {
  const { state, dispatch } = useContext(StateContext);

  const isDarkMode = useColorScheme() === "dark";

  const { isLoading, isError, error, data } = useQuery<Cat[], Error>(
    "cats",
    fetchAllCats
  );

  const openCatScreen = (cat?: Cat) => {
    dispatch({
      type: "TOGGLE_CATSCREEN",
      toState: true,
      cat: cat,
    });
  };

  if (isLoading) {
    return <InformationScreen text="Loading..." />;
  }

  if (isError) {
    return (
      <InformationScreen text={error?.message ?? "Could not fetch cats :("} />
    );
  }

  return (
    <SafeAreaView
      style={[
        { backgroundColor: getSystemColor(isDarkMode) },
        styles.safeView,
      ]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: getSystemColor(isDarkMode) }}>
        <View
          style={[
            styles.appContainer,
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            },
          ]}>
          <View style={styles.collectionView}>
            {data?.map((cat, index) => (
              <CatCell
                onSelect={() => openCatScreen(cat)}
                key={index}
                cat={cat}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.actionMenu}>
        <TextInput
          placeholderTextColor={Colors.gray}
          style={{ color: isDarkMode ? Colors.white : Colors.black }}
          placeholder="Search for a cat..."
        />
        <Button title="Add a cat" onPress={() => openCatScreen()} />
      </View>

      {state.catScreen.isOpen && <CatScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },

  appContainer: {
    paddingVertical: 10,
  },

  collectionView: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  actionMenu: {
    padding: 15,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

export { HomeScreen };
