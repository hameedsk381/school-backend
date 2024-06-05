const { Schema, default: mongoose } = require("mongoose");

const subjectSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true }  // e.g., 'MATH101'
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;