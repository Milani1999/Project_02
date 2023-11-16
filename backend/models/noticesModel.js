const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  recipientType: {
    type: String,
    enum: ["Teacher", "Student"],
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
  staff_name: {
    type: String,
    default: "UIS Admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
