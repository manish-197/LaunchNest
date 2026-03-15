import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./details.css";

const Details = () => {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/startup/${id}`);
        setStartup(res.data);
      } catch (err) {
        console.error("Error loading details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStartupDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading details...</div>;
  if (!startup) return <div className="error">Startup not found!</div>;

  return (
    <div className="details-page">
      <div className="details-container">
        <Link onClick={() => navigate(-1)} className="back-link">
          ← Back to Explore
        </Link>
        {/* <button className='back-link' onClick={() => navigate(-1)}>← Back to Explore</button> */}

        <div className="details-main-grid">
          <div className="details-left">
            <header className="details-header">
              <div className="details-logo-large">
                {startup.startupName?.charAt(0)}
              </div>
              <div className="details-title-box">
                <span className="industry-pill">{startup.industry}</span>
                <h1>{startup.startupName}</h1>
                <p className="founder-name">
                  Founded by{" "}
                  <strong>{startup.owner?.name || "Anonymous"}</strong>
                </p>
              </div>
            </header>

            <section className="details-section">
              <h3>About the Startup</h3>
              <p>{startup.description}</p>
            </section>

            <section className="details-section">
              <h3>Official Website</h3>
              <a
                href={startup.website}
                target="_blank"
                rel="noreferrer"
                className="website-link"
              >
                {startup.website}
              </a>
            </section>
          </div>

          <div className="details-sidebar">
            <div className="sidebar-card funding-card">
              <p className="sidebar-label">Funding Requirement</p>
              <h2 className="funding-amount">
                Rs.{startup.fundingGoal?.toLocaleString()}
              </h2>
              <button className="connect-btn">Connect with Founder</button>
              <p className="security-note">🔒 Verified Business</p>
            </div>

            <div className="sidebar-card info-list-card">
              <div className="info-item">
                <span>Location</span>
                <strong>{startup.location || "Remote / Global"}</strong>
              </div>
              <div className="info-item">
                <span>Industry</span>
                <strong>{startup.industry}</strong>
              </div>
              <div className="info-item">
                <span>Date Listed</span>
                <strong>
                  {new Date(startup.createdAt).toLocaleDateString()}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
