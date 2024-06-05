const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const teacherSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    regId: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    contact: { type: Number, required: true },
    qualifications: { type: String, required: true },
    profilePicture: { type: String }, // URL to profile picture
    expertise: [{ type: String }], // List of expertise areas
    resetToken: { type: String }, // For password resets
    isAdmin: { type: Boolean, default: false }, // Boolean flag for admin rights
    languages: [{ type: String }], // Languages known
    classesTeaching: [{ type: Schema.Types.ObjectId, ref: 'Class' }],  // References to Class documents
    additionalclassesTeaching: [{ type: Schema.Types.ObjectId, ref: 'Class' }]  // References to Class documents
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
