import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Llama al contexto para hacer logout en el back + borrar user

      await Swal.fire({
        icon: 'success',
        title: 'Logged out',
        text: 'Hope you come back soon!',
        confirmButtonText: 'Back to login'
      });

      navigate("/login"); // Te manda a login
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: 'Something went wrong while logging out.',
      });
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
