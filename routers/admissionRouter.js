const express = require('express');
const Admission = require('../models/AdmissionModel.js');
const admissionRouter = express.Router();


// Get all admissions
admissionRouter.get('/', async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single admission by id
admissionRouter.get('/:id', getAdmission, (req, res) => {
  res.json(res.admission);
});

// Create an admission
admissionRouter.post('/', async (req, res) => {
  const admission = new Admission({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNum: req.body.phoneNum
  });
  try {
    const newadmission = await admission.save();
    res.status(201).json(newadmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an admission by id
admissionRouter.patch('/:id', getAdmission, async (req, res) => {
  if (req.body.title != null) {
    res.admission.title = req.body.title;
  }
  if (req.body.description != null) {
    res.admission.description = req.body.description;
  }
  
  try {
    const updatedAdmission = await res.Admission.save();
    res.json(updatedAdmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an admission by id
admissionRouter.delete('/:id', async (req, res) => {
  try {
const response =   await Admission.findByIdAndDelete(req.params.id)
    if(response){
        res.json({ message: 'admission deleted' });
    } else {
        res.json({ message: 'ID not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single admission by id
async function getAdmission(req, res, next) {
  let admission;
  try {
    admission = await Admission.findById(req.params.id);
    if (admission == null) {
      return res.status(404).json({ message: 'Cannot find admission' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.admission = admission;
  next();
}

module.exports = admissionRouter;
