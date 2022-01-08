import React from "react";
import { Button, StyleSheet, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { AdaptableText } from ".";
import { DatePickerType } from "../types";

const DateSelector = ({
  onOpen,
  onConfirm,
  onCancel,
  dateOfBirth,
  dateOfDeath,
  open,
}: {
  onOpen: (type: DatePickerType) => void;
  onConfirm: (date: string) => void;
  onCancel: () => void;
  dateOfBirth: string;
  dateOfDeath: string;
  open: boolean;
}) => {
  const defaultDate = new Date();

  const hasBirthDate = dateOfBirth !== "";
  const hasDeathDate = dateOfDeath !== "";

  const birthTitle = hasBirthDate
    ? new Date(dateOfBirth).toDateString()
    : "Date of birth";
  const deathTitle = hasDeathDate
    ? new Date(dateOfDeath).toDateString()
    : "Date of death";

  return (
    <>
      <View style={styles.container}>
        <Button onPress={() => onOpen("BIRTH")} title={birthTitle} />
        <AdaptableText>-</AdaptableText>
        <Button onPress={() => onOpen("DEATH")} title={deathTitle} />
      </View>

      <DatePicker
        modal
        open={open}
        date={defaultDate}
        maximumDate={defaultDate}
        mode="date"
        onConfirm={date => onConfirm(date.toJSON())}
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
