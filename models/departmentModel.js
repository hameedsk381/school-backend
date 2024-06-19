const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
    date: { type: Date, default: Date.now }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
