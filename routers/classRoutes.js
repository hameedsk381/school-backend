const express = require('express');
const router = express.Router();
const classController = require('../controllers/classContoller');

router.post('/', classController.createClass);
router.get('/', classController.getAllClasses);
router.get('/:classId', classController.getClassById);
router.put('/:classId', classController.updateClass);
router.delete('/:classId', classController.deleteClass);
// POST /api/classes/:classId/assign-teacher
router.post('/:classId/assign-teacher', classController.assignTeacher);

module.exports = router;
