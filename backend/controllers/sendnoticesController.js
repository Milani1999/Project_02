const StaffNotice = require("../models/sendnoticesModel");

const createNotice = async (req, res) => {
  try {
    const newNotice = new StaffNotice(req.body);
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create notice" });
  }
};

const getSentNotices = async (req, res) => {
  try {
    const sentNotices = await StaffNotice.find().sort({
      createdAt: -1,
    });
    res.status(200).json(sentNotices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch sent notices" });
  }
};

const getSentNoticesByStaff = async (req, res) => {
  try {
    const sentNotices = await StaffNotice.find({
      staff: req.params.staff,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(sentNotices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch sent notices" });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const noticeId = req.params.id;
    await StaffNotice.findByIdAndDelete(noticeId);
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete the notice" });
  }
};

const getNoticesByGrade = async (req, res) => {
  try {
    const StaffNotices = await StaffNotice.find({
      grade: req.params.grade,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(StaffNotices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices" });
  }
};

module.exports = {
  createNotice,
  getSentNotices,
  deleteNotice,
  getNoticesByGrade,
  getSentNoticesByStaff,
};
