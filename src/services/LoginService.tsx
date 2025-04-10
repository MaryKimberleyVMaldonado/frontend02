import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

class LoginService {
  async loginUser(email: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password
    }, {
        withCredentials: true // 👈 esto es esencial
      });

      if (response.data === "Login successful") {
        return true;
      }

      return false;
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      return false;
    }
  }
}

export default LoginService;