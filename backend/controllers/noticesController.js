const Notice = require("../models/noticesModel");


const createNotice = async (req, res) => {
  try {
    const { recipientType, title, message, file } = req.body;

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

const getStudentNotices = async (req, res) => {
  try {
    const studentNotices = await Notice.find({ recipientType: "Student" });
    res.status(200).json(studentNotices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch student notices." });
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

const deleteSentNotice = async (req, res) => {
  const noticeId = req.params.id;

  try {
    const deletedNotice = await Notice.findByIdAndDelete(noticeId);
    if (!deletedNotice) {
      return res.status(404).json({ error: "Notice not found." });
    }
    res.status(200).json({ message: "Sent notice deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete sent notice." });
  }
};

module.exports = { createNotice, getTeacherNotices, getSentNotices, getStudentNotices, deleteSentNotice };

