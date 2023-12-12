const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
  },email: {
    type: String,
    required: true
  },
  fathersName: {
    type: String,
    required: true,
   
  },
  mothersName: {
    type: String,
    required: true
  },
  teachersName: {
    type: String,
    required: true,
    
  },
  lastClassStudied: {
    type: String,
    required: true
  },
  yearOfPassing :{
    type: Number,
    required:true
  },
  principalName:{
    type:String,
    required:true
  },
date:{type:Date,default:Date.now}
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
