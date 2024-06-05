const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: { type: String, required: true },
    level: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],  // Array of student references
subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
classTeacher: { type: Schema.Types.ObjectId, ref: 'Teacher' }
});




const Class = mongoose.model('Class', classSchema);

module.exports = Class;
