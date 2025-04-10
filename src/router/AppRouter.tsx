import { Routes, Route } from "react-router-dom";
import LoginScreen from "../auth/LoginScreen";
import UDashboard from "../auth/UDashboard";
import ProtectedRouter from "./ProtectedRouter";
import ProfileCompletion from "../api/ProfileCompletion";
import ClientDashboard from "../api/ClientDashboard";
import ManagerDashboard from "../api/ManagerDashboard";

const AppRouter = () => {
  return (
    <Routes>
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/" element={<LoginScreen />} />
    <Route path="/javengers-dashboardc" element={<ClientDashboard/>} /> {/* CHANGE TO PRIVATE ROUTE*/}
        <Route path="/javengers-dashboarda" element={<ManagerDashboard/>} /> {/* CHANGE TO PRIVATE ROUTE*/}
        <Route path="/uprofile" element={<ProfileCompletion/>} /> {/* CHANGE TO PRIVATE ROUTE*/}   
    
    <Route element={
      <ProtectedRouter>
        <Route path="/udashboard" element={<UDashboard />} /> {/*ELIMINATE*/}

      </ProtectedRouter>
    } />
  </Routes>
  );
};

export default AppRouter;

/*



<Routes>
  <Route path="/login" element={<LoginScreen />} />
  <Route path="/udashboard" element={
    <ProtectedRouter>
      <UDashboard />
    </ProtectedRouter>
  } />
  <Route path="/mdashboard" element={
    <ProtectedRouter>
      <UDashboard />
    </ProtectedRouter>
  } />
  <Route path="/admin" element={
    <ProtectedRouter requiredRole="Manager">
      <AdminPanel />
    </ProtectedRouter>
  } />
</Routes>





*/