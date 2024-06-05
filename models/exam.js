const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const subjectSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true }
});

const examSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    class: { type: Schema.Types.ObjectId, ref: 'Class' },
    subjects: [subjectSchema],
    type: { type: String, required: true, enum: ['Mid Term', 'Main'] } // Type of exam
});


const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;