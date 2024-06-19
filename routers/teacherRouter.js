const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// POST /api/teachers/register - Register a new teacher
router.post('/register', teacherController.registerTeacher);

// POST /api/teachers/login - Login a teacher
router.post('/login', teacherController.loginTeacher);
// GET /api/teachers - Get all teachers
router.get('/', teacherController.getAllTeachers);
// GET /api/teachers - Get all teachers
router.get('/:department', teacherController.getTeachersByDepartment);
router.get('/departments/list', teacherController.getDepartmentNames);
// PUT /api/teachers/:id - Update a teacher's profile
router.put('/:id', teacherController.updateTeacherProfile);

router.get('/profile/:id', teacherController.getTeacherById);
router.post('/teachers/reset-password',teacherController.resetPassword);
router.post('/teachers/reset-password/confirm',teacherController.confirmReset );
router.delete('/:id',teacherController.deleteTeacher)
module.exports = router;