const express = require('express');
const router = express.Router();
const hashGenerator = require('../config/hashGenerator');
const { getPaymentRecords, handlePaymentNotification} = require("../controllers/paymentController");

router.post('/generate-hash', (req, res) => {
  const { merchantId, orderId, payHereAmount, currency } = req.body;

  const hash = hashGenerator.generateHash(merchantId, orderId, payHereAmount, currency);
  res.json({ hash });
});


router.route("/records").get(getPaymentRecords);

router.post('/payment-notification', handlePaymentNotification);

module.exports = router;
