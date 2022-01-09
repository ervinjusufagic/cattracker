import { useMutation, useQueryClient } from "react-query";
import { Cat } from "../types";
import { addCat } from "../service/api";

export const useAddCatMutation = () => {
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

  return addCatMutation;
};
