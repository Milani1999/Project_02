const Mark = require('../models/MarkModel');

const asyncHandler = require("express-async-handler");

const saveMarks = async (req, res) => {
  try {
    const { year, term, subject, grade, students } = req.body;

    const mark = new Mark({
      year,
      term,
      subject,
      grade,
      students
    });

    await mark.save();

    res.status(200).json({ message: 'Marks saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving marks', error });
  }
};

const getMarks = asyncHandler(async (req, res) => {
  const marks = await Mark.find();
  res.json(marks);
});

const getStudentMarksByID = async (req, res) => {
  try {
    const { studentId } = req.params;

    const mark = await Mark.findOne({ 'students.student': studentId });

    if (!mark) {
      return res.status(404).json({ message: 'Student marks not found' });
    }

    const studentMarks = mark.students.find((student) => student.student === studentId);

    if (!studentMarks) {
      return res.status(404).json({ message: 'Student marks not found' });
    }

    const { score } = studentMarks; // Get the score of the specific student

    res.json({ studentId, score });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student marks', error });
  }
};

module.exports = { getMarks, saveMarks, getStudentMarksByID };
