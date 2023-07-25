const Attendance = require("../models/Attendance");
const Student = require("../models/studentModel");
const Staff = require("../models/staffModel");
const asyncHandler = require("express-async-handler");

const markAttendance = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if the user ID exists in the Student or Staff collection
    const student = await Student.findOne({ admission_no: userId });
    const staff = await Staff.findOne({ employee_id: userId });

    if (!student && !staff) {
      return res.status(404).json({ error: "User not found." });
    }

    // Create a new attendance record
    const newAttendance = new Attendance({ userId });

    // Save the attendance record to the database
    await newAttendance.save();

    return res
      .status(200)
      .json({ message: "Attendance recorded successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to mark attendance." });
  }
});

module.exports = { markAttendance };
