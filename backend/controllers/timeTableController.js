const Subject = require("../models/subjectModel");
const TimeTable = require("../models/timeTableModel");
const asyncHandler = require("express-async-handler");

const getTimeTable = asyncHandler(async (req, res) => {
  const timeTable = await TimeTable.find();
  res.json(timeTable);
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
  

module.exports = {
  getTimeTable,
  createTimeTable,
};
