const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
   
  },contact: {
    type: Number,
    required: true,
   
  },
  password: {
    type: String,
    required: true
  },
  regId: {
    type: String,
    required: true,
    
  },
  department: {
    type: String,
    required: true
  },
  qualifications: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    
  },

  languages: {
    type: Array,
    
  },
  currentlyTeaching: {
    type: Array,
    
  },
  actingClassTeacherFor: {
    type: String,
    
  },
  additionalTeachingClasses: {
    type: Array,
    
  },
  additionalTeachingDepartments: {
    type: Array,
    
  },
  expertise: {
    type: Array,
    
  },
  hobbies: {
    type: String,
    
  },
  resetToken: {
    type: String,
    default:null
  },

  isAdmin :{
    type : Boolean,
    default : false
  }

});

const User = mongoose.model('User', userSchema);

module.exports = User;
