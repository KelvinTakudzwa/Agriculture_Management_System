const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');

router.post('/create', batchController.createBatch);
router.get('/:animal_type_id', batchController.getBatchesByUserAndAnimal);

module.exports = router;
