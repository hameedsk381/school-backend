const HomeworkLog = require("../models/homeworkLog");
const Homework = require("../models/homeworkModel");


// Controller function to submit homework
exports.submitHomework = async (req, res) => {
    try {
      const { classname, section, subject, description, note, regId } = req.body;
  
      // Update or create homework entry
      const existingHomework = await Homework.findOne({
        classname,
        section,
        subject,
      });
  
      if (existingHomework) {
        // Combination exists, update description and note
        existingHomework.description = description;
        existingHomework.note = note;
        await existingHomework.save();
      } else {
        // Combination doesn't exist, create new homework entry
        const homework = new Homework({
          classname,
          section,
          subject,
          description,
          note,
          regId
        });
        await homework.save();
      }
  
      // Log the submit operation
    //   const log = new HomeworkLog({
    //     classname,
    //     section,
    //     subject,
    //     description,
    //     note,
    //     operation: 'submit',
    //     regId
    //   });
    //   await log.save();
  
      res.status(201).json({ message: 'Homework submitted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to submit homework', error });
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
  
      if (deletedHomework) {
        // Log the delete operation
        const log = new HomeworkLog({
          classname,
          section,
          subject,
          description: deletedHomework.description,
          note: deletedHomework.note,
          operation: 'delete',
          regId,
        });
        await log.save();
  
        res.status(200).json({ message: 'Homework deleted successfully' });
      } else {
        res.status(404).json({ message: 'Homework not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete homework' });
    }
  };
  
  // Controller function to get homework by class and section
  exports.getHomeworkByClassSection = async (req, res) => {
    try {
      const { classname, section } = req.params;
  
      // Find homework matching the class and section
      const homework = await Homework.find({ classname, section });
  
      res.status(200).json({ homework });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch homework' });
    }
  };
  exports.getAllHomework = async (req, res) => {
    try {
      const homework = await Homework.find();
  
      res.status(200).json({ homework });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch homework' });
    }
  };
  