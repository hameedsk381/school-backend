const mongoose = require('mongoose');

const HomeworkSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  note: {
    type: String,
  }
});

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  homework: [HomeworkSchema]
});

const ClassSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true
  },
  subjects: [SubjectSchema]
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;
