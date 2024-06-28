
const moment = require("moment");
const Class = require("../models/classModel");
const Homework = require("../models/homeworkModel");
const Subject = require("../models/subjectModel");
const Teacher = require("../models/teacherModel");
const Department = require("../models/departmentModel");


exports.submitHomework = async (req, res) => {
  try {
    const { classname, subject, description, note, teacher, attachment } = req.body;

    // Fetch subject ObjectId
    const subjectObj = await Department.findOne({ name: subject });
    if (!subjectObj) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Calculate expiration time (24 hours from now)
    const expirationTime = moment().add(24, 'hours');

    // Update or create homework entry
    let existingHomework = await Homework.findOne({
      classname,
      subject: subjectObj._id,
      teacher,
    });

    if (existingHomework) {
      // Combination exists, update description, note, and expiration time
      existingHomework.description = description;
      existingHomework.note = note;
      existingHomework.attachment = attachment;
      existingHomework.expirationTime = expirationTime; // Update expiration time
      await existingHomework.save();
    } else {
      // Combination doesn't exist, create new homework entry
      const homework = new Homework({
        classname,
        subject: subjectObj._id,
        description,
        note,
        teacher,
        attachment,
        creationTime: new Date(), // Set creation time
        expirationTime, // Set expiration time
      });
      await homework.save();
    }

    res.status(201).json({ message: 'Homework submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit homework', error: error.message });
  }
};
// Controller function to delete homework
exports.deleteHomework = async (req, res) => {
    try {
      const { classname, section, subject, regId } = req.params;
  
      // Delete homework entry
      const deletedHomework = await Homework.findOneAndDelete({
        classname,
        section,
        subject,
      });
  
      // if (deletedHomework) {
      //   // Log the delete operation
      //   const log = new HomeworkLog({
      //     classname,
      //     section,
      //     subject,
      //     description: deletedHomework.description,
      //     note: deletedHomework.note,
      //     operation: 'delete',
      //     regId,
      //   });
      //   await log.save();
  
      //   res.status(200).json({ message: 'Homework deleted successfully' });
      // } else {
      //   res.status(404).json({ message: 'Homework not found' });
      // }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete homework' });
    }
  };
  
  exports.getHomeworkByClassSection = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find homework matching the class and populate classname, subject, and teacher fields
      const homework = await Homework.find({ classname:id })
        .populate('classname', 'name') // Assuming classname refers to a Class model with a 'name' field
        .populate('subject', 'name')   // Assuming subject refers to a Subject model with a 'name' field
        .populate('teacher', 'name');   // Assuming teacher refers to a Teacher model with a 'name' field
  
      res.status(200).json({ homework });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch homework', error: error.message });
    }
  };
  exports.getAllHomework = async (req, res) => {
    try {
      const homework = await Homework.find() .populate('classname', 'name') // Assuming classname refers to a Class model with a 'name' field
      .populate('subject', 'name')   // Assuming subject refers to a Subject model with a 'name' field
      .populate('teacher', 'name');   // Assuming teacher refers to a Teacher model with a 'name' field;
  
      res.status(200).json({ homework });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch homework' });
    }
  };
  exports.teacherHomeworks = async (req, res) => {
    const { teacherId } = req.params; // Assuming teacherId is passed as a URL param
  
    try {
      // Find the teacher by ID to validate
      const teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      // Find homeworks assigned by the teacher
      const homeworks = await Homework.find({ teacher: teacherId }).populate('subject')
      .populate('classname');;
  
      res.status(200).json(homeworks);
    } catch (error) {
      console.error('Error fetching teacher homeworks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };