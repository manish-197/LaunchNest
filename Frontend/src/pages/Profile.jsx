import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  const { logout, user, token } = useAuth();
  const navigate = useNavigate();
  const [myStartups, setMyStartups] = useState([]);

  useEffect(() => {
    const fetchMyStartups = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/startup/my-startups`, {
          headers: { "x-auth-token": token || localStorage.getItem("token") },
        });
        setMyStartups(res.data);
      } catch (err) {
        console.error("Error loading startups:", err);
      }
    };

    if (user) fetchMyStartups();
  }, [user, token]);

  if (!user) {
    return (
      <div className="loading-container">
        <p>Loading user details...</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this startup?")) {
      try {
        const currentToken = localStorage.getItem("token");
        const API = import.meta.env.VITE_API_URL;
        await axios.delete(`${API}/api/startup/delete/${id}`, {
          headers: { "x-auth-token": currentToken },
        });

        setMyStartups(myStartups.filter((startup) => startup._id !== id));
        alert("Startup Deleted!");
      } catch (err) {
        alert("Could not delete startup.");
      }
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="cover-photo"></div>
          <div className="profile-info-main">
            <div className="profile-avatar">
              <img
                src={user?.profileImage}
                alt={user.name ? user.name.charAt(0) : "U"}
              />
            </div>
            <div className="name-section">
              <h1>{user?.name || "User Name"}</h1>
              <p className="role-tag">
                Founder at {user?.company || "Your Startup"}
              </p>
            </div>
            <div className="profile-actions">
              <button
                className="edit-profile-btn btn"
                onClick={() => navigate("/update-profile")}
              >
                Edit Profile
              </button>
              <button className="logout-btn btn" onClick={logout}>
                Log Out
              </button>
            </div>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-left">
            <div className="profile-card">
              <h3>About Me</h3>
              <p className="bio-text">{user?.bio || "No bio available."}</p>
            </div>

            <div className="profile-card">
              <h3>Contact Information</h3>
              <div className="contact-list">
                <div className="contact-item">
                  <strong>Email: </strong>
                  {user?.email}
                </div>
                <div className="contact-item">
                  <strong>Location: </strong>
                  {user?.location || "Unknown"}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-right">
            <div className="profile-card">
              <div className="card-header">
                <h3>My Startups</h3>
                <button
                  className="edit-profile-btn btn"
                  onClick={() => navigate("/create")}
                >
                  + New
                </button>
              </div>

              <div className="startups-list">
                {myStartups.length > 0 ? (
                  myStartups.map((startup) => (
                    <div className="user-startup-item" key={startup._id}>
                      <div
                        className="startup-mini-logo"
                        onClick={() => navigate(`/startup/${startup._id}`)}
                      >
                        {startup.startupName
                          ? startup.startupName.charAt(0)
                          : "S"}
                      </div>

                      <div
                        className="startup-mini-info"
                        onClick={() => navigate(`/startup/${startup._id}`)}
                      >
                        <h4>{startup.startupName}</h4>
                        <span>Industry: {startup.industry}</span>
                      </div>

                      <div className="status-badge">Active</div>
                      <div className=" btn-u">
                        <button
                          className="btn"
                          onClick={() => navigate(`/update/${startup._id}`)}
                        >
                          Update
                        </button>
                        <button
                          className="logout-btn btn"
                          onClick={() => handleDelete(startup._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-activity">No startups listed yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
