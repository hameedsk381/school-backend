const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  passedOutBatch: {
    type: String,
    required: true,
  },
  currentPosition: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
    enum: ['single', 'married'],
  },
  anythingToShare: {
    type: String,
    required: true,
  },
  isVisiting: {
    type: String,
    required: true,
    enum: ['yes', 'no'],
  },
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
