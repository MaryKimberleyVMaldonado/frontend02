import '../styles/LoginScreen.css';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Swal from 'sweetalert2';

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
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
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
          setIsLogin(true);
          setRegisterData(prev => ({ ...prev, password: '' }));
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
  };

  return (
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
  );
};

export default LoginScreen;
/**

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    accountType: 1
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'accountType' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await login(formData.email, formData.password);
        navigate("/udashboard");
      } catch (error) {
        alert("Login failed. Please check your credentials.");
      }
    } else {
      // Handle registration
      alert('Registration would be handled here');
    }
  };

  return (
    <div className="main">
      <input 
        type="checkbox" 
        id="chk" 
        aria-hidden="true"
        checked={!isLogin}
        onChange={() => setIsLogin(!isLogin)}
      />
      
      <div className={`signup ${isLogin ? 'hidden' : ''}`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
            required
          >
            <option value={1}>Client</option>
            <option value={2}>Manager</option>
          </select>
          <button type="submit">Sign up</button>
        </form>
      </div>

      <div className={`login ${!isLogin ? 'hidden' : ''}`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};





 * 
 */