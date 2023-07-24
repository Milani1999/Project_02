const Mark = require("../models/MarkModel");

const asyncHandler = require("express-async-handler");

const saveMarks = async (req, res) => {
  try {
    const { year, term, subject, grade, students } = req.body;

    const mark = new Mark({
      year,
      term,
      subject,
      grade,
      students,
    });

    await mark.save();

    res.status(200).json({ message: "Marks saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving marks", error });
  }
};

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
        $unwind: '$students',
      },
      {
        $match: {
          'students.student': req.params.id,
        },
      },
      {
        $addFields: {
          subject: '$subject', // Include the 'subject' field from the document
          score: '$students.score',
        },
      },
      {
        $project: {
          _id: 0,
          score: 1,
          subject: 1,
        },
      },
    ]);
    
    res.json(mark);
    
    
  } catch (error) {
    res.status(500).json({ message: "Error fetching student marks", error });
  }
};

module.exports = { getMarks, saveMarks, getStudentMarksByID };
