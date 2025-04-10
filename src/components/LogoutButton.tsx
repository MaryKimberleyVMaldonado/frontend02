import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/LogoutService";



export const handleLogout = () => {
    console.log('Logging out...');
    console.log("LogoutButton cargado");
    sessionStorage.clear();
    window.location.href = '/login'; // Redirect to login page
  };
  
  const LogoutButton = () => (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
  
  export default LogoutButton;

  