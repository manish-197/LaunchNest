import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Auth.css";

const UpdateProfile = () => {
  const { user, token, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "founder",
    bio: "",
    location: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // इमेज प्रीव्ह्यूसाठी

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        company: user.company || "",
        role: user.role || "founder",
        bio: user.bio || "",
        location: user.location || "",
      });
      // जर युजरकडे आधीच इमेज असेल तर ती प्रीव्ह्यूमध्ये दाखवा
      if (user.profileImage) {
        setPreviewUrl(user.profileImage);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // तात्पुरती URL तयार करून फोटो दाखवणे
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentToken = localStorage.getItem("token");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("company", formData.company);
      data.append("role", formData.role);
      data.append("bio", formData.bio);
      data.append("location", formData.location);
      
      if (selectedFile) {
        // तुमच्या बॅकएंडमध्ये 'profileImage' हे नाव वापरले आहे, म्हणून इथेही तेच वापरा
        data.append("profileImage", selectedFile); 
      }

      const config = {
        headers: {
          "x-auth-token": currentToken, 
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      };

      const res = await axios.put(
        "http://localhost:3000/api/auth/update",
        data,
        config
      );

      // बॅकएंडकडून आलेला नवीन युजर डेटा अपडेट करा
      login(res.data.user, currentToken);

      alert("Profile Updated Successfully! 🎉");
      navigate("/profile");
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      alert(err.response?.data?.message || "Update failed.");
    }
  };

  if (!user) return <div className="loading">Loading User Data...</div>;

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Update Profile</h2>
          <p>Update Your Details</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          
          {/* Profile Image Preview Section */}
          <div className="profile-preview-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
             <img 
               src={previewUrl || "https://via.placeholder.com/100"} 
               alt="Preview" 
               style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #3b82f6' }} 
             />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Profile Picture</label>
            <input
              type="file"
              accept="image/*" 
              onChange={handleFileChange}
              // टीप: इथे 'value' प्रॉप वापरू नका
            />
          </div>

          <div className="input-group">
            <label>Bio (About Yourself)</label>
            <textarea
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us what you do..."
              style={{ padding: "12px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "#f8fafc" }}
            />
          </div>

          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="input-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>

            <div className="input-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="auth-select">
                <option value="founder">Founder</option>
                <option value="investor">Investor</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter Your Company Name"
              required
            />
          </div>

          <button type="submit" className="auth-btn">Save Changes</button>

          <button
            type="button"
            className="auth-footer-btn"
            onClick={() => navigate("/profile")}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", marginTop: "15px", width: "100%", textDecoration: "underline" }}
          >
            Cancel and Return to Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;