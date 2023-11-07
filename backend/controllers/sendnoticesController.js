// sendnoticesController.js
const Notice = require('./sendnoticesModel'); 

exports.createNotice = async (req, res) => {
  try {
    const newNotice = new Notice(req.body);
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create notice' });
  }
};


exports.getSentNotices = async (req, res) => {
  try {
    const sentNotices = await Notice.find();
    res.status(200).json(sentNotices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch sent notices' });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const noticeId = req.params.id;
    await Notice.findByIdAndDelete(noticeId);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete the notice' });
  }
};
module.exports = { createNotice, getSentNotices,getStudentNotices};