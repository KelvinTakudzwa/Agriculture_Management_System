const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.post('/add', saleController.addSale);
router.get('/batch/:batch_id', saleController.getSalesByBatch);

module.exports = router;
