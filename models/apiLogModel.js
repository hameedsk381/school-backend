// models/homeworkLogModel.js

const mongoose = require('mongoose');

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
  regID: {
    type: String,
    required: true,
  },
  operation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HomeworkLog = mongoose.model('HomeworkLog', homeworkLogSchema);

module.exports = HomeworkLog;
