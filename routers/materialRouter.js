const express = require('express');
const { submitMaterial } = require('../controllers/materialController');
const router = express.Router();


// POST request to submit a new material
router.post('/submit', submitMaterial);

module.exports = router;
