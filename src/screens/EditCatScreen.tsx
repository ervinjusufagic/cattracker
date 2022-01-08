import React, { useCallback, useContext, useEffect } from "react";

import { useMutation, useQueryClient } from "react-query";

import { StateContext } from "../store/stateContext";
import { updateCat } from "../service/api";
import { Cat } from "../types";
import { CatScreen } from ".";

const EditCatScreen = () => {
  const { state, dispatch } = useContext(StateContext);

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
  }, [
    dispatch,
    state.catScreen.dateOfDeath,
    state.catScreen.dateOfBirth,
    state.catScreen.image,
    state.catScreen.name,
  ]);

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
    if (!state.catScreen.selectedCat?.id) {
      return;
    }
    const payload: Cat = {
      id: state.catScreen.selectedCat.id,
      name: state.catScreen.name,
      imagePath: state.catScreen.image,
      dateOfBirth: state.catScreen.dateOfBirth,
      dateOfDeath: state.catScreen.dateOfDeath,
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
      isMutationButtonDisabled={state.catScreen.isEditDisabled}
      screenTitle="Edit cat"
    />
  );
};

export { EditCatScreen };
