import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

// Definimos el tipo de usuario que esperamos recibir del backend
interface User {
  id: number;
  email: string;
  accountType: {
    id: number;
    type: string;
  };
}

// Definimos lo que nuestro contexto va a ofrecer a los componentes
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
}

// Creamos el contexto (vacío al principio)
const AuthContext = createContext<AuthContextType | null>(null);

// Hook para que otros componentes usen el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Componente proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Chequear si hay sesión activa preguntando al backend
  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/accounts/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  // ✅ Llamamos esto al inicio para saber si el usuario ya está logueado
  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Login: no guarda nada local, solo vuelve a chequear
  const login = async (): Promise<boolean> => {
    try {
      await checkAuth();
      return true;
    } catch (err) {
      return false;
    }
  };

  // ✅ Logout real, mandamos request al back
  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/logout", {}, {
        withCredentials: true,
      });
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        checkAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
