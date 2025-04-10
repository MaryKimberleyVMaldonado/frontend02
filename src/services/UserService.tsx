import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/accounts";

export interface AccountResponse {
  id: number;
  email: string;
  accountType: {
    id: number;
    type: string;
  };
}

class UserService {
  async getCurrentUser(): Promise<AccountResponse | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return null;
    }
  }
}

export default new UserService();