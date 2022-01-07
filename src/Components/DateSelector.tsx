import React from "react";
import { Button, StyleSheet, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { AdaptableText } from ".";
import { DatePickerType } from "../types";

const DateSelector = ({
  onOpen,
  onConfirm,
  onCancel,
  dateOfBirthTitle,
  dateOfDeathTitle,
  open,
}: {
  onOpen: (type: DatePickerType) => void;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  dateOfBirthTitle: string;
  dateOfDeathTitle: string;
  open: boolean;
}) => {
  const defaultDate = new Date();

  return (
    <>
      <View style={styles.container}>
        <Button onPress={() => onOpen("BIRTH")} title={dateOfBirthTitle} />
        <AdaptableText>-</AdaptableText>
        <Button onPress={() => onOpen("DEATH")} title={dateOfDeathTitle} />
      </View>

      <DatePicker
        modal
        open={open}
        date={defaultDate}
        maximumDate={defaultDate}
        mode="date"
        onConfirm={date => onConfirm(date)}
        onCancel={() => onCancel()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export { DateSelector };
