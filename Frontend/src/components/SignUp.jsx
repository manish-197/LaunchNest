import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./auth.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "founder",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the URL matches your server port (e.g., 5000)
     const API = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API}/api/auth/register`, formData);
      alert(response.data.msg);
      navigate("/signin"); // Redirect user to Login page after success
    } catch (err) {
      console.error("Frontend Error:", err.response?.data);
      alert(err.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            START<span>UP</span>
          </Link>
          <h2>Create Account</h2>
          <p>Join the community of innovators and investors.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>I am a...</label>
            <select name="role" className="auth-select" onChange={handleChange}>
              <option value="founder">Founder</option>
              <option value="investor">Investor</option>
            </select>
          </div>

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
