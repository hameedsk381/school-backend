const express = require('express');
const User = require('../models/userModel');
const Result = require('../models/resultsModel');
const router = express.Router();


// Middleware to verify that the teacher is the acting class teacher
const verifyClassTeacher = async (req, res, next) => {
    const teacherId = req.user._id;  // Assuming user ID is stored in req.user
    const { classId } = req.params;

    const teacher = await User.findById(teacherId);
    if (!teacher || !teacher.actingClassTeacherFor.equals(classId)) {
        return res.status(403).json({ message: "You are not authorized to update marks for this class." });
    }
    next();
};

// Endpoint to update marks for a student
router.put('/updateMarks/:classId/:studentId/:examId', verifyClassTeacher, async (req, res) => {
    const { studentId, examId } = req.params;
    const { marks } = req.body;  // marks should be an array of { subjectId, score }

    try {
        const result = await Result.findOneAndUpdate(
            { student: studentId, exam: examId },
            { $set: { subjectsResults: marks } },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: "No result found for this student and exam." });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update marks', error });
    }
});

module.exports = router;
