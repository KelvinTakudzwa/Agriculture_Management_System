const express = require('express');
const router = express.Router();
const deathController = require('../controllers/deathController');

router.post('/add', deathController.addDeath);
router.get('/batch/:batch_id', deathController.getDeathsByBatch);

module.exports = router;
