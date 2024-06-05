const express = require('express');
const router = express.Router();
const Result = require('../models/resultsModel');
const Student = require('../models/studentModel');
const Report = require('../models/report');

router.post('/reports', async (req, res) => {
    const {name, teacherId, rollNumber, examId, subject, marks, classId } = req.body;

    try {
        let student = await Student.findOne({ rollNumber });

        if (!student) {
            // Assuming a simple student model. Adjust according to your needs.
            student = new Student({
                rollNumber,
                class: classId,
                name
                // Default values or additional data might be required depending on your student model
            });
            await student.save();
        }

        const report = new Report({
            teacher: teacherId,
            student: student._id,
            exam: examId,
            subject,
            marks
        });

        await report.save();
        res.status(201).send('Report successfully uploaded');
    } catch (error) {
        res.status(500).send('Error uploading report: ' + error);
    }
});
// Get results by student ID
router.get('/student/:studentId', async (req, res) => {
    try {
        const results = await Result.find({ student: req.params.studentId })
            .populate('exam', 'title date');
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get results by exam ID
router.get('/exam/:examId', async (req, res) => {
    try {
        const results = await Result.find({ exam: req.params.examId })
            .populate('student', 'name');
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a result by ID
router.patch('/:id', async (req, res) => {
    try {
        const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).send();
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a result by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Result.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send();
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/aggregated-results/:examId', async (req, res) => {
    try {
        const { examId } = req.params;
        const aggregatedResults = await Result.aggregate([
            { $match: { exam: examId } },
            {
                $lookup: {
                    from: 'students', // Assuming the collection name is 'students'
                    localField: 'student',
                    foreignField: '_id',
                    as: 'studentDetails'
                }
            },
            { $unwind: '$studentDetails' },
            {
                $group: {
                    _id: '$exam',
                    averageScore: { $avg: '$score' },
                    results: {
                        $push: {
                            studentId: '$student',
                            studentName: '$studentDetails.name',
                            score: '$score'
                        }
                    }
                }
            }
        ]);

        if (!aggregatedResults.length) {
            return res.status(404).send('No results found for this exam.');
        }

        res.status(200).send(aggregatedResults[0]); // Send the first result as there should only be one group per exam.
    } catch (error) {
   res.status(500).send(error);
    }
});

// Get results by student roll number
router.get('/results-by-roll/:rollNumber', async (req, res) => {
    try {
        const { rollNumber } = req.params;
        const student = await Student.findOne({ rollNumber });
        if (!student) {
            return res.status(409).send('Student not found');
        }

        const results = await Result.find({ student: student._id })
            .populate('exam', 'title date')
            .populate('student', 'name rollNumber');

        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});
module.exports = router;
