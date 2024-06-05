const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    exam: {
        type: Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    dateSubmitted: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: String
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
