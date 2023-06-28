const mongoose = require('mongoose');

const PredefinedSubjectsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  subjects: {
    type: [String],
    required: true
  }
});

const PredefinedSubjects = mongoose.model('PredefinedSubjects', PredefinedSubjectsSchema);

module.exports = PredefinedSubjects;
