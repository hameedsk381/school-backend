const mongoose = require('mongoose');

// Define the schema for the Material model
const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  selectedClass: {
    type: String,
    required: true
  },
  fileLocations: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model based on the schema
const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
