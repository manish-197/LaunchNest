import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';



const Home = () => {
 

  return (
    <div className="home-page" >
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to the Future of <br />
            <span>Startup Discovery</span>
          </h1>
          <p className="hero-subtitle">
            Connecting visionary founders with strategic investors. 
            The most efficient way to discover, showcase, and fund innovation globally.
          </p>
          <div className="hero-buttons">
            <Link to="/startups" className="btn btn-primary-home">Explore Startups</Link>
            <Link to="/create" className="btn btn-secondary-home">List Your Startup</Link>
          </div>
        </div>
      </section>

      {/* --- WHY USE THIS PLATFORM --- */}
      <section className="why-section">
        <div className="section-container">
          <h2 className="section-title">Why Use This Platform?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">🚀</div>
              <h3>Rapid Exposure</h3>
              <p>Skip the networking events. Get your pitch deck in front of hundreds of verified investors instantly.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🎯</div>
              <h3>Targeted Matching</h3>
              <p>Our smart filters ensure investors only see startups that match their industry and funding stage preferences.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🔒</div>
              <h3>Trust & Safety</h3>
              <p>Verified profiles for both founders and investors to ensure high-quality and secure connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRADITIONAL VS MODERN METHOD --- */}
      <section className="comparison-section">
        <div className="section-container">
          <h2 className="section-title">The Evolution of Fundraising</h2>
          <div className="comparison-grid">
            {/* Traditional Side */}
            <div className="comparison-box traditional">
              <h3>Traditional Method</h3>
              <ul>
                <li><span>✕</span> Months spent chasing warm introductions</li>
                <li><span>✕</span> Limited to your local geographic network</li>
                <li><span>✕</span> Sending endless PDF decks via email</li>
                <li><span>✕</span> Unclear feedback and slow response times</li>
              </ul>
            </div>

            {/* Modern Side */}
            <div className="comparison-box modern">
              <h3>Our Modern Method</h3>
              <ul>
                <li><span>✓</span> Instant global visibility to all users</li>
                <li><span>✓</span> Location-independent digital fundraising</li>
                <li><span>✓</span> Interactive profile with real-time updates</li>
                <li><span>✓</span> Direct dashboard messaging and analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>Ready to build something great?</h2>
          <p>Join thousands of entrepreneurs who have already started their journey.</p>
          <Link to="/create" className="btn btn-light">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;