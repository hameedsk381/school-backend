const mongoose = require('mongoose');


const subjectResultSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    marks: Number
});

const resultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    subjectsResults: [subjectResultSchema], // Array of subject results
    totalScore: { // Optional, can be calculated on the fly or stored for quick access
        type: Number,
        default: 0
    }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;  