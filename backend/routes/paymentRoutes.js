const express = require('express');
const router = express.Router();
const hashGenerator = require('../config/hashGenerator');

router.post('/generate-hash', (req, res) => {
  const { merchantId, orderId, payHereAmount, currency } = req.body;
  // Call the hash generation function and send the hash back to the client
  const hash = hashGenerator.generateHash(merchantId, orderId, payHereAmount, currency);
  res.json({ hash });
});

module.exports = router;
