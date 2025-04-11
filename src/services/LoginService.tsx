import axios from "axios";

// En este servicio no guardamos tokens ni nada, solo mandamos login y vemos si responde bien
class LoginService {
  async loginUser(email: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password
      }, {
        withCredentials: true // \U0001f448 NECESARIO para mantener la sesi�n
      });

      return response.status === 200;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }
}

export default LoginService;
