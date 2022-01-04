import { Platform } from "react-native";

export const API_BASE_URL =
  Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

// Queries
export const fetchAllCats = async () => {
  const response = await (
    await fetch(`${API_BASE_URL}/cats`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // I added this line
      },
    })
  ).json();
  return response;
};
