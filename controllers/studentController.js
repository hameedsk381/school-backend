const Student = require('../models/studentModel'); // Assuming you have a Student model

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: "Failed to create student", error });
    }
};

// Retrieve all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('class');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Failed to get students", error });
    }
};

// Retrieve a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId).populate('class');
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching student", error });
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
        if (updatedStudent) {
            res.json(updatedStudent);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Failed to update student", error });
    }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.studentId);
        if (deletedStudent) {
            res.status(200).json({ message: "Student deleted successfully" });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete student", error });
    }
};
