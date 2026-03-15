import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import "./auth.css";

const SignIn = ({ setIsLoggedIn }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await axios.post(
        `${API}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      login(res.data.user, res.data.token);
      console.log(res.data.token);
      window.location.href = "/profile";
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(err.response.data.message || "Login failed");
      } else {
        alert("Server not responding");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            START<span>UP</span>
          </Link>
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSignIn} className="auth-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="label-row">
              <label>Password</label>
              <a href="#" className="forgot-pass">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
