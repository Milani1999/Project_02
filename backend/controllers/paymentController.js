// Backend>controllers>paymentController.js
const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const Student = require("../models/studentModel");
const hashGenerator = require('../config/hashGenerator');
const crypto = require('crypto');
// Helper function to generate a unique reference code
const generateReferenceCode = (admissionNo) => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(7);
  return `${admissionNo}_${timestamp}_${randomString}`;
};

const getPaymentRecords = asyncHandler(async (req, res) => {
  const admissionNo = req.query.admissionNo; // Assuming admissionNo and year are sent in the request body
  const year = req.query.year; // Assuming admissionNo and year are sent in the request body

  try {
    const paymentRecords = await Payment.find({
      admissionNo: admissionNo,
      paymentYear: year,
    });
    res.json(paymentRecords);
  } catch (error) {
    console.error("Error fetching payment records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const handlePaymentNotification = async (req, res) => {
  try {
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
      custom_1,
      custom_2,
    } = req.body;
  console.log(req.body);
    // Verify the payment notification
    const secret = 'MjE4OTUxMjE1NDM1OTMxMTE4MDEyMjQwNzg4ODMyMjk0MzczNDcz'; // Replace with your PayHere secret key

    // Log the data used for hashing
    const dataToHash = `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${secret}`;
    console.log('Data to Hash:', dataToHash);

    const hashedSecret = crypto
      .createHash('md5')
      .update(secret)
      .digest('hex')
      .toUpperCase();

    const amountFormatted = parseFloat(payhere_amount).toFixed(2);

    const calculatedMd5sig = crypto
      .createHash('md5')
      .update(`${merchant_id}${order_id}${amountFormatted}${payhere_currency}${status_code}${hashedSecret}`)
      .digest('hex')
      .toUpperCase();

    // Log the calculated hash
    console.log('Calculated MD5 Signature:', calculatedMd5sig);

    if (calculatedMd5sig === md5sig) {
      // Verification successful
      // Update your database based on the payment status
      if (status_code === '2') {
        // Payment success
        // Update your database with the successful payment details
        // const payment = await Payment.findOne({ referenceCode: order_id });


        // if (payment) {
        //   payment.paymentStatus = 'Paid'; // Update payment status as per your schema
        //   await payment.save();
        // } else {
        //   console.error('Payment record not found for order_id:', order_id);
        // }
        try {
          // Add logic to check if the payment for the selected year and month already exists
          const existingPayment = await Payment.findOne({
            admissionNo : order_id,
            year: custom_2,
            month: custom_1,
          });
      
          if (existingPayment) {
            return res
              .status(400)
              .json({ message: "Payment for this month already exists." });
          } else {
            const referenceCode = generateReferenceCode(order_id);
      
            // Create a new payment record with the generated reference code
            const newPayment = new Payment({
              admissionNo : order_id,
              referenceCode, // Use the generated reference code
              amount : payhere_amount,
              paymentDateWithTime: new Date(),
              purpose: "monthlyfee",
              paymentMonth: custom_1,
              paymentYear: custom_2,
              paymentMethod: "Online Payment",
            });
      
            // Save the new payment record
            await newPayment.save();
      
            res.json({ message: "Payment successful." });
          }
        } catch (error) {
          console.error("Error making payment:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      } else {
        // Payment failed or canceled
        // Handle accordingly
        console.error('Payment failed or canceled for order_id:', order_id);
      }

      // Respond to PayHere with a 200 status code to acknowledge receipt of the notification
      // res.status(200).send('OK');
    } else {
      // Invalid notification, respond with an error
      console.error('Invalid notification');
      res.status(400).send('Invalid notification');
    }
  } catch (error) {
    console.error('Error handling payment notification:', error);
    // res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  handlePaymentNotification,
};


// // Make a payment
// const makePayment = asyncHandler(async (req, res) => {
//   const { admissionNo, amount, year, month } = req.query;


//   try {
//     // Add logic to check if the payment for the selected year and month already exists
//     const existingPayment = await Payment.findOne({
//       admissionNo,
//       year,
//       month,
//     });

//     if (existingPayment) {
//       return res
//         .status(400)
//         .json({ message: "Payment for this month already exists." });
//     } else {
//       const referenceCode = generateReferenceCode();

//       // Create a new payment record with the generated reference code
//       const newPayment = new Payment({
//         admissionNo,
//         referenceCode, // Use the generated reference code
//         amount,
//         paymentDateWithTime: new Date(),
//         purpose: "monthlyfee",
//         paymentMonth: month,
//         paymentYear: year,
//         paymentMethod: "Online Payment",
//       });

//       // Save the new payment record
//       await newPayment.save();

//       res.json({ message: "Payment successful." });
//     }
//   } catch (error) {
//     console.error("Error making payment:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

module.exports = {
  getPaymentRecords,
  // makePayment,
  handlePaymentNotification,
};
