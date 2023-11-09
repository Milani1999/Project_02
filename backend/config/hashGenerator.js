const crypto = require('crypto');

exports.generateHash = (merchantId, orderId, payHereAmount, currency) => {
  const merchantSecret = 'MjE4OTUxMjE1NDM1OTMxMTE4MDEyMjQwNzg4ODMyMjk0MzczNDcz'; // Need to change as process.key -Kobi
  const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const amountFormatted = parseFloat(payHereAmount).toFixed(2);
  const hash = crypto.createHash('md5').update(merchantId + orderId + amountFormatted + currency + hashedSecret).digest('hex').toUpperCase();
  return hash;
};
