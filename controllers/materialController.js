const Material = require('../models/materialModel');
const axios = require('axios');


// Controller function to submit a new material
const submitMaterial = async (req, res) => {
  const { title, subject, selectedClass ,fileLocations } = req.body;


  // Validate required fields
  if (!title || !subject || !selectedClass ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
 

    // Create a new Material document
    const newMaterial = new Material({
      title,
      subject,
      selectedClass,
      fileLocations
    });

    // Save the new Material document to the database
  await newMaterial.save();

    res.status(201).json({ message: 'Material submitted successfully' });
  } catch (error) {
    console.error('Failed to submit material:', error);
    res.status(500).json({ message: 'Failed to submit material', error: error.message });
  }
};
const getAllMaterials = async (req,res) => {

try {
  const materials = await Material.find({});
  res.status(200).json(materials);
} catch (error) {
  console.error('Failed to submit material:', error);
  res.status(500).json({ message: 'Failed to get materials', error: error.message });
}
}
module.exports = {
  submitMaterial,getAllMaterials
};
