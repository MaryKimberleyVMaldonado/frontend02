import { createContext, useContext, useState, ReactNode } from "react";
import axios from 'axios';

interface AuthContextType {
  token: string | null;
  accountType: string | null;
  isAuthenticated: boolean;
  register: (email: string, password: string, accountType: number) => Promise<void>;
  login: (token: string, accountType: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [accountType, setAccountType] = useState<string | null>(localStorage.getItem("accountType"));

  const login = (newToken: string, newAccountType: string) => {
    setToken(newToken);
    setAccountType(newAccountType);
    localStorage.setItem("token", newToken);
    localStorage.setItem("accountType", newAccountType);
  };

  const logout = () => {
    setToken(null);
    setAccountType(null);
    localStorage.removeItem("token");
    localStorage.removeItem("accountType");
  };

  const register = async (email: string, password: string, accountType: number) => {
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        email,
        password,
        accountTypeId: accountType
      });
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        accountType,
        isAuthenticated: !!token,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
