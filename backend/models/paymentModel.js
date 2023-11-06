const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  referenceCode: {
    type: String,
    required: true,
    unique: true,
  },
  admission_no: {
    type: String,
    required: true,
  },
  studentDetails: {
    // Assuming you have a Student model and you want to create a reference here
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  paymentDateWithTime: {
    type: Date,
    default: Date.now,
  },
  purpose: {
    type: String,
    default: "monthlyfee",
  },
  paymentForYear: {
    type: Number,
    required: true,
  },
  paymentForMonth: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    default: "Online Card Payment",
  },
  status: {
    type: Boolean,
    default: false, // false indicates payment is not completed, true indicates payment is completed
  },
  currency: {
    type: String,
    default: "LKR",
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
