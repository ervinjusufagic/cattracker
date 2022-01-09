import { useQuery } from "react-query";
import { Cat } from "../types";
import { fetchAllCats } from "../service/api";

export const useFetchCats = () => {
  const { isLoading, isError, error, data } = useQuery<Cat[], Error>(
    "cats",
    fetchAllCats
  );

  return { isLoading, isError, error, data };
};
