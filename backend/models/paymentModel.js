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
    studentDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to the Student model
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

// Create a unique reference code before saving to the database
paymentSchema.pre("save", function (next) {
  const currentDate = new Date();
  const referenceCode =
    currentDate.getFullYear().toString().slice(-2) +
    (currentDate.getMonth() + 1).toString().padStart(2, "0") +
    Math.random().toString(36).substr(2, 6).toUpperCase(); // 8-character code
  this.referenceCode = referenceCode;
  next();
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
