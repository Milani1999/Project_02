const md5 = require('crypto-js/md5');

exports.generateHash = (merchantId, orderId, payHereAmount, currency) => {
  const merchantSecret = process.env.REACT_APP_PAYHERE_MERCHANT_SECRET;
  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  const amountFormatted = parseFloat(payHereAmount).toFixed(2);
  const dataToHash = `${merchantId}${orderId}${amountFormatted}${currency}${hashedSecret}`;
  const hash = md5(dataToHash).toString().toUpperCase();
  return hash;
};
