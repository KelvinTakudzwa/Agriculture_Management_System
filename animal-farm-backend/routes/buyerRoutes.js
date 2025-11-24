const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');

router.post('/add', buyerController.addBuyer);
router.get('/', buyerController.getAllBuyers);

module.exports = router;
