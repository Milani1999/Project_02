const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    admission_no: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    arrivedTime: {
      type: Date,
    },
    onTimeLate: {
      type: String,
    },
    present: {
      type: Boolean,
      default: false,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
