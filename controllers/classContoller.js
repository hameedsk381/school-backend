const Class = require('../models/classModel'); // Import your Class model

exports.createClass = async (req, res) => {
    try {
        const newClass = new Class(req.body);
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: "Failed to create class", error });
    }
};

exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve classes", error });
    }
};

exports.getClassById = async (req, res) => {
    try {
        const classData = await Class.findById(req.params.classId).populate('teacher students');
        if (classData) {
            res.json(classData);
        } else {
            res.status(404).json({ message: "Class not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching class", error });
    }
};

exports.updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.classId, req.body, { new: true }).populate('teacher students');
        if (updatedClass) {
            res.json(updatedClass);
        } else {
            res.status(404).json({ message: "Class not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Failed to update class", error });
    }
};

exports.deleteClass = async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.classId);
        if (deletedClass) {
            res.status(200).json({ message: "Class deleted successfully" });
        } else {
            res.status(404).json({ message: "Class not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete class", error });
    }
};
exports.assignTeacher = async (req, res) => {
    const { teacherId } = req.body;
    const { classId } = req.params;

    try {
        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            { classTeacher: teacherId },
            { new: true, upsert: true }
        )
        res.status(200).json({ message: 'Teacher assigned for class', updatedClass });
    } catch (error) {
        res.status(400).json({ message: "Error assigning class teacher", error });
    }
}