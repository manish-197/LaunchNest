import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './create.css';

const Create = () => {

  const navigate = useNavigate();
  const { user } = useAuth();
 
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: user?.name || '',
    industry: '',
    fundingGoal: '',
    website: '',
    description: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentToken = localStorage.getItem('token'); 

  try {
    const config = {
      headers: { 'x-auth-token': currentToken },
        withCredentials: true,
    };

    await axios.post('/api/startup/create', formData, config);
    alert(" Startup Published Successfully!");
    navigate('/profile');
  } catch (err) {
   console.error("Backend Error:", err.message);
    alert("Error creating startup profile.");
  }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="create-page">
      <div className="form-wrapper">
        <div className="form-header">
          <h1>List Your <span>Startup</span></h1>
          <p>Fill in the details below to showcase your innovation to global investors.</p>
        </div>

        <form className="startup-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Startup Name</label>
              <input 
                type="text" name="startupName" 
                placeholder="e.g. Nexus AI" 
                onChange={handleChange} required 
              />
            </div>

            <div className="form-group">
              <label>Founder Name</label>
              <input 
                type="text" name="founderName" 
                placeholder="Full Name" 
                value={user?.name}
                required
              />
            </div>

            <div className="form-group">
              <label>Industry</label>
              <select name="industry" onChange={handleChange} required>
                <option value="">Select Industry</option>
                <option value="fintech">FinTech</option>
                <option value="healthtech">HealthTech</option>
                <option value="saas">SaaS</option>
                <option value="cleantech">CleanTech</option>
              </select>
            </div>

            <div className="form-group">
              <label>Funding Goal (INR)</label>
              <input 
                type="text" name="fundingGoal" 
                placeholder="e.g. Rs. 500,000" 
                onChange={handleChange} required 
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Website URL</label>
            <input 
              type="url" name="website" 
              placeholder="https://yourstartup.com" 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group full-width">
            <label>Startup Location</label>
            <input 
              type="text" name="location" 
              placeholder="Enter Your Startup Location" 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group full-width">
            <label>Pitch Description</label>
            <textarea 
              name="description" 
              rows="5" 
              placeholder="Describe your vision, product, and market problem you are solving..."
              onChange={handleChange} required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Publish Startup Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Create;