const express = require('express');
const router = express.Router();
const Exam = require('../models/exam');
const Student = require('../models/studentModel');
const Result = require('../models/resultsModel');
const Class = require('../models/classModel');
const Subject = require('../models/subjectModel');

// Add a new exam
router.post('/add', async (req, res) => {
    try {
        const { studentId, examType, dateOfExam, classId, subjects } = req.body;
        
        // Check if class exists and get objectId
        const classObjectId = await Class.findOne({ name: classId });

        // Map subject names to their corresponding IDs
        const subjectIds = await Promise.all(subjects.map(async (subject) => {
            const subjectObject = await Subject.findOne({ name: subject.subjectName });
            return subjectObject._id;
        }));

        const newExam = new Exam({
            studentId,
            examType,
            dateOfExam: new Date(dateOfExam),
            classId: classObjectId._id,
            subjects: subjectIds.map((subjectId, index) => ({
                subjectName: subjectId,
                marks: subjects[index].marks,
                attendance: subjects[index].attendance
            }))
        });
        await newExam.save();
        res.status(201).send(newExam);
    } catch (error) {
        res.status(400).send(error);
    }
});
// Get all exams
router.get('/class/:classId', async (req, res) => {
    const {classId} = req.params
    try {
        const exams = await Exam.find({classId}).populate({
            path: 'subjects.subjectName',
            select: 'name'
        }).populate('classId', 'name');
        res.status(200).send(exams);
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
});
// Get an exam by ID
router.get('/:id', async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id).populate({
            path: 'subjects.subjectName',
            select: 'name _id'
        }).populate('classId', 'name');
        if (!exam) return res.status(404).send('Exam not found');
        res.status(200).send(exam);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Update an exam by ID
router.put('/:id', async (req, res) => {
    try {
        const { studentId, examType, dateOfExam, classId, subjects } = req.body;

        const classObjectId = await Class.findOne({ name: classId.name });
        if (!classObjectId) {
            return res.status(404).send('Class not found');
        }

        const subjectIds = await Promise.all(subjects.map(async (subject) => {
            const subjectObject = await Subject.findOne({ name: subject.subjectName });
            return subjectObject._id;
        }));

        const updatedExam = {
            studentId,
            examType,
            dateOfExam,
            classId: classObjectId._id,
            subjects: subjectIds.map((subjectId, index) => ({
                subjectName: subjectId,
                marks: subjects[index].marks,
                attendance: subjects[index].attendance
            }))
        };

        const exam = await Exam.findByIdAndUpdate(req.params.id, updatedExam, { new: true, runValidators: true });
        if (!exam) return res.status(404).send('Exam not found');
        res.status(200).send(exam);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an exam by ID
router.delete('/:id', async (req, res) => {
    try {
        const exam = await Exam.findByIdAndDelete(req.params.id);
        if (!exam) return res.status(404).send('Exam not found');
        res.status(200).send('Exam deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});
// Get aggregated results for a specific exam in a class

module.exports = router;
