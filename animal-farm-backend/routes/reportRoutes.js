const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Get report for a specific batch
router.get('/batches/:id/report', reportController.getBatchReport);

module.exports = router;
