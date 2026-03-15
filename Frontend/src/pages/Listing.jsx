import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./listing.css";

const Listing = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const API = axios.create({
          baseURL: import.meta.env.VITE_API_URL,
        });
        const res = await API.get("/api/startup/all");
        setStartups(res.data);
      } catch (err) {
        console.error("Error fetching startups:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, []);

  return (
    <div className="listing-page">
      <div className="listing-container">
        <header className="listing-header">
          <h1>
            Explore <span>Innovative</span> Startups
          </h1>
          <p>Discover the next big opportunity in the global market.</p>

          <div className="search-filter-bar">
            <input
              type="text"
              placeholder="Search by name or industry..."
              className="search-input"
            />
            <select className="filter-select">
              <option value="all">All Industries</option>
              <option value="fintech">FinTech</option>
              <option value="cleantech">CleanTech</option>
              <option value="saas">SaaS</option>
            </select>
          </div>
        </header>

        <div className="startup-grid">
          {startups.map((startup) => (
            <div key={startup._id} className="startup-card">
              {" "}
              <div className="card-logo">
                {startup.startupName ? startup.startupName.charAt(0) : "S"}
              </div>
              <div className="card-content">
                <span className="card-industry">{startup.industry}</span>

                <h3 className="card-name">{startup.startupName}</h3>

                <p className="card-desc">
                  {startup.description
                    ? startup.description.substring(0, 80)
                    : "No description available"}
                  ...
                </p>

                <div className="card-footer">
                  <div className="funding-info">
                    <span className="label">Funding Goal:</span>
                    <span className="amount">
                      Rs.
                      {startup.fundingGoal
                        ? startup.fundingGoal.toLocaleString()
                        : "0"}
                    </span>
                  </div>

                  <Link
                    to={`/startup/${startup._id}`}
                    className="view-details-btn"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listing;
