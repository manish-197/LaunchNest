import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";


const Navbar = () => {
  // सुरुवातीला menu बंद असायला हवा म्हणून false ठेवा
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <NavLink to="/">START<span>UP</span></NavLink>
        </div>

        <ul className={isMobileOpen ? "nav-links-mobile open" : "nav-links"}>
          <li><NavLink to="/" onClick={() => setIsMobileOpen(false)}>Home</NavLink></li>
          <li><Link to="/startups" onClick={() => setIsMobileOpen(false)}>Startups</Link></li>
          <li>
            {isLoggedIn ? (
              <Link to="/create" onClick={() => setIsMobileOpen(false)}>Create Startup</Link>
            ) : (
              <Link to="/" onClick={() => setIsMobileOpen(false)}>Contact</Link>
            )}
          </li>
          <li><NavLink to="/about" onClick={() => setIsMobileOpen(false)}>About</NavLink></li>
          <li>
            {isLoggedIn ? (
              <Link to="/profile" onClick={() => setIsMobileOpen(false)}>Profile</Link>
            ) : (
              <Link to="/signin" onClick={() => setIsMobileOpen(false)}>Login</Link>
            )}
          </li>
        </ul>

        {/* बटन क्लिक केल्यावर स्टेट टॉगल करा */}
        <button 
          className="mobile-menu-icon" 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;