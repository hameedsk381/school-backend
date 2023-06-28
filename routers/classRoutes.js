const express = require('express');
const { saveHomework } = require('../controllers/classController');
const classrouter = express.Router();


// POST route to save homework
classrouter.post('/', saveHomework);

module.exports = classrouter;
