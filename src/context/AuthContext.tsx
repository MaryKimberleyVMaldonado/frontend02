//import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
/*
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
*/
/*
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
*/
import { createContext, useContext, useState, ReactNode } from "react";
//import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Asegúrate de tener axios instalado


interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  register: (email: string, password: string, accountType: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

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


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

