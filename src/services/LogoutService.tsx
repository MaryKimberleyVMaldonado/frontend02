import axios from "axios";

export const logoutUser = async () => {
  await axios.post("http://localhost:8080/api/auth/logout", {}, {
    withCredentials: true
  });
};