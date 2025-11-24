// routes/animalRoutes.js
const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.get('/types', animalController.getAnimalTypes);

module.exports = router;
