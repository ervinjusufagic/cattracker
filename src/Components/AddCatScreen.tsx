import React, { useContext, useEffect } from "react";

import {
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { useMutation, useQueryClient } from "react-query";
import DatePicker from "react-native-date-picker";

import { StateContext } from "../store/stateContext";
import { addCat } from "../service/api";
import { Cat } from "../types";
import { Colors, getSystemColor } from "../utils";
import { imageMap } from "../images";
import { AdaptableText } from ".";

const AddCatScreen = () => {
  const { state, dispatch } = useContext(StateContext);

  const queryClient = useQueryClient();
  const isDarkMode = useColorScheme() === "dark";

  const { mutateAsync, isLoading, isError, isSuccess, reset } = useMutation(
    (cat: Cat) => {
      return addCat(cat);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cats");
      },
    }
  );

  const dateOfBirthTitle = state.addModal.dateOfBirth
    ? state.addModal.dateOfBirth.toDateString()
    : "Date of birth";

  const dateOfDeathTitle = state.addModal.dateOfDeath
    ? state.addModal.dateOfDeath.toDateString()
    : "Date of death";

  useEffect(() => {
    dispatch({ type: "CHECK_IS_ADD_DISABLED" });
  }, [
    dispatch,
    state.addModal.dateOfBirth,
    state.addModal.image,
    state.addModal.name,
  ]);

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "RESET_STATE" });
      dispatch({ type: "TOGGLE_ADD_MODAL", toState: false });
      reset();
    }
  }, [dispatch, isSuccess, reset]);

  const addNewCat = () => {
    reset();
    const newCat: Cat = {
      id: new Date().getUTCMilliseconds(),
      name: state.addModal.name,
      imagePath: state.addModal.image,
      dateOfBirth: state.addModal.dateOfBirth?.toDateString(),
      dateOfDeath: state.addModal.dateOfDeath?.toDateString(),
    };

    mutateAsync(newCat);
  };

  const closeModal = () => {
    dispatch({ type: "TOGGLE_ADD_MODAL", toState: false });
    dispatch({ type: "RESET_STATE" });
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => closeModal()}>
      <View
        style={[{ backgroundColor: getSystemColor(isDarkMode) }, styles.modal]}>
        <AdaptableText style={styles.modalTitle}>Add a new cat</AdaptableText>
        <View style={styles.modalContentContainer}>
          <ScrollView horizontal>
            <View style={styles.scrollViewContent}>
              {Object.keys(imageMap).map((key, i) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch({ type: "SELECT_CAT_IMAGE", image: key });
                  }}
                  key={i}>
                  <Image
                    resizeMode="contain"
                    style={[
                      styles.image,
                      state.addModal.image === key && styles.selectedImage,
                    ]}
                    source={imageMap[key]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <View>
            <TextInput
              placeholderTextColor={Colors.gray}
              style={[
                styles.textInput,
                {
                  color: getSystemColor(!isDarkMode),
                  borderBottomColor: getSystemColor(!isDarkMode),
                },
              ]}
              onChangeText={text => dispatch({ type: "SET_NAME", name: text })}
              value={state.addModal.name}
              placeholder="Name..."
            />

            <View style={styles.dateButtonsContainer}>
              <Button
                onPress={() =>
                  dispatch({
                    type: "TOGGLE_DATEPICKER",
                    toState: true,
                    kind: "BIRTH",
                  })
                }
                title={dateOfBirthTitle}
              />
              <AdaptableText>-</AdaptableText>
              <Button
                onPress={() =>
                  dispatch({
                    type: "TOGGLE_DATEPICKER",
                    toState: true,
                    kind: "DEATH",
                  })
                }
                title={dateOfDeathTitle}
              />
            </View>
          </View>

          <View style={styles.bottomContainer}>
            {isError && (
              <AdaptableText>Something went wrong, try again.</AdaptableText>
            )}
            {isLoading ? (
              <AdaptableText>Loading...</AdaptableText>
            ) : (
              <>
                <View style={styles.addButtonContainer}>
                  <Button
                    disabled={state.addModal.isAddDisabled}
                    onPress={() => addNewCat()}
                    title="Add Cat"
                  />
                </View>
                <Button onPress={() => closeModal()} title="Cancel" />
              </>
            )}
          </View>
        </View>
      </View>

      <DatePicker
        modal
        open={state.addModal.datePicker.open}
        date={new Date()}
        maximumDate={new Date()}
        mode="date"
        onConfirm={date =>
          dispatch({
            type: "SAVE_DATE",
            date: date,
            kind: state.addModal.datePicker.kind,
          })
        }
        onCancel={() =>
          dispatch({
            type: "TOGGLE_DATEPICKER",
            toState: false,
            kind: null,
          })
        }
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 24,
  },

  modalContentContainer: {
    height: 250,
    marginTop: 0,
  },

  scrollViewContent: {
    height: 250,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 200,
    height: 200,
    marginRight: 10,
  },

  inputContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 70,
    padding: 10,
  },

  textInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: "center",
  },

  dateButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectedImage: {
    borderColor: "#007AFF",
    borderWidth: 1,
  },

  bottomContainer: {
    alignItems: "center",
  },

  addButtonContainer: { marginBottom: 10 },
});

export { AddCatScreen };
