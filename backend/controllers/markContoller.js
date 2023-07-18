const Mark = require('../models/MarkModel');

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

module.exports = { saveMarks };
