const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact: Number,
  password: String,
  regId: {
    type: String,
    required: true,
    unique: true
  },
  department: String,
  qualifications: String,
  profilePicture: String,
  languages: [String],
  // Change currentlyTeaching to reference the Class model
  currentlyTeaching: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }],
  actingClassTeacherFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  additionalTeachingClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  additionalTeachingDepartments: [String],
  expertise: [String],
  hobbies: String,
  resetToken: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', teacherSchema);

module.exports = User;