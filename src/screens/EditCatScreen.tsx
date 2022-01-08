import React, { useCallback, useContext, useEffect } from "react";

import { useMutation, useQueryClient } from "react-query";

import { StateContext } from "../store/stateContext";
import { updateCat } from "../service/api";
import { Cat } from "../types";
import { CatScreen } from ".";

const EditCatScreen = () => {
  const { state, dispatch } = useContext(StateContext);

  const { name, image, dateOfBirth, dateOfDeath, isEditDisabled, selectedCat } =
    state.catScreen;

  const queryClient = useQueryClient();

  const updateCatMutation = useMutation(
    (cat: Cat) => {
      return updateCat(cat);
    },
    {
      onSuccess: () => {
        //refetch cats
        queryClient.invalidateQueries("cats");
      },
    }
  );

  useEffect(() => {
    //check if component data and selected cat is the same
    dispatch({ type: "CHECK_IS_EDIT_DISABLED" });
  }, [dispatch, dateOfDeath, dateOfBirth, image, name]);

  const closeModal = useCallback(() => {
    dispatch({ type: "TOGGLE_EDIT_CAT_SCREEN", toState: false });
    dispatch({ type: "RESET_CAT_SCREEN_STATE" });
  }, [dispatch]);

  useEffect(() => {
    if (updateCatMutation.isSuccess) {
      closeModal();
      //clear data
      updateCatMutation.reset();
    }
  }, [updateCatMutation, closeModal]);

  const triggerMutation = () => {
    //null check
    if (!selectedCat?.id) {
      return;
    }
    const payload: Cat = {
      id: selectedCat.id,
      name: name,
      imagePath: image,
      dateOfBirth: dateOfBirth,
      dateOfDeath: dateOfDeath,
    };
    //clear data
    updateCatMutation.reset();
    updateCatMutation.mutateAsync(payload);
  };

  return (
    <CatScreen
      triggerMutation={() => triggerMutation()}
      mutationResult={updateCatMutation}
      onClose={() => closeModal()}
      mutationButtonTitle="Confirm"
      isMutationButtonDisabled={isEditDisabled}
      screenTitle="Edit cat"
    />
  );
};

export { EditCatScreen };
