const Material = require('../models/materialModel');
const axios = require('axios');

// Function to handle file upload to external API
const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('https://reanarration-fastify-api.vercel.app/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data; // Assuming API response contains the URL of the uploaded file
  } catch (error) {
    console.error('Failed to upload image', error);
    throw new Error('Failed to upload image');
  }
};

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
    const savedMaterial = await newMaterial.save();

    res.status(201).json({ message: 'Material submitted successfully', material: savedMaterial });
  } catch (error) {
    console.error('Failed to submit material:', error);
    res.status(500).json({ message: 'Failed to submit material', error: error.message });
  }
};

module.exports = {
  submitMaterial
};
