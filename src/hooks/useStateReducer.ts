import { useContext } from "react";
import { StateContext } from "../store/stateContext";

export const useStateReducer = () => {
  const { state, dispatch } = useContext(StateContext);

  return { state, dispatch };
};
