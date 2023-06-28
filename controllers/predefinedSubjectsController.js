const PredefinedSubjects = require("../models/subjectModel");


// Get all predefined subjects
const getPredefinedSubjects = async (req, res) => {
  try {
    const predefinedSubjects = await PredefinedSubjects.find();
    res.status(200).json(predefinedSubjects);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the predefined subjects.' });
  }
};

// Get a predefined subject by ID
const getPredefinedSubjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const predefinedSubject = await PredefinedSubjects.findById(id);
    if (!predefinedSubject) {
      return res.status(404).json({ error: 'Predefined subject not found.' });
    }
    res.status(200).json(predefinedSubject);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the predefined subject.' });
  }
};

// Add a predefined subject
const addPredefinedSubject = async (req, res) => {
  const { className, subjects } = req.body;
  console.log(className);

  try {
    const predefinedSubject = new PredefinedSubjects({ name:className, subjects });
    await predefinedSubject.save();
    res.status(201).json({ message: 'Predefined subject added successfully.', predefinedSubject });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the predefined subject.',error });
  }
};

// Update a predefined subject
const updatePredefinedSubject = async (req, res) => {
  const { id } = req.params;
  const { className, subjects } = req.body;

  try {
    const updatedPredefinedSubject = await PredefinedSubjects.findByIdAndUpdate(
      id,
      { class: className, subjects },
      { new: true }
    );
    if (!updatedPredefinedSubject) {
      return res.status(404).json({ error: 'Predefined subject not found.' });
    }
    res.status(200).json({ message: 'Predefined subject updated successfully.', updatedPredefinedSubject });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the predefined subject.' });
  }
};

// Delete a predefined subject
const deletePredefinedSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPredefinedSubject = await PredefinedSubjects.findByIdAndDelete(id);
    if (!deletedPredefinedSubject) {
      return res.status(404).json({ error: 'Predefined subject not found.' });
    }
    res.status(200).json({ message: 'Predefined subject deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the predefined subject.' });
  }
};

module.exports = {
  getPredefinedSubjects,
  getPredefinedSubjectById,
  addPredefinedSubject,
  updatePredefinedSubject,
  deletePredefinedSubject
};
