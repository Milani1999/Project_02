// Backend>controllers>paymentController.js
const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const Student = require("../models/studentModel");

// Fetch payment records for the logged-in student
const getPaymentRecords = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  try {
    const paymentRecords = await Payment.find({ student: studentId });
    res.json(paymentRecords);
  } catch (error) {
    console.error("Error fetching payment records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Make a payment
const makePayment = asyncHandler(async (req, res) => {
  const { amount, year, month } = req.body;
  const studentId = req.user._id;

  try {
    // Add logic to check if the payment for the selected year and month already exists
    const existingPayment = await Payment.findOne({
      student: studentId,
      year,
      month,
    });

    if (existingPayment) {
      return res.status(400).json({ message: "Payment for this month already exists." });
    }

    // Fetch student details
    const student = await Student.findById(studentId);

    // Add logic to generate a unique reference code
    const referenceCode = generateReferenceCode();

    // Create a new payment record
    const newPayment = new Payment({
      referenceCode,
      student: studentId,
      studentDetails: {
        admission_no: student.admission_no,
        fullname: student.fullname,
        // Add other student details as needed
      },
      amount,
      paymentDateWithTime: new Date(),
      purpose: "monthlyfee",
      year,
      month,
      paymentMethod: "Online Payment",
    });

    // Save the new payment record
    await newPayment.save();

    res.json({ message: "Payment successful." });
  } catch (error) {
    console.error("Error making payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Helper function to generate a unique reference code
const generateReferenceCode = () => {
  // Implement your logic to generate a unique reference code
  // You can use a combination of letters and numbers, and ensure it's unique in the database
};

module.exports = {
  getPaymentRecords,
  makePayment,
};
