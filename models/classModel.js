const mongoose = require('mongoose');


const classSchema = new mongoose.Schema({
  name: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

const Class = mongoose.model('Class', classSchema);



module.exports = Class;
