const express = require('express');
const router = express.Router();
const Semester = require('../models/semester');

// Add a new semester
router.post('/add', async (req, res) => {
    try {
        const newSemester = new Semester(req.body);
        await newSemester.save();
        res.status(201).send(newSemester);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all semesters
router.get('/', async (req, res) => {
    try {
        const semesters = await Semester.find().populate('classes').populate('exams');
        res.status(200).send(semesters);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a semester by ID
router.get('/:id', async (req, res) => {
    try {
        const semester = await Semester.findById(req.params.id).populate('classes').populate('exams');
        if (!semester) return res.status(404).send('Semester not found');
        res.status(200).send(semester);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a semester by ID
router.put('/:id', async (req, res) => {
    try {
        const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!semester) return res.status(404).send('Semester not found');
        res.status(200).send(semester);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a semester by ID
router.delete('/:id', async (req, res) => {
    try {
        const semester = await Semester.findByIdAndDelete(req.params.id);
        if (!semester) return res.status(404).send('Semester not found');
        res.status(200).send('Semester deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
