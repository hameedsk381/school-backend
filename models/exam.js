const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Semester'
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  maxMarks: Number, // You could also have maxMarks per subject if it varies.
  type: {
    type: String,
    enum: ['unit', 'main'], // Defines if the exam is a unit test or the main test
    required: true
  }
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;