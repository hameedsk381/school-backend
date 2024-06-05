const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
    scores: [{
        subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
        score: { type: Number, required: true }
    }],
    totalScore: { type: Number, required: true },
    percentage: { type: Number, required: true }
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;