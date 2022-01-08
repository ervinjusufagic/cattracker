import React, { useCallback, useContext, useEffect } from "react";

import { useMutation, useQueryClient } from "react-query";

import { StateContext } from "../store/stateContext";
import { addCat } from "../service/api";
import { Cat } from "../types";
import { CatScreen } from ".";

const AddCatScreen = () => {
  const { state, dispatch } = useContext(StateContext);

  const queryClient = useQueryClient();

  const addCatMutation = useMutation(
    (cat: Cat) => {
      return addCat(cat);
    },
    {
      onSuccess: () => {
        //refetch cats
        queryClient.invalidateQueries("cats");
      },
    }
  );

  useEffect(() => {
    // death is allowed to be null
    dispatch({ type: "CHECK_IS_ADD_DISABLED" });
  }, [
    dispatch,
    state.catScreen.dateOfBirth,
    state.catScreen.image,
    state.catScreen.name,
  ]);

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
      name: state.catScreen.name,
      imagePath: state.catScreen.image,
      dateOfBirth: state.catScreen.dateOfBirth,
      dateOfDeath: state.catScreen.dateOfDeath,
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
      isMutationButtonDisabled={state.catScreen.isAddDisabled}
      screenTitle="Add a new cat"
    />
  );
};

export { AddCatScreen };
