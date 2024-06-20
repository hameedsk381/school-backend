const express = require('express');
const { submitMaterial, getAllMaterials } = require('../controllers/materialController');
const router = express.Router();


// POST request to submit a new material
router.post('/submit', submitMaterial);
router.get('/',getAllMaterials)
module.exports = router;
