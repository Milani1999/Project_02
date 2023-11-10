// Backend>controllers>paymentController.js
const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const Student = require("../models/studentModel");

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

// Make a payment
const makePayment = asyncHandler(async (req, res) => {
  const { admissionNo, amount, year, month } = req.query;
  console.log(admissionNo);
  console.log(amount);
  console.log(year);
  console.log(month);

  try {
    // Add logic to check if the payment for the selected year and month already exists
    const existingPayment = await Payment.findOne({
      admissionNo,
      year,
      month,
    });

    if (existingPayment) {
      return res
        .status(400)
        .json({ message: "Payment for this month already exists." });
    } else {
      const referenceCode = generateReferenceCode("Student_001");

      // Create a new payment record with the generated reference code
      const newPayment = new Payment({
        admissionNo,
        referenceCode, // Use the generated reference code
        amount,
        paymentDateWithTime: new Date(),
        purpose: "monthlyfee",
        paymentMonth: month,
        paymentYear: year,
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
});

module.exports = {
  getPaymentRecords,
  makePayment,
};
