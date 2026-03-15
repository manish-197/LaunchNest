import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-page">
      {/* --- Mission Header --- */}
      <section className="about-hero">
        <div className="about-container">
          <span className="tagline">Our Mission</span>
          <h1>Empowering the Next Generation of <span>Innovators</span></h1>
          <p className="about-lead">
            We believe that great ideas shouldn't be limited by geographic boundaries or closed networks. 
            Our platform was built to democratize the startup funding process.
          </p>
        </div>
      </section>

      {/* --- Vision & Values --- */}
      <section className="values-section">
        <div className="about-container">
          <div className="values-grid">
            <div className="value-item">
              <h2>01</h2>
              <h3>Accessibility</h3>
              <p>Giving every founder, regardless of their location, a fair chance to present their vision to global investors.</p>
            </div>
            <div className="value-item">
              <h2>02</h2>
              <h3>Transparency</h3>
              <p>Building a transparent ecosystem where data drives decisions and communication is direct and honest.</p>
            </div>
            <div className="value-item">
              <h2>03</h2>
              <h3>Efficiency</h3>
              <p>Reducing the months-long fundraising cycle to weeks by streamlining discovery and initial contact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Who We Serve --- */}
      <section className="audience-section">
        <div className="about-container">
          <div className="audience-card-wrapper">
            <div className="audience-card">
              <div className="audience-icon">🚀</div>
              <h3>For Founders</h3>
              <p>Stop chasing warm intros. Build your profile once, showcase your metrics, and let the right investors find you.</p>
            </div>
            <div className="audience-card">
              <div className="audience-icon">💼</div>
              <h3>For Investors</h3>
              <p>Access a curated pipeline of innovative startups. Use high-level filters to find projects that align with your thesis.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;