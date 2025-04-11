import { Routes, Route } from "react-router-dom";
import LoginScreen from "../auth/LoginScreen";
import ProfileCompletion from "../api/ProfileCompletion";
import ClientDashboard from "../api/ClientDashboard";
import ManagerDashboard from "../api/ManagerDashboard";
import ProtectedRouter from "./ProtectedRouter";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas p�blicas */}
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/" element={<LoginScreen />} />

      {/* Rutas protegidas */}
      <Route
        path="/javengers-dashboardc"
        element={
          <ProtectedRouter>
            <ClientDashboard />
          </ProtectedRouter>
        }
      />

      <Route
        path="/javengers-dashboarda"
        element={
          <ProtectedRouter managerOnly={true}>
            <ManagerDashboard />
          </ProtectedRouter>
        }
      />

      <Route
        path="/uprofile"
        element={
          <ProtectedRouter>
            <ProfileCompletion />
          </ProtectedRouter>
        }
      />

      {/* P�gina de no autorizado (opcional) */}
      <Route path="/unauthorized" element={<h1>403 - Access Denied</h1>} />
    </Routes>
  );
};

export default AppRouter;
