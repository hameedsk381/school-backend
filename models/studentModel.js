const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    class: { type: Schema.Types.ObjectId, ref: 'Class' },
    rollNumber: { type: String, required: true, unique: true },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;