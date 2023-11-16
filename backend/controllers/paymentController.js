const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const Student = require("../models/studentModel");
const hashGenerator = require("../config/hashGenerator");
const crypto = require("crypto");

const generateReferenceCode = (admissionNo) => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(7);
  return `${admissionNo}_${timestamp}_${randomString}`;
};

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
    const selectedYear = custom_1.substring(0, 4); 
    const month = custom_1.substring(5); 
    const secret = process.env.REACT_APP_PAYHERE_MERCHANT_SECRET;
    const hashedSecret = crypto
      .createHash("md5")
      .update(secret)
      .digest("hex")
      .toUpperCase();

    const amountFormatted = parseFloat(payhere_amount).toFixed(2);

    const calculatedMd5sig = crypto
      .createHash("md5")
      .update(
        `${merchant_id}${order_id}${amountFormatted}${payhere_currency}${status_code}${hashedSecret}`
      )
      .digest("hex")
      .toUpperCase();
    if (calculatedMd5sig === md5sig) {
      if (status_code === "2") {
        // Payment Success
        try {
          const existingPayment = await Payment.findOne({
            admissionNo: order_id,
            paymentYear: selectedYear,
            paymentMonth: month,
          });

          if (existingPayment) {
            return res
              .status(400)
              .json({ message: "Payment for this month already exists." });
          } else {
            const referenceCode = generateReferenceCode(order_id);

            const newPayment = new Payment({
              admissionNo: order_id,
              referenceCode,
              amount: payhere_amount,
              paymentDateWithTime: new Date(),
              purpose: "monthlyfee",
              paymentMonth: month,
              paymentYear: selectedYear,
              paymentMethod: "Online Payment",
              student: custom_2,
            });

            await newPayment.save();
          }
        } catch (error) {
          console.error("Error making payment:", error);
          // res.status(500).json({ message: "Internal Server Error" });
        }
      } else if (status_code === "0") {
        // Payment Pending
        console.error("Payment Pending for order_id:", order_id);
      } else if (status_code === "-1") {
        // Payment canceled
        console.error("Payment canceled for order_id:", order_id);
      } else if (status_code === "-2") {
        // Payment failed chargedback
        console.error("Payment failed for order_id:", order_id);
      } else if (status_code === "-3") {
        // Payment chargedback
        console.error("Payment chargedback for order_id:", order_id);
      } else {
        console.error("Unable to complete the payment for order_id:", order_id);
      }
    } else {
      // Invalid notification, respond with an error
      console.error("Invalid notification");
    }
  } catch (error) {
    console.error("Error handling payment notification:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPaymentRecords = asyncHandler(async (req, res) => {
  const admissionNo = req.query.admissionNo;
  const year = req.query.year;
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

module.exports = {
  getPaymentRecords,
  handlePaymentNotification,
};
