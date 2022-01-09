import React, { useCallback, useEffect } from "react";

import { Cat } from "../types";
import { CatScreen } from ".";
import { useAddCatMutation, useStateReducer } from "../hooks";

const AddCatScreen = () => {
  const { state, dispatch } = useStateReducer();
  const addCatMutation = useAddCatMutation();

  const { name, image, dateOfBirth, dateOfDeath, isAddDisabled } =
    state.catScreen;

  useEffect(() => {
    // death is allowed to be null
    dispatch({ type: "CHECK_IS_ADD_DISABLED" });
  }, [dispatch, dateOfBirth, image, name]);

  const closeModal = useCallback(() => {
    dispatch({ type: "TOGGLE_ADD_CAT_SCREEN", toState: false });
    dispatch({ type: "RESET_CAT_SCREEN_STATE" });
  }, [dispatch]);

  useEffect(() => {
    if (addCatMutation.isSuccess) {
      closeModal();
      //clear data
      addCatMutation.reset();
    }
  }, [addCatMutation, closeModal]);

  const triggerMutation = () => {
    const payload: Cat = {
      id: new Date().getUTCMilliseconds(),
      name: name,
      imagePath: image,
      dateOfBirth: dateOfBirth,
      dateOfDeath: dateOfDeath,
    };
    //clear data
    addCatMutation.reset();
    addCatMutation.mutateAsync(payload);
  };

  return (
    <CatScreen
      triggerMutation={() => triggerMutation()}
      mutationResult={addCatMutation}
      onClose={() => closeModal()}
      mutationButtonTitle="Add"
      isMutationButtonDisabled={isAddDisabled}
      screenTitle="Add a new cat"
    />
  );
};

export { AddCatScreen };
