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

import { Colors } from "./utils";
import { CatCell, AdaptableText } from "./components";
import { fetchAllCats } from "./service/api";
import { StateContext } from "./store/stateContext";
import { Cat } from "./types";

import { AddCatModal } from "./components/AddCatModal";

const CatTracker = () => {
  const { state, dispatch } = useContext(StateContext);

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const { isLoading, isError, error, data } = useQuery<Cat[], Error>(
    "cats",
    fetchAllCats
  );

  if (isLoading) {
    return (
      <View style={[backgroundStyle, styles.secondaryMainView]}>
        <AdaptableText>Loading Cats ...</AdaptableText>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[backgroundStyle, styles.secondaryMainView]}>
        <AdaptableText>Could not fetch cats :(</AdaptableText>
        <AdaptableText>{error?.message ?? ""}</AdaptableText>
      </View>
    );
  }

  return (
    <SafeAreaView style={[backgroundStyle, styles.safeView]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={[
            styles.appContainer,
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            },
          ]}>
          <View style={styles.cellContainer}>
            {data?.map((cat, index) => (
              <CatCell key={index} cat={cat} />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.actionMenu}>
        <TextInput
          style={{ color: isDarkMode ? Colors.white : Colors.black }}
          placeholder="Search for a cat..."
        />
        <Button
          title="Add a cat"
          onPress={() => {
            dispatch({
              type: "TOGGLE_ADD_MODAL",
              toState: true,
            });
          }}
        />
      </View>

      {state.app.isAddModalOpen && <AddCatModal />}
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

  actionMenu: {
    padding: 15,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  secondaryMainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CatTracker;
