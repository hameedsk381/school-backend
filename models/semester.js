const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const semesterSchema = new Schema({
    academicYear: { type: String, required: true }, // e.g., "2024-2025"
    term: { type: Number, required: true, enum: [1, 2] }, // 1 for first term, 2 for second term
    classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    exams: [{ type: Schema.Types.ObjectId, ref: 'Exam' }]
});



const Semester = mongoose.model('Semester', semesterSchema);
module.exports = Semester;