const startupModel = require("../models/startup.model");


const createStartup = async (req, res) => {
     console.log("1. Request Body:", req.body);
      console.log("2. User ID from Auth:", req.user?.id);
  try {
    const { startupName, description, industry, website, fundingGoal, location } = req.body;

    const newStartup = await startupModel.create({
      startupName,
      description,
      industry,
      website,
      location,
      fundingGoal: Number(fundingGoal),
      owner: req.user.id // लॉगिन असलेल्या युजरचा ID
    });

    res.status(201).json({
      message: "Startup created successfully!",
      startup: newStartup
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const updateStartup = async (req, res) => {

  

  try {
    const { startupName, industry, fundingGoal, website, description, location } = req.body;
    
    let startup = await startupModel.findById(req.params.id);
    if (!startup) return res.status(404).json({ msg: "Startup not found" });

    if (startup.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    startup.startupName = startupName || startup.startupName;
    startup.industry = industry || startup.industry;
    startup.fundingGoal = fundingGoal || startup.fundingGoal;
    startup.website = website || startup.website;
    startup.description = description || startup.description;
    startup.location = location || startup.location;

    await startup.save();
    res.json(startup);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getUserStartups = async (req, res) => {
  try {
    const startups = await startupModel.find({ owner: req.user.id });
    res.status(200).json(startups);
  } catch (err) {
    res.status(500).json({ message: "Error fetching startups", error: err.message });
  }
};

const getAllStartups = async (req, res) => {
  try {
    const startups = await startupModel.find().populate('owner', 'name').sort({ createdAt: -1 });
    res.status(200).json(startups);
  } catch (err) {
    res.status(500).json({ message: "Error fetching startups", error: err.message });
  }
};

const getStartupById = async (req, res) => {
  try {
    const startup = await startupModel.findById(req.params.id).populate('owner', 'name');
    
    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }
    
    res.status(200).json(startup);
  } catch (err) {
    res.status(500).json({ message: "Error fetching startup details", error: err.message });
  }
};

const deleteStartup = async (req, res) => {
  try {
    const startup = await startupModel.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({ msg: "Startup not found" });
    }

    if (startup.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized to delete this" });
    }

    await startupModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Startup deleted successfully" });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};



module.exports = { createStartup, updateStartup, getUserStartups, getAllStartups, getStartupById, deleteStartup };
