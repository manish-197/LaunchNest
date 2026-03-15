const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  startupName: { type: String, required: true },
  description: { type: String, required: true },
  industry: { type: String, required: true },
  website: { type: String },
  fundingGoal: { type: Number, default: 0 },
  location: { type: String },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('startup', startupSchema);