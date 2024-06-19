const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
    classname: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // Reference to the Class model
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }, // Reference to the Subject model
    description: { type: String, required: true },
    note: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Reference to the Teacher model
    attachment: { type: String }, // Field for the attachment URL
    expirationTime: { type: Date, required: true }, // Expiration time of the homework
}, {
    timestamps: { createdAt: 'creationTime', updatedAt: false } // Automatically manage creationTime and updatedAt
});

const Homework = mongoose.model('Homework', homeworkSchema);

module.exports = Homework;
