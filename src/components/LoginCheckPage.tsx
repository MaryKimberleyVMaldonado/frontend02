import { useEffect, useState } from "react";
import axios from "axios";

interface AccountType {
  id: number;
  type: string;
}

interface User {
  id: number;
  email: string;
  accountType: AccountType;
}

const LoginCheckPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/accounts/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("No estás autenticado o ocurrió un error.");
      });
  }, []);

  // change this part for a SWEET ALERT AND DO SOME VALIDATIONS ALSP I HAVE TO DO REDIRECT TO THE DASHBOARD
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login Check Page</h2>
      {user ? (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.accountType.type}</p>
        </div>
      ) : (
        <p>{error || "Cargando..."}</p>
      )}
    </div>
  );
};

export default LoginCheckPage;