const express = require('express');
const subjectsrouter = express.Router();
const Subject = require("../models/subjectModel");
// POST /api/subjects - Create a new subject
subjectsrouter.post('/create', async (req, res) => {
    try {
        const newSubject = new Subject(req.body);
        await newSubject.save();
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(400).json({ message: "Error creating subject", error });
    }
});

module.exports = subjectsrouter;
