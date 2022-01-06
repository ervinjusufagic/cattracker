import React, { useContext } from "react";

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

import { AdaptableText } from "../components";
import { imageMap } from "../images";
import DatePicker from "react-native-date-picker";
import { StateContext } from "../store/stateContext";
import { Colors } from "../utils";

const AddCatModal = () => {
  const { state, dispatch } = useContext(StateContext);

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => {
        dispatch({ type: "TOGGLE_ADD_MODAL", toState: false });
      }}>
      <View style={[backgroundStyle, styles.modal]}>
        <AdaptableText style={styles.modalTitle}>Add a new cat</AdaptableText>
        <View style={styles.modalContentContainer}>
          <ScrollView horizontal>
            <View style={styles.scrollViewContent}>
              {Object.keys(imageMap).map((key, i) => (
                <TouchableOpacity key={i}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={imageMap[key]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <View>
            <TextInput style={styles.textInput} placeholder="Name..." />

            <View style={styles.dateButtonsContainer}>
              <Button title="Date of birth" />
              <AdaptableText>-</AdaptableText>
              <Button title="Death date" />
            </View>
          </View>

          <Button disabled={true} title="Add Cat" />
        </View>
      </View>

      <DatePicker
        modal
        open={false}
        date={new Date()}
        onConfirm={date => {}}
        onCancel={() => {}}
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
    marginTop: 20,
  },

  scrollViewContent: {
    height: 250,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    height: 200,
    width: 200,
    flex: 1,
    marginRight: 10,
  },

  inputContainer: {
    flex: 1,
    width: "60%",
    justifyContent: "space-between",
    marginBottom: 70,
  },

  textInput: {
    height: 30,
    fontSize: 18,
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
    marginBottom: 15,
    marginTop: 15,
  },

  dateButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export { AddCatModal };
