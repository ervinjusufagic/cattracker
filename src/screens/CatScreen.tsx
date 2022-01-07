import React, { useCallback, useContext, useEffect } from "react";

import {
  Button,
  Modal,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import { useMutation, useQueryClient } from "react-query";

import { StateContext } from "../store/stateContext";
import { addCat } from "../service/api";
import { Cat, DatePickerType } from "../types";
import { Colors, getSystemColor } from "../utils";
import { AdaptableText, ImageCarousel, DateSelector } from "../components";

const CatScreen = () => {
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

  const catScreenTitle =
    state.catScreen.type === "ADD" ? "Add a new cat" : `Edit cat`;

  const mutationTriggerButtonText =
    state.catScreen.type === "ADD" ? "Add" : "Confirm";

  const dateOfBirthTitle = state.catScreen.dateOfBirth
    ? state.catScreen.dateOfBirth.toDateString()
    : "Date of birth";

  const dateOfDeathTitle = state.catScreen.dateOfDeath
    ? state.catScreen.dateOfDeath.toDateString()
    : "Date of death";

  useEffect(() => {
    dispatch({ type: "CHECK_IS_ADD_DISABLED" });
  }, [
    dispatch,
    state.catScreen.dateOfBirth,
    state.catScreen.image,
    state.catScreen.name,
  ]);

  const closeModal = useCallback(() => {
    dispatch({ type: "TOGGLE_CATSCREEN", toState: false });
    dispatch({ type: "RESET_CATSCREEN_STATE" });
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      reset();
    }
  }, [closeModal, isSuccess, reset]);

  const addNewCat = () => {
    reset();
    const newCat: Cat = {
      id: new Date().getUTCMilliseconds(),
      name: state.catScreen.name,
      imagePath: state.catScreen.image,
      dateOfBirth: state.catScreen.dateOfBirth?.toDateString(),
      dateOfDeath: state.catScreen.dateOfDeath?.toDateString(),
    };

    mutateAsync(newCat);
  };

  const editCat = () => {};

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

  const confirmDateSelector = (date: Date) => {
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
      onRequestClose={() => closeModal()}>
      <View
        style={[{ backgroundColor: getSystemColor(isDarkMode) }, styles.modal]}>
        <AdaptableText style={styles.modalTitle}>
          {catScreenTitle}
        </AdaptableText>

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
              dateOfBirthTitle={dateOfBirthTitle}
              dateOfDeathTitle={dateOfDeathTitle}
            />
          </View>
          <View style={styles.bottomInputContainer}>
            {isError && (
              <AdaptableText>Something went wrong, try again.</AdaptableText>
            )}
            {isLoading ? (
              <AdaptableText>Loading...</AdaptableText>
            ) : (
              <>
                <View style={styles.addButtonContainer}>
                  <Button
                    disabled={state.catScreen.isAddDisabled}
                    onPress={() =>
                      state.catScreen.type === "ADD" ? addNewCat() : editCat()
                    }
                    title={mutationTriggerButtonText}
                  />
                </View>
                <Button onPress={() => closeModal()} title="Cancel" />
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
