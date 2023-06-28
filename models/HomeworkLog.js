const mongoose = require("mongoose");

const homeworkLogSchema = new mongoose.Schema({
  classname: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  operation: {
    type: String,
    required: true,
  },
  regId: {
    type: String,
    required: true,
    index:false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HomeworkLog = mongoose.model("HomeworkLog", homeworkLogSchema);

module.exports = HomeworkLog;
