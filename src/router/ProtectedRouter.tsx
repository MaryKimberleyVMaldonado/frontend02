/*
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
*/
import { JSX } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

/*
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: string }) => {
  const { user, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.account_type !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
*/

interface ProtectedRouteProps {
  children: JSX.Element;
  managerOnly?: boolean;
}

const ProtectedRoute = ({ children, managerOnly = false }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Remove loading state handling as isLoading is not available

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (managerOnly && user?.account_type !== 'Manager') {
    return <Navigate to="/dashboard" replace />; // Redirect managers away from client pages
  }

  return children;
};

export default ProtectedRoute;