// routes/homeworkRoutes.js

const express = require("express");
const logrouter = express.Router();

const homeworkController = require("../controllers/homeworkController");
const homeworkLogController = require("../controllers/homeworkLogController");

// Homework routes
logrouter.post("/submit-homework", homeworkController.submitHomework);
logrouter.delete(
  "/delete-homework/:classname/:section/:subject",
  homeworkLogController.deleteHomework
);

// Homework Log routes
logrouter.get('/homework-logs', homeworkLogController.getHomeworkLogs);

module.exports = logrouter;
