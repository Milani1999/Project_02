const Mark = require("../models/MarkModel");

const asyncHandler = require("express-async-handler");

const getMarks = asyncHandler(async (req, res) => {
  const marks = await Mark.find();
  res.json(marks);
});

const getStudentMarksByID = async (req, res) => {
  try {
    const mark = await Mark.aggregate([
      {
        $match: {
          students: { $elemMatch: { student: req.params.id } },
        },
      },
      {
        $unwind: "$students",
      },
      {
        $match: {
          "students.student": req.params.id,
        },
      },
      {
        $addFields: {
          subject: "$subject",
          score: "$students.score",
          term: "$term",
          year: "$year",
        },
      },
      {
        $project: {
          _id: 0,
          score: 1,
          subject: 1,
          term: 1,
          year: 1,
        },
      },
    ]);

    res.json(mark);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student marks", error });
  }
};

const getStudentMarksByParams = asyncHandler(async (req, res) => {
  const year = req.params.year;
  const term = req.params.term;
  const subject = req.params.subject;
  const grade = req.params.grade;

  if (!year || !term || !subject || !grade) {
    return res
      .status(400)
      .json({ error: "Please provide all four parameters in the URL." });
  }

  try {
    const mark = await Mark.findOne({
      year: year,
      term: term,
      subject: subject,
      grade: grade,
    });

    if (!mark) {
      return res
        .status(404)
        .json({ error: "No record found for the provided parameters." });
    }

    const response = {
      students: mark.students,
    };

    res.json(response);
  } catch (err) {
    return res.status(500).json({ error: "Error fetching data." });
  }
});

const saveMarks = asyncHandler(async (req, res) => {
  const year = req.params.year;
  const term = req.params.term;
  const subject = req.params.subject;
  const grade = req.params.grade;

  if (!year || !term || !subject || !grade) {
    return res
      .status(400)
      .json({ error: "Please provide all four parameters in the URL." });
  }

  try {
    let mark = await Mark.findOne({
      year: year,
      term: term,
      subject: subject,
      grade: grade,
    });

    if (!mark) {
      mark = new Mark({
        year: year,
        term: term,
        subject: subject,
        grade: grade,
      });
    }

    const studentUpdates = req.body.students || [];

    studentUpdates.forEach((update) => {
      const { studentId, score } = update;
      const parsedScore = score === "AB" ? "AB" : parseFloat(score);
      const studentIndex = mark.students.findIndex(
        (student) => student.student === studentId
      );

      if (studentIndex !== -1) {
        mark.students[studentIndex].score = parsedScore;
      } else {
        mark.students.push({ student: studentId, score: parsedScore });
      }
    });

    mark.students = studentUpdates;

    try {
      await mark.save();

      res.json({ mark });
    } catch (err) {
      console.error("Error saving mark:", err);
      return res.status(500).json({ error: "Error saving data." });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error fetching data." });
  }
});


const editMarks = asyncHandler(async (req, res) => {
  const year = req.params.year;
  const term = req.params.term;
  const subject = req.params.subject;
  const grade = req.params.grade;

  if (!year || !term || !subject || !grade) {
    return res
      .status(400)
      .json({ error: "Please provide all four parameters in the URL." });
  }

  try {
    const mark = await Mark.findOne({
      year: year,
      term: term,
      subject: subject,
      grade: grade,
    });

    if (!mark) {
      return res
        .status(404)
        .json({ error: "No record found for the provided parameters." });
    }

    const studentUpdates = req.body.students || [];

    studentUpdates.forEach((update) => {
      const { studentId, score } = update;
      const studentIndex = mark.students.findIndex(
        (student) => student.student === studentId
      );

      if (studentIndex !== -1) {
        mark.students[studentIndex].score = parseFloat(score) || 0;
      }
    });

    mark.students = studentUpdates;

    try {
      await mark.save();

      res.json({ mark });
    } catch (err) {
      console.error("Error saving mark:", err);
      return res.status(500).json({ error: "Error updating data." });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error fetching data." });
  }
});

module.exports = {
  getMarks,
  saveMarks,
  getStudentMarksByID,
  getStudentMarksByParams,
  editMarks,
};