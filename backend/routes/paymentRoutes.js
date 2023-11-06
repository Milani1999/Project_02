const express = require('express');
const router = express.Router();
const {
  initiatePayment,
  confirmPayment,
  getPaymentHistory
} = require('../controllers/paymentController');

// Route to initiate a payment
router.post('/initiate', /* protect, */ initiatePayment);

// Route to confirm a payment
router.post('/confirm', /* protect, */ confirmPayment);

router.get('/history/:studentId', /* protect, */ getPaymentHistory);

module.exports = router;
