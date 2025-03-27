import { Routes, Route } from "react-router-dom";
import LoginScreen from "../auth/LoginScreen";
import UDashboard from "../auth/UDashboard";
import ProtectedRouter from "./ProtectedRouter";

const AppRouter = () => {
  return (
    <Routes>
    <Route path="/login" element={<LoginScreen />} />
    <Route element={
      <ProtectedRouter>
        <Route path="/udashboard" element={<UDashboard />} />
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