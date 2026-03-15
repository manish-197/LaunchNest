import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <NavLink to="/">
            START<span>UP</span>
          </NavLink>
        </div>

        <ul className={isMobile ? "nav-links-mobile" : "nav-links"}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <Link to="/startups">Startups</Link>
          </li>
          <li>
            <nav>
              {isLoggedIn ? (
                <Link to="/create">Create Startup</Link>
              ) : (
                <Link to="/">Contact</Link>
              )}
            </nav>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <nav>
              {isLoggedIn ? (
                <Link to="/profile">Profile</Link>
                
              ) : (
                <Link to="/signin">Login</Link>
              )}
            </nav>
          </li>
        </ul>

        <button className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isMobile ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
