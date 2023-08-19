const mongoose = require("mongoose");

const timeTableSchema = new mongoose.Schema({
  weekday: {
    type: Number,
    required: true,
  },
  period: {
    type: Number,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  staff: [
    {
      staff_id: string,
      required: true,
    },
    {
      staff_name: String,
      required: true,
    },
  ],
});

const TimeTable = mongoose.model("TimeTable", timeTableSchema);

module.exports = TimeTable;
