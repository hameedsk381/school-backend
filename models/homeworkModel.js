// models/homework.js
const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
    classname: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    note: { type: String },
    regId:{
        type :String,
        required:true
    }
   
  });
  

 const Homework = mongoose.model('Homework', homeworkSchema);
 module.exports = Homework;
