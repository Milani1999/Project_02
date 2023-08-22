const Subject = require("../models/subjectModel");
const TimeTable = require("../models/timeTableModel");
const asyncHandler = require("express-async-handler");

const getTimeTable = asyncHandler(async (req, res) => {
  const timeTable = await TimeTable.find();
  res.json(timeTable);
});

const getByGrade = asyncHandler(async (req, res) => {
  const grade = req.params.grade;

  if (!grade) {
    return res.status(400).json({ error: "Please provide the grade" });
  }

  try {
    const tableData = await TimeTable.find({
      grade: grade,
    });

    if (!tableData || tableData.length === 0) {
      return res.status(404).json({ Error: "No records" });
    }

    const response = tableData.map((timeTable) => ({
      _id:timeTable._id,
      weekday: timeTable.weekday,
      period: timeTable.period,
      subject: timeTable.subject,
      staff_name: timeTable.staff.map((staff) => staff.staff_name),
    }));

    res.json(response);
  } catch (err) {
    console.log("Error fetching marks");
    return res.status(500).json({ error: "error fetching data" });
  }
});

const createTimeTable = asyncHandler(async (req, res) => {
  const weekday = req.params.weekday;
  const period = req.params.period;
  const grade = req.params.grade;

  if (!weekday || !period || !grade) {
    return res
      .status(400)
      .json({ error: "Please provide all three parameters" });
  }

  const subject = req.body.subject;
  const staffData = req.body.staff || [];

  try {
    let timeTable = await TimeTable.findOne({
      weekday: weekday,
      period: period,
      grade: grade,
      subject: subject,
    });

    if (!timeTable) {
      timeTable = new TimeTable({
        weekday: weekday,
        period: period,
        grade: grade,
        subject: subject,
        staff: [],
      });
    }

    staffData.forEach((staff) => {
      const { staff_id, staff_name } = staff;

      timeTable.staff.push({ staff_id: staff_id, staff_name: staff_name });
    });

    try {
      await timeTable.save();

      res.json({ timeTable });
    } catch (err) {
      console.error("Error saving time table:", err);
      return res.status(500).json({ error: "Error saving data." });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error fetching data." });
  }
});

const getTimeTableById = asyncHandler(async (req, res) => {
  const timeTable = await TimeTable.findById(req.params.id);

  if (timeTable) {
    res.json(timeTable);
  } else {
    res.status(404).json({ message: "Time table Not Found" });
  }
});

const deleteTimeTable = asyncHandler(async (req, res) => {
  const timeTable = await TimeTable.findById(req.params.id);

  if (timeTable) {
    await timeTable.deleteOne();
    res.json({ message: "Period Removed Successfully" });
  } else {
    res.status(404);
    throw new Error("Period not found");
  }
});

module.exports = {
  getTimeTable,
  getByGrade,
  createTimeTable,
  getTimeTableById,
  deleteTimeTable,
};
