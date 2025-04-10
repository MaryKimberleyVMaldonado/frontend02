import '../styles/LoginScreen.css';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Swal from 'sweetalert2';
import { getAuthenticatedAccount } from "../services/AuthService"; // new service
import loginService from "../services/LoginService"; // new added service

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  accountTypeId: number;
}

const LoginScreen: React.FC = () => {
  const { login } = useAuth(); // This is the context API for authentication.
  const navigate = useNavigate(); // This is the react-router-dom hook for navigation.
  const [isLogin, setIsLogin] = useState(true); // This state determines if the user is on the login or register page.
  const [email, setEmail] = useState(""); // This state holds the email for login.
  const [pswd, setPswd] = useState(""); // This state holds the email and password for login.
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    accountTypeId: 1 // Default to Client (1)
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: name === 'accountTypeId' ? parseInt(value) : value
    }));
  };

  /*
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.accountType);
        navigate(data.accountType === 'Manager' ? '/manager-dashboard' : '/client-dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.message || 'Invalid credentials',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during login',
      });
    }
  };


// This is the updated handleLogin function with error handling and response validation
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', { // Fetch URL updated to match  backend.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password
      }),
    });

    // First check if the response is OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    // Then parse the JSON
    const data = await response.json();
    
    // Debugging logs
    console.log('Login response:', data);
    
    if (!data.token || !data.accountType) {
      throw new Error('Invalid response format from server');
    }

    login(data.token, data.accountType);
    navigate(data.accountType === 'Manager' ? '/mdashboard' : '/udashboard');
    
  } catch (error: any) {
    console.error('Login error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Login Error',
      text: error.message || 'An error occurred during login',
    });
  }
};
*/

  // This is the updated handleLogin function with error handling and response validation. 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Use the imported loginService (note lowercase 'l' if that's how it's exported)
      const service = new loginService();
      const success = await service.loginUser(loginData.email, loginData.password);
  
      if (success) {
        const user = await getAuthenticatedAccount();
        
        // Make sure your AuthContext's login function matches this signature
        login(user.token, user.accountType.type); // Pass token and account type
        
        // Redirect based on account type
        navigate(user.accountType.type === "Admin" ? "/javengers-dashboarda" : "/javengers-dashboardc");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password',
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'An error occurred during login',
      });
    }
  };

// This function fetches the authenticated account data from the backend.
async function getAuthenticatedAccount() {
  const response = await fetch('http://localhost:8080/api/accounts/me', {
    credentials: 'include'
  });
  if (!response.ok) throw new Error('Failed to fetch user data');
  return await response.json();
}

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/accounts/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registerData.email,
          password: registerData.password,
          accountTypeId: registerData.accountTypeId
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You can now login with your credentials',
        }).then(() => {
          // CODE CHAGED TO ACCESS PROFILE COMPLETION PAGE
          login(data.token, data.accountType);  // Save the token and account type
          navigate('/uprofile');  // Redirect ALL users to profile page
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: data.message || 'An error occurred during registration',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during registration',
      });
    }
  }; // end of handleRegister


  // This is the return statement for the component
   return (
    <div className="contenedor">
    <div className="main">  
      <input 
        type="checkbox" 
        id="chk" 
        aria-hidden="true" 
        checked={!isLogin}
        onChange={() => setIsLogin(!isLogin)}
      />

      <div className="signup">
        <form onSubmit={handleRegister}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required 
            value={registerData.email}
            onChange={handleRegisterChange}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            value={registerData.password}
            onChange={handleRegisterChange}
          />
          <input 
            type="number" 
            name="accountTypeId" 
            placeholder="AccountType:1:Client, 2:Manager" 
            required 
            min="1"
            max="2"
            value={registerData.accountTypeId}
            onChange={handleRegisterChange}
          />
          <button type="submit">Sign up</button>
        </form>
      </div>

      <div className="login">
        <form onSubmit={handleLogin}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required 
            value={loginData.email}
            onChange={handleLoginChange}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    </div>// added contenedor div to center the form
  );
};


export default LoginScreen;



