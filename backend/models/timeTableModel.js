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
      staff_id: {
        type: String,
        required: true
      },
      staff_name: {
        type: String,
        required: true
      }
    }
  ]
});

const TimeTable = mongoose.model("TimeTable", timeTableSchema);

module.exports = TimeTable;
