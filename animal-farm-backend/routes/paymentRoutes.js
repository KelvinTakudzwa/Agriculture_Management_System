const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.addPayment);
router.get('/batch/:batch_id', paymentController.getPaymentsByBatch);

module.exports = router;
