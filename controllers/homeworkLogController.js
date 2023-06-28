// controllers/homeworkLogController.js

const HomeworkLog = require("../models/homeworkLog");





// Controller function to fetch all homework logs
exports.getHomeworkLogs = async (req, res) => {
  try {
    const homeworkLogs = await HomeworkLog.find().sort({ createdAt: -1 });
    res.status(200).json({ homeworkLogs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch homework logs' });
  }
};
