import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  managerOnly?: boolean; // para rutas que solo Admins pueden ver
}

const ProtectedRouter = ({ children, managerOnly = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  // No está logueado → al login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Si es una ruta solo para Admin, y el tipo no es Admin → lo echamos
  if (managerOnly && user.accountType.type !== "Admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // Todo bien → mostrale el contenido
  return <>{children}</>;
};

export default ProtectedRouter;
