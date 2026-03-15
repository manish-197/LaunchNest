import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              START<span>UP</span>
            </Link>
            <p className="footer-tagline">
              The world's leading platform for startup discovery and investment. 
              Connecting the next generation of founders with global capital.
            </p>
            <div className="social-links">
              <span className="social-icon">𝕏</span>
              <span className="social-icon">in</span>
              <span className="social-icon">ig</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="footer-links">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/startups">Browse Startups</Link></li>
              <li><Link to="/create">List Your Startup</Link></li>
              <li><Link to="/about">How it Works</Link></li>
              <li><Link to="/profile">Founder Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#">Success Stories</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Get the latest startup trends in your inbox.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Startup Discovery Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;