import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/accounts";

interface RegisterResponse {
  account_id: number;
  email: string;
  account_type: string;
}

class RegisterService {
  async registerUser(email: string, password: string, accountTypeId: number): Promise<RegisterResponse | null> {
    try {
      const response = await axios.post(`${API_BASE_URL}/accounts/register`, {
        email,
        password,
        accountTypeId
      });
      
      // Verify the response contains the expected data
      if (!response.data?.account_id) {
        throw new Error('Invalid response from server');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error; // Re-throw to handle in the UI
    }
  }
}

export default new RegisterService();

/*
interface RegisterData {
  email: string;
  password: string;
  accountType: number; // 1 for client, 2 for manager
  firstName?: string;
  lastName?: string;
}

class RegisterService {
  getAccountTypes(): Promise<AxiosResponse> {
    return axios.get(`${API_BASE_URL}/types`);
  }

  registerUser(data: RegisterData): Promise<AxiosResponse> {
    return axios.post(`${API_BASE_URL}/register`, data);
  }
}

*/