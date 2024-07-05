const Subject = require('../models/subjectModel');

exports.createSubject = async (req, res) => {
    try {
        const newSubject = new Subject(req.body);
        await newSubject.save();
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(400).json({ message: "Failed to create subject", error });
    }
};

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve subjects", error });
    }
};

exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.subjectId);
        if (subject) {
            res.json(subject);
        } else {
            res.status(404).json({ message: "Subject not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching subject", error });
    }
};

exports.updateSubject = async (req, res) => {
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(req.params.subjectId, req.body, { new: true });
        if (updatedSubject) {
            res.json(updatedSubject);
        } else {
            res.status(404).json({ message: "Subject not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Failed to update subject", error });
    }
};

exports.deleteSubject = async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.subjectId);
        if (deletedSubject) {
            res.status(200).json({ message: "Subject deleted successfully" });
        } else {
            res.status(404).json({ message: "Subject not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete subject", error });
    }
};
