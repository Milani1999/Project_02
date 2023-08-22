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
      _id: timeTable._id,
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
    const existingTimeTable = await TimeTable.findOne({
      weekday: weekday,
      period: period,
      // subject: subject,
    });

    if (existingTimeTable) {
      return res.status(400).json({ error: "Duplicate Entry" });
    }

    const newTimeTable = new TimeTable({
      weekday: weekday,
      period: period,
      grade: grade,
      subject: subject,
      staff: [],
    });

    staffData.forEach((staff) => {
      const { staff_id, staff_name } = staff;

      const isDuplicate = newTimeTable.staff.some(
        (entry) =>
          entry.staff_id === staff_id &&
          entry.staff_name === staff_name &&
          entry.weekday === weekday &&
          entry.period === period
      );

      if (!isDuplicate) {
        newTimeTable.staff.push({
          staff_id: staff_id,
          staff_name: staff_name,
          grade: grade,
          weekday: weekday,
          period: period,
        });
      }
    });

    try {
      await newTimeTable.save();

      res.json({ timeTable: newTimeTable });
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

const getTimeTableByStaffID = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const mark = await TimeTable.aggregate([
      {
        $match: {
          staff: { $elemMatch: { staff_id: id } },
        },
      },
      {
        $unwind: "$staff",
      },
      {
        $match: {
          "staff.staff_id": id,
        },
      },
      {
        $addFields: {
          subject: "$subject",
          grade: "$grade",
          period: "$period",
          weekday: "$weekday",
          staff_name: "$staff.saff_name",
        },
      },
      {
        $project: {
          _id: 0,
          staff_name: 1,
          grade: 1,
          subject: 1,
          period: 1,
          weekday: 1,
        },
      },
    ]);

    res.json(mark);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student marks", error });
  }
});

module.exports = {
  getTimeTable,
  getByGrade,
  createTimeTable,
  getTimeTableById,
  deleteTimeTable,
  getTimeTableByStaffID,
};
