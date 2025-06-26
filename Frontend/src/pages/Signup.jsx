import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/Auth.css';
import { FcGoogle } from 'react-icons/fc';


const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5001/api/signup', form);
      localStorage.setItem('token', res.data.token);
      setMessage('✅ Signup successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Signup failed');
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:5001/api/auth/google';
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="SECE Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
        <button type="button" className="google-btn" onClick={handleGoogleSignup}>
          <FcGoogle style={{ fontSize: '20px', marginRight: '8px', verticalAlign: 'middle' }} />
          <span style={{ verticalAlign: 'middle' }}>Sign up with Google</span>
        </button>

        <div className="link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
        {message && <p className="error-message">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;