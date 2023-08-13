const Notice = require("../models/noticesModel");

// Create and save a new notice
const createNotice = async (req, res) => {
  try {
    const { recipientType, title, message } = req.body;
    const file = req.file ? req.file.path : null;

    const newNotice = new Notice({
      recipientType,
      title,
      message,
      file,
      isNew: true,
    });

    await newNotice.save();
    res.status(201).json({ message: "The notice has been successfully sent." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " Failed to send the notice. Please try again." });
  }
};

const getTeacherNotices = async (req, res) => {
  try {
    const teacherNotices = await Notice.find({ recipientType: "Teacher" });
    res.status(200).json(teacherNotices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch teacher notices." });
  }
};

const getSentNotices = async (req, res) => {
  try {
    const sentNotices = await Notice.find({ isSent: true });
    res.status(200).json(sentNotices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sent notices." });
  }
};

module.exports = { createNotice, getTeacherNotices, getSentNotices };
