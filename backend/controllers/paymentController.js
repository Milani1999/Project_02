
// paymentController.js
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')('sk_test_51NoKBjSBqWcAaZje1Lu43ERGjM8SkDI7sec1PJrcwfbvzbozwo4x2D28Gz0rCtu07QRfcbDvmoGplOLuy9NJ5YZj00rsJCQ7PG');
const Payment = require('../models/paymentModel');

const processPayment = async (req, res) => {
  const { studentId, amount, paymentYear, paymentMonth, token } = req.body;

  try {
    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: 'usd', // Update to your currency
      description: `Payment for ${paymentYear} - ${paymentMonth}`,
      payment_method_types: ['card'],
      capture_method: 'manual',
      confirm: true,
      confirmation_method: 'manual',
    });

    // Record the payment in your database
    const paymentRecord = new Payment({
      studentAdmissionNo: studentId,
      amount,
      paymentYear,
      paymentMonth,
      paymentMethod: 'Online Card Payment',
      referenceCode: paymentIntent.id,
    });

    await paymentRecord.save();

    // Capture the payment
    await stripe.paymentIntents.capture(paymentIntent.id);

    // Send a success response
    res.json({ success: true, referenceCode: paymentIntent.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment failed' });
  }
};

module.exports = {
  processPayment,
};
