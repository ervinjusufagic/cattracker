import { Platform } from "react-native";
import { Cat } from "../types";
import axios from "axios";

export const API_BASE_URL =
  Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

// Queries
export const fetchAllCats = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/cats`);
  return data;
};

//Mutations
export const addCat = async (payload: Cat) => {
  await axios.post(`${API_BASE_URL}/cats`, payload);
};

export const updateCat = async (payload: Cat) => {
  await axios.put(`${API_BASE_URL}/cats/${payload.id}`, payload);
};
