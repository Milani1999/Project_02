// paymentModel.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  referenceCode: {
    type: String,
    unique: true,
    required: true,
  },
  studentAdmissionNo: {
    type: String,
    required: true,
  },
  studentDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDateWithTime: {
    type: Date,
    default: Date.now,
  },
  purpose: {
    type: String,
    default: 'monthlyfee',
  },
  paymentYear: {
    type: Number,
    required: true,
  },
  paymentMonth: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    default: 'Online Card Payment',
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
