import { useMutation, useQueryClient } from "react-query";
import { updateCat } from "../service/api";
import { Cat } from "../types";

export const useUpdateCatMutation = () => {
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

  return updateCatMutation;
};
