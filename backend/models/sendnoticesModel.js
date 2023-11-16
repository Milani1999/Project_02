// sendnoticesModel.js
const mongoose = require("mongoose");

const sendnoticeSchema = new mongoose.Schema({
  grade: {
    type: Number,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  file: {
    type: String,
  },

  staff: {
    type: String,
    required: true,
  },

  staff_name: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notice = mongoose.model("StaffNotice", sendnoticeSchema);
module.exports = Notice;
