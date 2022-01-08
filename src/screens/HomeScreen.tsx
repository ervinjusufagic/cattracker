import React, { useCallback, useContext, useEffect } from "react";

import {
  Button,
  SafeAreaView,
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
import { CollectionView } from "../components";
import { EditCatScreen, InformationScreen, AddCatScreen } from ".";

const HomeScreen = () => {
  const { state, dispatch } = useContext(StateContext);

  const isDarkMode = useColorScheme() === "dark";

  const { isLoading, isError, error, data } = useQuery<Cat[], Error>(
    "cats",
    fetchAllCats
  );

  const { cats, searchQuery } = state.homeScreen;

  const storeCats = useCallback(() => {
    if (data) {
      dispatch({ type: "STORE_CATS", cats: data });
    }
  }, [dispatch, data]);

  // store cats
  useEffect(() => {
    storeCats();
  }, [data, storeCats]);

  // search for cats
  useEffect(() => {
    // simple search for name with min 2 chars
    if (searchQuery !== "" && searchQuery.length > 1) {
      dispatch({ type: "FILTER_CATS", query: searchQuery });
    } else {
      // reset cats
      storeCats();
    }
  }, [dispatch, searchQuery, storeCats]);

  const onSelectCollectionViewItem = (cat: Cat) => {
    dispatch({
      type: "TOGGLE_EDIT_CAT_SCREEN",
      toState: true,
      selectedCat: cat,
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

      {cats.length > 0 ? (
        <CollectionView data={cats} onSelectItem={onSelectCollectionViewItem} />
      ) : (
        <InformationScreen text="No cats found :(" />
      )}

      <View style={styles.actionMenu}>
        <TextInput
          placeholderTextColor={Colors.gray}
          style={{ color: isDarkMode ? Colors.white : Colors.black }}
          placeholder="Search for a cat..."
          value={searchQuery}
          onChangeText={text =>
            dispatch({ type: "UPDATE_SEARCH_QUERY", query: text })
          }
        />
        <Button
          title="Add a cat"
          onPress={() =>
            dispatch({ type: "TOGGLE_ADD_CAT_SCREEN", toState: true })
          }
        />
      </View>

      {state.catScreen.isAddOpen && <AddCatScreen />}
      {state.catScreen.isEditOpen && <EditCatScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },

  actionMenu: {
    padding: 15,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

export { HomeScreen };
