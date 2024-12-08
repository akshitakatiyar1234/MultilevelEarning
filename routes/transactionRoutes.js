const express = require('express');
const { recordPurchase } = require('../controllers/transactionController');
const router = express.Router();

router.post('/purchase', recordPurchase);

module.exports = router;