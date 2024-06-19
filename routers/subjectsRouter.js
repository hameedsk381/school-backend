// subjectsRouter.js
const express = require('express');
const subjectsRouter = express.Router();
const Subject = require('../models/subjectModel');

// POST /api/subjects/create - Create a new subject
subjectsRouter.post('/create', async (req, res) => {
    try {
        const newSubject = new Subject(req.body);
        await newSubject.save();
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(400).json({ message: "Error creating subject", error: error.message });
    }
});

// GET /api/subjects - Get all subjects
subjectsRouter.get('/', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subjects", error: error.message });
    }
});

// GET /api/subjects/:id - Get a subject by ID
subjectsRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const subject = await Subject.findById(id);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subject", error: error.message });
    }
});

// PUT /api/subjects/:id - Update a subject by ID
subjectsRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSubject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json(updatedSubject);
    } catch (error) {
        res.status(500).json({ message: "Error updating subject", error: error.message });
    }
});

// DELETE /api/subjects/:id - Delete a subject by ID
subjectsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedSubject = await Subject.findByIdAndDelete(id);
        if (!deletedSubject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json({ message: "Subject deleted successfully", deletedSubject });
    } catch (error) {
        res.status(500).json({ message: "Error deleting subject", error: error.message });
    }
});

module.exports = subjectsRouter;
