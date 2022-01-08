import React, { useContext } from "react";

import {
  Button,
  Modal,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import { UseMutationResult } from "react-query";

import { StateContext } from "../store/stateContext";
import { Cat, DatePickerType } from "../types";
import { Colors, getSystemColor } from "../utils";
import { AdaptableText, ImageCarousel, DateSelector } from "../components";

const CatScreen = ({
  triggerMutation,
  mutationResult,
  onClose,
  mutationButtonTitle,
  isMutationButtonDisabled,
  screenTitle,
}: {
  triggerMutation: () => void;
  mutationResult: UseMutationResult<void, unknown, Cat, unknown>;
  onClose: () => void;
  mutationButtonTitle: string;
  isMutationButtonDisabled: boolean;
  screenTitle: string;
}) => {
  const { state, dispatch } = useContext(StateContext);

  const isDarkMode = useColorScheme() === "dark";

  const selectImage = (image: string) => {
    dispatch({ type: "SELECT_CAT_IMAGE", image: image });
  };

  const openDateSelector = (type: DatePickerType) => {
    dispatch({
      type: "TOGGLE_DATEPICKER",
      toState: true,
      datePickerType: type,
    });
  };

  const confirmDateSelector = (date: string) => {
    dispatch({
      type: "SAVE_DATE",
      date: date,
      datePickerType: state.catScreen.datePicker.type,
    });
  };

  const onCancelDateSelector = () => {
    dispatch({
      type: "TOGGLE_DATEPICKER",
      toState: false,
      datePickerType: null,
    });
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => onClose()}>
      <View
        style={[{ backgroundColor: getSystemColor(isDarkMode) }, styles.modal]}>
        <AdaptableText style={styles.modalTitle}>{screenTitle}</AdaptableText>

        <View style={styles.inputContainer}>
          <View style={styles.carouselContainer}>
            <ImageCarousel
              onSelectImage={image => selectImage(image)}
              selectedImage={state.catScreen.image}
            />
            <AdaptableText style={styles.selectImageTitle}>
              Select an image.
            </AdaptableText>
          </View>

          <View style={styles.topInputContainer}>
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
              value={state.catScreen.name}
              placeholder="Name..."
            />

            <DateSelector
              open={state.catScreen.datePicker.open}
              onOpen={type => openDateSelector(type)}
              onConfirm={date => confirmDateSelector(date)}
              onCancel={() => onCancelDateSelector()}
              dateOfBirth={state.catScreen.dateOfBirth}
              dateOfDeath={state.catScreen.dateOfDeath}
            />
          </View>
          <View style={styles.bottomInputContainer}>
            {mutationResult.isError && (
              <AdaptableText>Something went wrong, try again.</AdaptableText>
            )}
            {mutationResult.isLoading ? (
              <AdaptableText>Loading...</AdaptableText>
            ) : (
              <>
                <View style={styles.addButtonContainer}>
                  <Button
                    disabled={isMutationButtonDisabled}
                    onPress={() => triggerMutation()}
                    title={mutationButtonTitle}
                  />
                </View>
                <Button onPress={() => onClose()} title="Cancel" />
              </>
            )}
          </View>
        </View>
      </View>
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
    fontSize: 36,
    marginTop: 60,
  },

  carouselContainer: {
    height: 250,
    marginBottom: 30,
  },

  inputContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
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

  topInputContainer: {
    marginBottom: 50,
  },

  bottomInputContainer: {
    alignItems: "center",
  },

  addButtonContainer: {
    marginBottom: 10,
  },

  selectImageTitle: {
    marginTop: -20,
    fontSize: 9,
  },
});

export { CatScreen };
