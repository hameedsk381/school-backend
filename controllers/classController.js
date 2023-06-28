const Class = require("../models/classModel"); // Assuming the Class model is in a separate file
const PredefinedSubjects = require("../models/subjectModel");

const saveHomework = async (req, res) => {
  const { className, subject, description, note } = req.body;

  try {
    
    const predefinedSubjects = await PredefinedSubjects.findOne({className });
    if (!predefinedSubjects) {
      return res.status(400).json({ error: 'Invalid class name.' });
    }

    // Check if the subject exists in the predefined subjects for the given class
    if (!predefinedSubjects.subjects.includes(subject)) {
      return res.status(400).json({ error: 'Invalid subject for the given class.' });
    }
    // Find the class by className or create a new one if it doesn't exist
    let classObj = await Class.findOne({ className });
    if (!classObj) {
      classObj = new Class({ className });
    }

    // Find the subject within the class or create a new one if it doesn't exist
    let subjectObj = classObj.subjects.find((sub) => sub.name === subject);
    if (!subjectObj) {
      subjectObj = { name: subject, homework: [] };
      classObj.subjects.push(subjectObj);
    }

    // Create a new homework object and add it to the subject
    const homeworkObj = { description, note };
    subjectObj.homework.push(homeworkObj);

    // Save the updated class object
    await classObj.save();

    res.status(200).json({ message: "Homework saved successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while saving the homework." });
  }
};

module.exports = { saveHomework };
