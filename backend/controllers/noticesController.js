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
    });

    await newNotice.save();
    res.status(201).json({ message: "Notice sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send notice" });
  }
};

module.exports = { createNotice };
