// paymentRoutes.js
const express = require('express');
const { processPayment} = require('../controllers/paymentController');
const router = express.Router();

// Route for making payments
router.post('/createPayment',processPayment );


module.exports = router;
