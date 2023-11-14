const express = require('express');
const router = express.Router();
const hashGenerator = require('../config/hashGenerator');
const { getPaymentRecords, makePayment, handlePaymentNotification } = require("../controllers/paymentController");

router.post('/generate-hash', (req, res) => {
  const { merchantId, orderId, payHereAmount, currency } = req.body;
  // Call the hash generation function and send the hash back to the client
  const hash = hashGenerator.generateHash(merchantId, orderId, payHereAmount, currency);
  res.json({ hash });
});

// Fetch payment records for the logged-in student
router.route("/records").get(getPaymentRecords);
// Make a payment
router.route("/make-payment").post(makePayment);
router.post('/payment-notification', handlePaymentNotification);

module.exports = router;
