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
const storefile = async (data) => {
  try {
    const filedata = new FormData();
filedata.append('file',data);
    const response = await axios.post('https://reanarration-fastify-api.onrender.com/upload', filedata);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
// Create an admission
admissionRouter.post('/', async (req, res) => {
    
  
  const admission = new Admission({
    studentName: req.body.studentName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    motherTongue: req.body.motherTongue,
    fatherName: req.body.fatherName,
    fatherOccupation: req.body.fatherOccupation,
    motherName: req.body.motherName,
    motherOccupation: req.body.motherOccupation,
    bankAccountNum: req.body.bankAccountNum,
    bankName: req.body.bankName,
    bankBranch: req.body.bankBranch,
    ifscCode: req.body.ifscCode,
    whatsappNumber: req.body.whatsappNumber,
    guardianName: req.body.guardianName,
    guardianOccupation: req.body.guardianOccupation,
    nationality: req.body.nationality,
    caste: req.body.caste,
    subCaste: req.body.subCaste,
    residentialAddress: req.body.residentialAddress,
    previousSchool: req.body.previousSchool,
    schoolCode: req.body.schoolCode,
    studiedClass: req.body.studiedClass,
    medium: req.body.medium,
    isEligibleForPromotion: req.body.isEligibleForPromotion,
    daysPresentInPreviousSchool: req.body.daysPresentInPreviousSchool,
    transferCertificateNum: req.body.transferCertificateNum,
    classJoined: req.body.classJoined,
    childInfoNum: req.body.childInfoNum,
    firstLanguage: req.body.firstLanguage,
    secondLanguage: req.body.secondLanguage,
    personalMarksIdentification1: req.body.personalMarksIdentification1,
    personalMarksIdentification2: req.body.personalMarksIdentification2,
    remarks: req.body.remarks,
    acceptTerms: req.body.acceptTerms,
    signature: req.body.signature,
    passportPhoto:req.body.passportPhoto
  });
  try {

  
   
    const newadmission = await admission.save();
    res.status(201).json({message : 'Admssion submitted successully'});
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
