const Subject = require("../models/subjectModel");
const TimeTable = require("../models/timeTableModel");
const asyncHandler = require("express-async-handler");

const getTimeTable = asyncHandler(async (req, res) => {
  const timeTable = await TimeTable.find();
  res.json(timeTable);
});

const createTimeTable = asyncHandler(async (req, res) => {
  const weekday = req.params.year;
  const period = req.params.period;
  const grade = req.params.grade;

  if (!weekday || !period || !grade) {
    return res
      .status(400)
      .json({ error: "Please provide all four parameters" });
  }

  const subject = req.body;

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
      });
    }

    const timeTableUpdate = req.body.staff || [];

    timeTableUpdate.forEach((update) => {
      const { staff_id, staff_name } = update;

      timeTable.staff.push({ staff_id: staff_id, staff_name: staff_name });
    });

    timeTable.students = studentUpdates;

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
