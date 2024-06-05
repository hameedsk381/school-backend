const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// POST /api/students - Create a new student
router.post('/', studentController.createStudent);

// GET /api/students - Get all students
router.get('/', studentController.getAllStudents);

// GET /api/students/:studentId - Get a single student by ID
router.get('/:studentId', studentController.getStudentById);

// PUT /api/students/:studentId - Update a student by ID
router.put('/:studentId', studentController.updateStudent);

// DELETE /api/students/:studentId - Delete a student by ID
router.delete('/:studentId', studentController.deleteStudent);

module.exports = router;
