export const API_BASE_URL = "http://localhost:3000";

// Queries
export const fetchAllCats = async () => {
  const response = await (await fetch(`${API_BASE_URL}/cats`)).json();
  return response;
};
