const express = require('express');
const subjectsrouter = express.Router();
const {
  getPredefinedSubjects,
  getPredefinedSubjectById,
  addPredefinedSubject,
  updatePredefinedSubject,
  deletePredefinedSubject
} = require('../controllers/predefinedSubjectsController');

// GET route to retrieve all predefined subjects
subjectsrouter.get('/predefined-subjects', getPredefinedSubjects);

// GET route to retrieve a predefined subject by ID
subjectsrouter.get('/predefined-subjects/:id', getPredefinedSubjectById);

// POST route to add a predefined subject
subjectsrouter.post('/predefined-subjects', addPredefinedSubject);

// PUT route to update a predefined subject
subjectsrouter.put('/predefined-subjects/:id', updatePredefinedSubject);

// DELETE route to delete a predefined subject
subjectsrouter.delete('/predefined-subjects/:id', deletePredefinedSubject);

module.exports = subjectsrouter;
