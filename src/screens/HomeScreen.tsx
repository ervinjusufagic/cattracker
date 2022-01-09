import React, { useEffect } from "react";

import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import { Colors, getSystemColor } from "../utils";
import { Cat } from "../types";
import { CollectionView } from "../components";
import { EditCatScreen, UserInformationScreen, AddCatScreen } from ".";
import { useFetchCats } from "../hooks/useFetchCats";
import { useStateReducer } from "../hooks";

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === "dark";

  const { state, dispatch } = useStateReducer();
  const { isLoading, isError, error, data } = useFetchCats();

  const { cats, searchQuery } = state.homeScreen;

  useEffect(() => {
    // simple search for name with min 2 chars
    if (searchQuery !== "" && searchQuery.length > 1) {
      dispatch({ type: "FILTER_CATS", query: searchQuery });
    } else {
      // store / reset cats
      if (data) {
        dispatch({ type: "STORE_CATS", cats: data });
      }
    }
  }, [dispatch, searchQuery, data]);

  const onSelectCollectionViewItem = (cat: Cat) => {
    dispatch({
      type: "TOGGLE_EDIT_CAT_SCREEN",
      toState: true,
      selectedCat: cat,
    });
  };

  if (isLoading) {
    return <UserInformationScreen text="Loading..." />;
  }

  if (isError) {
    return (
      <UserInformationScreen
        text={error?.message ?? "Could not fetch cats :("}
      />
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
        <UserInformationScreen text="No cats found :(" />
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
          accessibilityLabel="Add a cat"
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
