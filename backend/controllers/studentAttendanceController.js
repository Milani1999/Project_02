const asyncHandler = require("express-async-handler");
const Attendance = require("../models/studentAttendanceModel");
const Student = require("../models/studentModel");

class AttendanceHandler {
  async takeAttendance(admission_no) {
    const student = await this.findStudent(admission_no);

    if (!student) {
      return { success: false, message: "Please scan a Valid QR Code." };
    }

    const today = new Date();
    const date = this.formatDate(today);
    const localTime = new Date();

    const onTimeLate = this.checkOnTimeLate(localTime);

    const existingAttendance = await this.findExistingAttendance(
      admission_no,
      date
    );

    if (existingAttendance) {
      return {
        success: false,
        message: "Record exists. Next student please.",
      };
    }

    const newAttendance = new Attendance({
      admission_no,
      date,
      arrivedTime: localTime,
      onTimeLate,
      present: true,
      student: student._id,
    });

    await newAttendance.save();
    return { success: true, message: `Welcome ${admission_no}, Next student please` };
  }

  async findStudent(admission_no) {
    return await Student.findOne({ admission_no });
  }

  async findExistingAttendance(admission_no, date) {
    return await Attendance.findOne({
      admission_no,
      date,
    });
  }

  checkOnTimeLate(localTime) {
    return localTime.getHours() < 8 || (localTime.getHours() === 8 && localTime.getMinutes() <= 45)
      ? "On-Time"
      : "Late";
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}

const attendanceHandler = new AttendanceHandler();

const takeAttendance = asyncHandler(async (req, res) => {
  const { admission_no } = req.body;

  const result = await attendanceHandler.takeAttendance(admission_no);

  if (result.success) {
    res.json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
});

const getAttendanceByDate = asyncHandler(async (req, res) => {
  const { date, grade } = req.query;

  try {
    const students = await Student.find({ grade });

    const attendancePromises = students.map(async (student) => {
      const attendance = await Attendance.findOne({
        admission_no: student.admission_no,
        date: { 
          $gte: new Date(date).setUTCHours(0, 0, 0, 0),
          $lte: new Date(date).setUTCHours(23, 59, 59, 999),
        },
      });
      return { student, attendance };
    });

    const attendanceData = await Promise.all(attendancePromises);

    res.json(attendanceData);
  } catch (error) {
    console.error("Error fetching student attendance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteAttendance = asyncHandler(async (req, res) => {
  const attendanceId = req.params.id;

  try {
    await Attendance.findByIdAndDelete(attendanceId);
    res.json({ message: "Attendance record deleted successfully." });
  } catch (error) {
    console.error("Error deleting attendance record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


const getAttendanceByDateAndAdmissionNo = asyncHandler(async (req, res) => {
  const { admission_no, date } = req.query;

  try {
    const student = await Student.findOne({ admission_no });

    if (!student) {
      res.status(400).json({ message: "Student not found." });
      return;
    }

    const selectedDate = new Date(date);
    const selectedYear = selectedDate.getUTCFullYear();
    const selectedMonth = selectedDate.getUTCMonth();

    const startDate = new Date(selectedYear, selectedMonth, 1);
    const endDate = new Date(selectedYear, selectedMonth + 1, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    const attendance = await Attendance.find({
      admission_no,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    if (!attendance) {
      res.status(404).json({ message: "Attendance not found." });
      return;
    }

    res.json(attendance);
  } catch (error) {
    console.error("Error fetching student attendance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = {
  takeAttendance,
  getAttendanceByDate,
  deleteAttendance,
  getAttendanceByDateAndAdmissionNo,
};
