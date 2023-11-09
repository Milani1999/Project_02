// Backend > models > paymentModel.js

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    referenceCode: {
      type: String,
      unique: true,
      required: true,
    },
    admissionNo: {
      type: String,
      required: true,
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
      default: "monthlyfee",
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
      default: "Online Payment",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
