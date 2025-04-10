import axios from "axios";

// This function is used to register a new user
export const getAuthenticatedAccount = async () => {
  const response = await axios.get("http://localhost:8080/api/accounts/me", {
    withCredentials: true
  });
  return response.data;
};