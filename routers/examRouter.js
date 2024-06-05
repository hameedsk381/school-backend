const express = require('express');
const router = express.Router();
const Exam = require('../models/exam');
const Student = require('../models/studentModel');
const Result = require('../models/resultsModel');

// Add a new exam
router.post('/add', async (req, res) => {
    try {
        const newExam = new Exam(req.body);
        await newExam.save();
        res.status(201).send(newExam);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all exams
router.get('/', async (req, res) => {
    try {
        const exams = await Exam.find().populate('class').populate('subjects');
        res.status(200).send(exams);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get an exam by ID
router.get('/:id', async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id).populate('class').populate('subjects');
        if (!exam) return res.status(404).send('Exam not found');
        res.status(200).send(exam);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an exam by ID
router.put('/:id', async (req, res) => {
    try {
        const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
