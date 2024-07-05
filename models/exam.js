const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const examSchema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    examType: {
      type: String,
      required: true
    },
    dateOfExam: {
      type: Date,
      required: true
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true
    },
    subjects: [
      {
        subjectName: {
          type: Schema.Types.ObjectId,
          ref: 'Subject',
          required: true
        },
        marks: {
          type: Number,
          required: true,
          min: 0,
          max: 100
        },
        attendance: {
          type: String,
          enum: ['Present', 'Absent'],
          required: true
        }
      }
    ]
  });

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;