import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../pages/create.css";

const UpdateStartup = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    startupName: "",
    founderName: user?.name || "",
    industry: "",
    fundingGoal: "",
    website: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    const fetchOldData = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/startup/${id}`);
        const data = res.data;
        setFormData({
          startupName: data.startupName || "",
          founderName: user?.name || "",
          industry: data.industry || "",
          fundingGoal: data.fundingGoal || "",
          website: data.website || "",
          description: data.description || "",
          location: data.location || "",
        });
      } catch (err) {
        console.error("Error fetching old data:", err);
      }
    };
    fetchOldData();
  }, [id, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const API = import.meta.env.VITE_API_URL;
      await API.put(`${API}/api/startup/update/${id}`, formData, {
        headers: { "x-auth-token": token },
      });
      alert("Startup Updated Successfully! 🎉");
      navigate("/profile");
    } catch (err) {
      alert("Update failed!");
    }
  };

  return (
    <div className="create-page">
      <div className="form-wrapper">
        <div className="form-header">
          <h1>
            Update <span>Startup</span>
          </h1>
          <p>Modify your startup details</p>
        </div>

        <form className="startup-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Startup Name</label>
              <input
                type="text"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Founder Name (Read Only)</label>
              <input
                type="text"
                name="founderName"
                value={formData.founderName}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
              >
                <option value="fintech">FinTech</option>
                <option value="saas">SaaS</option>
                <option value="healthtech">HealthTech</option>
                <option value="cleantech">CleanTech</option>
              </select>
            </div>

            <div className="form-group">
              <label>Funding Goal (INR)</label>
              <input
                type="number"
                name="fundingGoal"
                value={formData.fundingGoal}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Website URL</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Pitch Description</label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div
            className="button-group"
            style={{ display: "flex", gap: "10px" }}
          >
            <button type="submit" className="submit-btn">
              Update Profile
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/profile")}
              style={{
                background: "#e2e8f0",
                color: "#475569",
                padding: "12px 25px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStartup;
