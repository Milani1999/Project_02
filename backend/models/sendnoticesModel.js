// sendnoticesModel.js
const mongoose = require('mongoose');

const sendnoticeSchema = new mongoose.Schema({
  grade: Number,
  title: String,
  message: String,
  file: String, 
});

const Notice = mongoose.model("Notice", sendnoticeSchema);


module.exports = Notice;
