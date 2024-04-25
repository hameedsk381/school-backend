const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  year: Number, // e.g., 2024
  term: Number, // 1 for Spring, 2 for Fall
  startDate: Date,
  endDate: Date,
  exams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  }]
});

const Semester = mongoose.model('Semester', semesterSchema);
module.exports = Semester;