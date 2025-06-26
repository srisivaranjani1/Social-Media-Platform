import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/Auth.css';
import { FcGoogle } from 'react-icons/fc';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5001/api/login', form);
      localStorage.setItem('token', res.data.token);
      setMessage('✅ Login successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Login failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5001/api/auth/google';
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="SECE Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Log In</button>
       <button type="button" className="google-btn" onClick={handleGoogleLogin}>
              <FcGoogle style={{ fontSize: '20px', marginRight: '8px', verticalAlign: 'middle' }} />
                 <span style={{ verticalAlign: 'middle' }}>Log in with Google</span>
       </button>

        <div className="link">
          New to the platform? <Link to="/signup">Sign up</Link>
        </div>
        {message && <p className="error-message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;