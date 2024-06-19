// routes/homeworkRoutes.js
const express = require("express");
const homeworkrouter = express.Router();
const homeworkController = require("../controllers/homeworkController");

// Route to submit homework
homeworkrouter.post("/", homeworkController.submitHomework);

// Route to fetch homework by class, section, and subject
homeworkrouter.get(
  "/:id",
  homeworkController.getHomeworkByClassSection
);
homeworkrouter.get("/", homeworkController.getAllHomework);
homeworkrouter.get("/teacher/:teacherId",homeworkController.teacherHomeworks)
module.exports = homeworkrouter;
